import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/core/admin/catalog/product/product.service';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ConfigService } from 'src/core/admin/service/config.service';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CategoryTextImageAdd implements OnInit {
  config: any;
  queryDetails: any={};
  brandNameForm:FormGroup
  editData:any={}
  uploadNewImage:boolean
  imageUploadData:any={}
  popupMessage = new BehaviorSubject({})
  ImageUrl: string | ArrayBuffer;
  allCategoryList: any[]=[];
  categoryImaageId: string;
  formEdit: boolean;
  hideDescription: boolean=true;
  categoryImaageType: string;
  childCategory: boolean;
  childCategoryData: any;
  childName: string;
  constructor(public bannerService: BannerService, private productService: ProductService, 
    private cd: ChangeDetectorRef,
    private configService: ConfigService,
    private router: Router,
    public route: ActivatedRoute,
    public ckeconfiqservice: CkeConfiqService
    ) {       this.config = this.ckeconfiqservice.getckeconfig();
      const pageOffset = this.route.snapshot.queryParamMap.get('offset');
      const index = this.route.snapshot.queryParamMap.get('index');

      this.queryDetails.offset = pageOffset || 0;
      this.queryDetails.index = index || 0;}
 
  ngOnInit(): void {
    this.getCategory()
    this.form()
    if(sessionStorage.getItem("categoryImageId")){
      setTimeout(() => {
      this.categoryImaageId = sessionStorage.getItem("categoryImageId")
      this.categoryImaageType = sessionStorage.getItem("categoryImageType")
      this.formEdit=true
      this.getDataByCategoryIdType(this.categoryImaageId, this.categoryImaageType)
    }, 2000);
    }
  }

  form(){
    this.brandNameForm = new FormGroup({
      'id': new FormControl(null),
      'categoryId': new FormControl("", Validators.required),
      'type': new FormControl("", Validators.required),
      'categoryName': new FormControl("", Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'isActive': new FormControl("", Validators.required),
      'mainCategoryId': new FormControl("", Validators.required),
    })
  }

  getCategory(){
    this.bannerService.getAllCategory().subscribe((res:any)=>{
      this.allCategoryList=res.data
      this.cd.detectChanges()
    })
  }
  clickClose(){
    this.editData.imagePath=null
  }
  uploadFile(event: any) {
    const fileData = event.target.files[0]
    console.log(event.target.files[0])
    if(!fileData){
      this.imageUploadData.image=null
    }else{
    const uploadFileType = event.target.files[0].type
    console.log("uploadFileType",uploadFileType)
    let setFileType = ""
    if (uploadFileType == "image/png" || uploadFileType == "image/jpg" || uploadFileType == "image/jpeg" || uploadFileType=="image/gif") {
      setFileType = "image"
    } else {
      setFileType = "Format Not valid"
      event.target.value = '';
    }

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
      let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    console.log(img, img.height, img.width, "image height nd width")
    img.onload = () => {
      console.log(img, img.height, img.width, "image height nd width")
      if(true || (img.width === 300 && img.height === 300) || (img.width === 100 && img.height === 70)){
        console.log("correct size")
        this.bannerService.fileUpload(fd).subscribe((res: any) => {
          this.editData.imagePath = res.data.image
          this.cd.detectChanges()
        })
      }
      this.cd.detectChanges()
    }
      
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
  formSubmit(){
    const listParentCategory:any[]=['15','17','38','51']
    const categoryName:any={
      '15':'Footwear',
      '17':'Garments',
      '38':'Accessories',
      '51':'NEW ARRIVALS'
    }
    if(this.editData.type == 'Category Image' && listParentCategory.includes(this.editData.mainCategoryId) && this.editData.categoryId=='ALL'){
      this.brandNameForm.get('categoryId').setValue(this.editData.mainCategoryId)
      this.brandNameForm.get('categoryName').setValue(categoryName[this.editData.mainCategoryId])
    }
    console.log(this.brandNameForm.value)
    if(!this.brandNameForm.value.categoryId || !this.brandNameForm.value.type || !this.brandNameForm.value.categoryName || !this.brandNameForm.value.imagePath || !this.brandNameForm.value.isActive || !this.brandNameForm.value.description){
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "",
        popupMessage: "All field is required",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return false
    }
    this.bannerService.saveCategoryImage(this.brandNameForm.value).subscribe((res: any) => {
      const response:any = res
      if(response.status==200){
    this.popupMessage.next({
      popupShow: true,
      popupHeader: "",
      popupMessage: response.message,
      popupAction: "Ok",
      popupClass: "alert alert-success",
      popupRoute: "cms/category-list"
    })
  }else{
    this.popupMessage.next({
      popupShow: true,
      popupHeader: "",
      popupMessage: response.message,
      popupAction: "Ok",
      popupClass: "alert alert-danger",
      popupRoute: ""
    })
  }
    this.cd.detectChanges()
    })

  }

  setCategory(val:any){
    if(this.editData.mainCategoryId=='ALL'){
      this.editData.categoryName='All Category Product'
      this.childCategory=false
      this.editData.categoryId='ALL'
      }
      
    if(val && val!='ALL'){
    this.getChildCategory(val)
    }
  }

getChildCategory(categoryId:any){
  this.bannerService.getChildCategory(categoryId).subscribe((res:any)=>{
    const data:any[]=res.data
    if(data.length>0){
      this.childCategory=true
      this.childCategoryData=data
    }else{
      this.childCategory=false
      this.editData.categoryId=categoryId
      this.setCategoryName(categoryId, this.allCategoryList)
    }
    this.cd.detectChanges() 
  })
}

setSubCategory(val:any){
  if(val){
    if(val=='ALL' && this.editData.type=='Product Flash Image'){
      this.setCategoryName(this.editData.mainCategoryId, this.allCategoryList)
    }else{
      this.setCategoryName(val,this.childCategoryData)
    }
  }
}

setCategoryName(val:any, filterDataList:any){
  const filterData:any = filterDataList.filter((item:any)=>item.categoryId==val)
  this.editData.categoryName=filterData[0].name
}

  getDataByCategoryIdType(categoryId:any, type:any){
    this.bannerService.getDataByCategoryIdType(categoryId, type).subscribe((res:any)=>{
      this.editData=res.data
      if(this.editData.type=='Product Flash Image'){
        this.hideDescription=false
        this.editData.mainCategoryId = this.editData.categoryId
        this.selectType(this.editData.type)
      }else{
        if(this.editData.categoryId=='ALL'){
          this.brandNameForm.controls.categoryId.setValue(this.editData.mainCategoryId)
        }
      }
      this.cd.detectChanges()
    })
  }

  selectType(val:any){
    if(val=="Product Flash Image"){
      this.hideDescription=false
      this.editData.description='NA'
      this.childName='All child category'
    }else{
      this.hideDescription=true
      this.editData.description=null
      this.childName='Only for parent category'
    }
  }
}
