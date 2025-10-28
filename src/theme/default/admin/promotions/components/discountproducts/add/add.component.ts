import { Component } from "@angular/core";
import { DiscountProductPromtionService } from "src/core/admin/Promotions/discountvalue.service";
import { environment } from "src/environments/environment";
import { DatePipe } from "@angular/common";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-discount-products',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddProductComponent {
  public minEndDate: any;
  public maxStartDate: any;
  public percentdataList: any;
  public selectedOption: number;
  discountvalueper: any[]=[];
  public imageUrl: string;
  checkProduct: any[] = [];
  public minDate: any;
  datePipeString: string;
  offerurl: any;
  public isChecked: boolean;
  popupMessage=new BehaviorSubject({})


  constructor(
    public _DiscountProductPromtionService: DiscountProductPromtionService,
    public datePipe: DatePipe,
    private route: Router,
  ) {
  }

  product: number[] = [10, 20, 30, 40, 50, 60, 70, 80];

  setStartMinDate(val: any) {
    this.minEndDate = val;
  }

  setEndMinDate(val: any) {
    this.maxStartDate = val;
  }

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.minDate = this.datePipeString = this.datePipe.transform(new Date(), "yyyy-MM-dd")
  }

  getProduct() {
    if(this.discountvalueper.length>0){
    this.makeGetRequest(this.discountvalueper);
    }else{
      this.popupMessage.next({  
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Please select the discount",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
    }
  }

  makeGetRequest(option: any) {
    option.sort((a,b)=>{
      return a-b
    })
    const min:any=option[0]
    const max:any=option[option.length-1]
    this._DiscountProductPromtionService.listDiscountProducts(min, max).subscribe((res: any) => {
      this.percentdataList = res;
    })
  }

  discountvalue(event) {
    console.log(event.target.value)
    if(event.target.checked){
    this.discountvalueper.push(event.target.value)
    }else{
      const findIndex = this.discountvalueper.findIndex(item=>item==event.target.value)
      this.discountvalueper.splice(findIndex,1)
    }
    console.log(this.discountvalueper)
  }

  checkProductid(event, list) {
    console.log(event.target.value, list)

    if (event.target.checked) {
      this.checkProduct.push(event.target.value)
    } else {
      const findInd = this.checkProduct.findIndex(
        (item) => item == event.target.value
      );

      console.log(findInd, "ijbijbi");
      this.checkProduct.splice(findInd, 1);
    }
    console.log(this.checkProduct);
  }

  getUrl() {
    this.generateurl(this.checkProduct, this.discountvalueper);
  }

  generateurl(id: any, data: any) {
    const params: any = {};
    params.productIds = id.toString();
    params.startDate = this.minDate
    params.endDate = this.maxStartDate
    params.discount = data.toString()
    if(this.minDate && this.maxStartDate && params.productIds){
      this._DiscountProductPromtionService.generateUrlById(params).subscribe((res: any) => {
        this.offerurl = res
        this.route.navigate(['/promotions/discount-Products/list']);
      })
    }
    else{
      this.popupMessage.next({  
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Please select all value",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
    }
    
  }

  selectAllData(event) {
    if (event.target.checked) {
      this.isChecked = true
      this.percentdataList.forEach(element => {
        this.checkProduct.push(element.productId)
      });
    } else {
      this.isChecked = false
      this.percentdataList.forEach(element => {
        this.checkProduct = []
      });
    }

  }


}