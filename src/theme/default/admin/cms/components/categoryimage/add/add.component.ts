import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/core/admin/catalog/product/product.service';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ConfigService } from 'src/core/admin/service/config.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  ImageUrl: string | ArrayBuffer;
  imageUrl: string;
  imageUploadData: any = {};
  parentcategoryId: any;
  allDataList: any;
  allList: any;
  productList: any;
  value: false;
  showOn: any;
  link: any;
  imagePath: any;
  popupMessage = new BehaviorSubject({})
  viewdata: any;
  imagefile: string;
  listType: string='ALL';
  constructor(public bannerService: BannerService, private productService: ProductService, 
    private cd: ChangeDetectorRef,
    private configService: ConfigService,
    private router: Router,
    public route: ActivatedRoute,
    ) { }
  brandNameForm: FormGroup
  editData: any = {}
  editId: any;
  uploadNewImage: any = false;
  updatedSuccessfully: any = 0
  parentcategory:any
  childcategory:any
  getViewEnviroment:any
  ngOnInit(): void {
    this.imageUrl = this.configService.getImageUrl();
    this.brandNameForm = new FormGroup({
      content: new FormControl(null),
      showOn: new FormControl("", Validators.required),
      link: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      status: new FormControl("1"),
      imagefile: new FormControl(null),

    })

    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data.id;
      }
    });

    if (this.editId) {
      this.bannerService.getOfferImageList(this.listType).subscribe((res: any) => {
        this.editData = res.data.filter((item) => item.Id == this.editId)[0]
        console.log("this.editid", this.editData, this.editData.imagePath) 
        this.imageUploadData.image = this.editData.imagePath
        if(this.editData.showOn == "footwear" ||this.editData.showOn == "garments" ||this.editData.showOn == "accessories"){
          this.viewdata = "For Mobile"
          this.getViewEnviroment='mobile'
        }else{
          this.viewdata = "For Desktop"
          this.getViewEnviroment='desktop'
        }
        console.log("printData", this.viewdata)
        this.cd.detectChanges()
 
      });
    }

    
    const getLocation = window.location.hash
    if (getLocation == "#/cms/add-offer-image") {

    }
    this.getList()
    this.getCategoryList()

    console.log("upload", this.uploadNewImage)
  }

  formSubmit() {
    if (this.editId) {
      if(this.getViewEnviroment == "mobile"){
        this.brandNameForm.value.content= "category"
      };

      if(this.brandNameForm.value.link !== '' && this.brandNameForm.value.imagePath !== ''){      
      this.bannerService.updateBannerData(this.brandNameForm.value, this.editId).subscribe((res: any) => {
        this.getList();
        this.brandNameForm.reset();
        this.brandNameForm.get("status").setValue("1");
        this.updatedSuccessfully = 1;
        this.router.navigate(['/cms/list']);
        setTimeout(() => {
          this.updatedSuccessfully = 0;
        }, 3000);
        this.editData.imagePath = null;
        this.uploadNewImage = false;
        this.cd.detectChanges()
      })}else{
        console.log("hello")
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "",
          popupMessage: "Please fill all the values",
          popupAction: "Ok",
          popupClass: "alert alert-danger",
          popupRoute: ""
        })
      }
    
    }else{
      if(this.getViewEnviroment == "mobile"){
        this.brandNameForm.value.content= "category"
      }
 
      if(this.brandNameForm.value.showOn != "" && this.brandNameForm.value.imagePath !="" && this.brandNameForm.value.link){
        this.bannerService.addDocument(this.brandNameForm.value).subscribe((res:any)=>{
          this.getList()
          if(res.status == 1){
            this.brandNameForm.reset()
            this.router.navigate(['/cms/list']);
          }
        }
        )  
      }else{
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "",
          popupMessage: "Please fill all the values",
          popupAction: "Ok",
          popupClass: "alert alert-danger",
          popupRoute: ""
        })
      }
     
    }

  }


  uploadFile(event: any) {
    const fileData = event.target.files[0]
    console.log(event.target.files[0])
    if(!fileData){
      this.imageUploadData.image=null
    }else{
    const uploadFileType = event.target.files[0].type
    let setFileType = ""
    if (uploadFileType == "image/png" || uploadFileType == "image/jpg" || uploadFileType == "image/jpeg") {
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
          this.imageUploadData = res.data
          this.cd.detectChanges()
        })
      }else {
        this.brandNameForm.get("imagefile").reset()
        this.imageUploadData.image = ""
        this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Image size not vaild",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
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

  getList() {
    this.bannerService.getOfferImageList(this.listType).subscribe((res: any) => {
      this.allDataList = res.data.sort((a, b) => (b.Id - a.Id));
    })
  }

  cancelForm(){
    this.router.navigate(['/cms/list']);
  }

  getCategoryList(){
    this.bannerService.getAllcategory().subscribe((res: any) => {
      this.parentcategory = res.data.filter((item) => (item.name).toUpperCase() == "FOOTWEAR" || (item.name).toUpperCase() == "GARMENTS")
    })
   
  }

  setXProduct(event){
    this.childcategory = event.children
    console.log("this", this.childcategory)

  }
  clickClose(){
    this.uploadNewImage = true;
    this.imageUploadData.image = ""
  }
  getview(event){
   console.log(event, "eventevent")
   this.getViewEnviroment = event;
  }

}
