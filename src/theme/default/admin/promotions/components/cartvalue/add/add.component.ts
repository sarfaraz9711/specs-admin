import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Console } from "console";
import { ToastrManager } from "ng6-toastr-notifications";
import { BehaviorSubject } from "rxjs";
import { ProductService } from "src/core/admin/catalog/product/product.service";
import { CartValueService } from "src/core/admin/Promotions/cartValueService";



@Component({
  selector: 'app-cart-value',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})

export class CartValueComponent {
  public user: FormGroup;
  public form: FormGroup
  public discountType: FormControl;
  public discountValue: any;
  public cartValue: any;
  public freeProduct: any;
  public startDate: any;
  public minDate: any;
  public maxVal: number
  public endDate: any;
  public minValue: any;
  public startTime: any;
  public endTime: any;
  public minTime: any;
  public startTimeStamp: any
  public endTimeStamp: any
  public maxCartValue: any
  public status: any;
  public discountList: any;
  public productList: any;
  public cartList: any;
  public cartDetails: any = {};


  public isEdit: boolean = false;
  isMatch: boolean = false;
  editId: number;
  childTableId: number;
  maxStartDate: any;
  maxStartValue: any;
  minEndDate: any;
  minEndValue: any;
  minEndTime: any;
  percentageValue: false;
  maxStartTime: any;
  Disvalue: number;
  popupMessage = new BehaviorSubject({});
  disable = true;
  disHide = false;
  formInvalid: boolean;
  popupErrorMsg: any;
  datePipeString: string;
  checkProduct: any[]=[];
  selectProductPrice: number;

  constructor(
    public fb: FormBuilder,
    public datePipe: DatePipe,
    public productService: ProductService,
    public _CartValueService: CartValueService,
    private toastr: ToastrManager,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCartTypeList()
    this.getProductList()
    this.getCartValueList()
    this.getFreePromotionData()
    // let currentDateObj = new Date();
    // let months = (currentDateObj.getMonth()).toString().length==1?("0"+(currentDateObj.getMonth()+1)):(currentDateObj.getMonth()+1)
    this.minDate = this.datePipeString = this.datePipe.transform(new Date(), "yyyy-MM-dd")


    this.user = this.fb.group({
      discountType: new FormControl(this.discountType, [Validators.required]),
      startDate: new FormControl(this.startDate, [Validators.required]),
      endDate: new FormControl(this.endDate, [Validators.required]),
      status: new FormControl(this.status, [Validators.required]),
      discountValue: new FormControl(this.discountValue, [Validators.required, Validators.pattern('^(?=[0-9.])[0-9]{0,2}(\.[0-9]+)?$|^100$')]),
      cartValue: new FormControl(this.cartValue, [Validators.required]),
      maxCartValue: new FormControl(this.maxCartValue, [Validators.required]),
      productId: new FormControl(this.freeProduct, [Validators.required]),
      startTime: new FormControl(this.startTime, [Validators.required]),
      endTime: new FormControl(this.endTime, [Validators.required]),
      startTimeStamp: new FormControl(null),
      endTimeStamp: new FormControl(null)

    })

    { console.log(this.freeProduct, "cbnbcnd") }

    this._activatedRouter.params.subscribe(res => {
      console.log(res, "nerossss")
      if (res && res.id) {
        this.isEdit = true;
        this.editId = res.id;
        this.setFormData(res)
      }
    })
  }


 onSubmits(user) {
    let startDateWithTime = new Date(this.user.value.startDate)
    let startGetHoursMin = this.user.value.startTime.split(":")
    startDateWithTime.setHours(startGetHoursMin[0])
    startDateWithTime.setMinutes(startGetHoursMin[1])
    let endDateWithTime = new Date(this.user.value.endDate)
    let endGetHoursMin = this.user.value.endTime.split(":")
    endDateWithTime.setHours(endGetHoursMin[0])
    endDateWithTime.setMinutes(endGetHoursMin[1])
    this.user.value.startTimeStamp = startDateWithTime.getTime()
    this.user.value.endTimeStamp = endDateWithTime.getTime()
    console.log(this.user.value)
    const checkOffer:any = this.cartList.filter(item=>{
      return ((this.user.value.cartValue>=item.cartValue && this.user.value.cartValue<=item.maxCartValue) || (this.user.value.maxCartValue>=item.cartValue && this.user.value.maxCartValue<=item.maxCartValue))
    })

    console.log(this.user.value)
    if (startDateWithTime.getTime() > endDateWithTime.getTime()) {
      this.formInvalid=true
      this.popupErrorMsg="The start date and time is not greater than the end date and time"
    }else if(this.user.value.discountValue>100){
      this.formInvalid=true
      this.popupErrorMsg="Percentage value should be between 1 to 100"
    }else if(Number(this.user.value.cartValue)>Number(this.user.value.maxCartValue)){
      this.formInvalid=true
      this.popupErrorMsg="Max cart value should be greater than Min cart value "
    }else if(this.selectProductPrice>=this.user.value.cartValue){
      this.formInvalid=true
      this.popupErrorMsg="Select Product price should be greater than minimum cart value"
    }else if(this.user.value.discountType=="Free Products" && this.checkProduct.includes(this.user.value.productId[0])){
      this.formInvalid=true
      this.popupErrorMsg="This product already in offer"
    }else if(checkOffer.length > 0){
      this.formInvalid=true
       this.popupErrorMsg="This offer price range is already available"
     }
     else{
      this.formInvalid=false
    }
     
    if (this.formInvalid) {
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: this.popupErrorMsg,
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return false
    }


      if (this.isEdit) {
        this.updateFormData(this.user.value)
      } else {
        this.saveFormData(this.user.value)
      }
    

  }

  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }



  onCancel() {
    this._router.navigate(['/promotions/list'])
  }

  setStartMinDate(val: any) {
    this.minEndDate = val
  }

  setEndMinDate(val: any) {
    this.maxStartDate = val
  }

  changeFromDate(event) {
    this.minDate = event.value;
  }

  setStartMinValue(val: any) {
    this.minEndValue = val
  }

  setEndMaxValue(val: any) {
    this.maxStartValue = val
  }

  setStartMinTime(val: any) {
    this.minEndTime = val;
  }

  setEndMinTime(val: any) {
    this.maxStartTime = val;
  }

  setDiscountValue(val: number) {
    if (val > 100) {
      this.maxVal = 100
    } else if (val < 0) {
      this.maxVal = 0
    } else {
      this.maxVal = val;
    }
  }



  getProductList() {
    let param = {
      "offset": 0,
      "limit": 0,
      "keyword": "",
      "sku": "",
      "status": "",
      "price": 0,
      "count": false,
      "upc":""
    }
    this.productService.productList(param).subscribe((res: any) => {
      console.log(res, "Product List Data")
      if (res.status == 1) {
        this.productList = res.data;
      }
    }, (err) => {
      console.log(err)
    });

  }

  getCartValueList() {
    this._CartValueService.listCartValuePromotions().subscribe((res: any) => {
      console.log(res, "cart value list")
      this.cartList = res.data;
      this.cartList.forEach((element:any) => {
        if(element.productId && element.isActive==1){
        this.checkProduct.push(element.productId)
        }
      });
      if(this.cartList.discountValue > 100){
        console.log("not accepted")
      }
      console.log(this.cartList, "scjhbhn")

    }, (err) => {
      console.log(err, "gxshv")
    })

  }









  getCartTypeList() {
    let discountList = [
      { id: "Percentage", name: 'Percentage' },
      { id: "Free Products", name: 'Free Product' },
    ];
    this.discountList = discountList
  }

  setFormData(res) {
    this._CartValueService.getCartValueDetails(res.id).subscribe((res: any) => {
      console.log(res, "cshjvahjcscvsavc");
      this.cartDetails = res && res.data[0];
      console.log(res.data, "ddfdrrfhg");
      this.cartDetails.startDate = this.datePipe.transform(this.cartDetails.startDate, "yyyy-MM-dd")
      this.cartDetails.endDate = this.datePipe.transform(this.cartDetails.endDate, "yyyy-MM-dd")
      this.childTableId = this.cartDetails.id;
      if (this.cartDetails.productId != null) {
        this.disHide = true
      } else {
        this.disHide = false
      }
    })
  }



  saveFormData(user) {
    console.log(user)
    this._CartValueService.addCartValuePromotion(user).subscribe((res: any) => {
      if (res && res.status == 200) {
        console.log("data sbmited")
        this._router.navigate(['/promotions/list'])
      }
    }
    );
  }

  updateFormData(user) {
    let payload = { "cartValueId": this.editId, ...user, "childTablePKId": this.childTableId };
    console.log(payload, "Nero hello")
    this._CartValueService.updateCartValuePromotion(payload).subscribe((res) => {
      this._router.navigate(['/promotions/list'])
    });
  }


  selectProduct(event:any){
    this.selectProductPrice=Number(event[0].price)
    console.log(event, this.selectProductPrice)
  }

  setProduct() {
    if (this.user.value.discountType == "Percentage" || this.user.value.discountType == "Flat") {
      // this.user.get("freeProduct").disable(); 
      this.disHide = false


    } else {
      // this.user.get("freeProduct").enable();
      this.disHide = true
      this.cartDetails.discountValue=null

    }
  }


  getFreePromotionData(){
     this._CartValueService.listFreeProductPromotions().subscribe((res:any)=>{
      const data:any[] = res.data 
      data.forEach(element => {
        if(element.is_active==1){
        this.checkProduct.push(Number(element.buy_product_id), Number(element.get_product_id))
        }
      });
 })
  }
}

