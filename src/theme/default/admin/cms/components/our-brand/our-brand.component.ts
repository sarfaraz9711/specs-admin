
import { Component, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { id } from '@swimlane/ngx-charts';
import { Console } from 'console';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/core/admin/catalog/product/product.service';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ConfigService } from '../../../../../../core/admin/service/config.service';
@Component({
  selector: 'app-our-brand',
  templateUrl: './our-brand.component.html'
})
export class OurBrandComponent implements OnInit, DoCheck {
  ImageUrl: string | ArrayBuffer;
  imageUrl: string;
  imageUploadData: any = {};
  showOn: string;
  allDataList: any;
  allList: any;
  productList: any;
  value1;
  value: false;
  offerAction = new BehaviorSubject(0)
  listType: any;
  constructor(public bannerService: BannerService, private productService: ProductService, 
    private cd: ChangeDetectorRef,
    private configService: ConfigService,
    ) { }
  brandNameForm: FormGroup
  buttoncheck: true
  bannerList: any
  editData: any = {}
  editId: any;
  uploadNewImage: any = false;
  updatedSuccessfully: any = 0
  editProductIds:any
  ngOnInit(): void {
    const location = (window.location.hash).split('/')
    if(location[2]=='add-offer-image'){
      this.listType='redchief'
    }else{
      this.listType='furo'
    }
    this.imageUrl = this.configService.getImageUrl();
    this.brandNameForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      link: new FormControl(null),
      imagePath: new FormControl(null, Validators.required),
      status: new FormControl("1"),
      showOn: new FormControl("", Validators.required),
      productIds: new FormControl(null),
      imagefile: new FormControl(null),
      listType: new FormControl(null)
    })

    this.getList()
    this.getProductList()


  }

  formSubmit() {
    console.log("this.brandNameForm",this.brandNameForm.value)
    if (this.brandNameForm.value.showOn !== "brand-logo" && this.brandNameForm.value.showOn !== "banner2" && this.brandNameForm.value.showOn !== "banner3" && this.brandNameForm.value.showOn !== "offerTab1" && this.brandNameForm.value.showOn !== "offerTab2" && this.brandNameForm.value.showOn !== "offerTab3" && this.brandNameForm.value.showOn !== "lookbook-tab1" && this.brandNameForm.value.showOn !== "lookbook-tab2" && this.brandNameForm.value.showOn !== "lookbook-tab3" && this.brandNameForm.value.productIds) {
      this.brandNameForm.controls.productIds.setValue(this.brandNameForm.controls.productIds.value.toString());
    }
    
    if(false && this.brandNameForm.value.showOn == "left" && this.brandNameForm.value.showOn == "right"){
      this.brandNameForm.value.productIds = this.brandNameForm.value.productIds.join(',')
    }
    
    // this.bannerService.addDocument(this.brandNameForm.value).subscribe((res: any) => {
    //   this.getList();
    //   this.brandNameForm.reset();
    //   this.brandNameForm.get("status").setValue("1");
    //   this.cd.detectChanges()
    // });
    if (this.editId) {
      this.bannerService.updateBannerData(this.brandNameForm.value, this.editId).subscribe((res: any) => {
        this.getList();
        this.brandNameForm.reset();
        this.brandNameForm.get("status").setValue("1");
        this.updatedSuccessfully = 1;
        setTimeout(() => {
          this.updatedSuccessfully = 0;
        }, 3000);
        this.editData.imagePath = null;
        this.uploadNewImage = false;
        this.cd.detectChanges()
      });
    }
  }


  uploadFile(event: any) {
    const fileData = event.target.files[0]
    console.log(event.target.files[0])
    const uploadFileType = event.target.files[0].type
    let setFileType = ""
    if (uploadFileType == "image/png" || uploadFileType == "image/jpg" || uploadFileType == "image/jpeg") {
      setFileType = "image"
    }else if (uploadFileType == "video/mp4") {
      setFileType = "video"
    } else {
      setFileType = "Format Not valid"
      event.target.value = '';
    }
    if(setFileType=="video"){
    const formData = new FormData();
    formData.append('file', fileData, fileData.name);
    this.bannerService.videoUpload(formData).subscribe((res: any) => {
      this.imageUploadData = res.data
      console.log("imageUploadData",res.data)
      this.cd.detectChanges()
    })
  }else{
    let fd = {}
    let reader = new FileReader();
    let fileBase64: any

    reader.onloadend = function () {
      fileBase64 = reader.result
    }
    reader.readAsDataURL(fileData);
    setTimeout(async () => {
      fd = {
        "fileName": 'imageupload.jpg',
        "path": "",
        "image": fileBase64
      }
      this.bannerService.fileUpload(fd).subscribe((res: any) => {
        this.imageUploadData = res.data
        this.cd.detectChanges()
      })
    }, 100)
  }
  }

  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.ImageUrl = myReader.result;
      this.cd.detectChanges()
    }
  }

  getList() {
    this.bannerService.getOfferImageList(this.listType).subscribe((res: any) => {
      this.allDataList = res.data.sort((a, b) => (b.Id - a.Id));
      this.allDataList = this.allDataList.map((item: any) => {
        let showOnText: any
        if (item.showOn == "brand-logo") {
          showOnText = "Our Brand"
        } else if (item.showOn == "left") {
          showOnText = "Left Section"
        } else if (item.showOn == "right") {
          showOnText = "Right Section"
        } else if (item.showOn == "banner2") {
          showOnText = "Banner 2"
        } else if (item.showOn == "banner3") {
          showOnText = "Banner 3"
        }
        else if (item.showOn == "lookbook-tabl") {
          showOnText = "lookbook-tabl"
        }
        else if (item.showOn == "lookbook-tab2") {
          showOnText = "lookbook-tab2"
        }
        else if (item.showOn == "lookbook-tab3") {
          showOnText = "lookbook-tab3"
        }
        return Object.assign(item, { showOnText: showOnText })
      })
    })
  }

  selectProductIds(event: any) {
    if (event.target.checked) {

    }
  }

  changeFilter(event) {
    this.buttoncheck = event.target.checked;
  }



  updateBannerStatus = ($event: any, data: any) => {
    window.scroll(0,0);
    console.log(this.brandNameForm.value, 'dfsdfsfsf', data)
    const BannerValue = $event.target.checked;
    //this.brandNameForm.value.imagePath.setValue(data.imagePath);
    //this.imageUploadData.image = data.imagePath
    this.brandNameForm.controls['imagePath'].setValue(data.imagePath)
    this.editData = data;
    this.editId = data.Id;
    if(data.productIds){
      
      this.editProductIds = data.productIds.split(",").map((item:any)=> {
        return Number(item);
      })
    }
    
    this.cd.detectChanges()
    
  }

  makeActiveInactive = ($event: any, data: any) => {
    const BannerValue = $event.target.checked;
    let params: any = {
      id: data.Id,
      status: BannerValue ? 1 : 0
    }
    this.bannerService.updateOfferImage(params).subscribe((res: any) => {
      console.log(res)
      this.getList()
    
    })
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
      if (res.status == 1) {
        this.productList = res.data;
      }
    }, (err) => {

      console.log(err)
    });

  }

  selectAction(val: any) {
    const productIds = this.brandNameForm.get("productIds")

    const link = this.brandNameForm.get("link")

    if (val == "brand-logo" || val == "banner2" || val == "banner3" || val == "lookbook-tabl" || val == "lookbook-tab2" || val == "lookbook-tab3" || val == "offerTab1" || val == "offerTab2" || val == "offerTab3" || val == "left" || val == "right") {

      // productIds.setValidators(Validators.nullValidator)
      link.setValidators(Validators.required)
      productIds.clearValidators()
    } if (false && val == "left" || val == "right") {
      productIds.setValidators(Validators.required)
      // link.setErrors(null)
      link.clearValidators()

    }
    productIds.updateValueAndValidity()
    link.updateValueAndValidity()
  }

  ngDoCheck() {

    const invalid = [];
    const controls = this.brandNameForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
  }

  clickClose(){
    this.uploadNewImage = true;
  }

  cancelForm(){
    if (confirm("Do you want cancel the form?") == true) {
      location.reload();
    } 
  }

}
