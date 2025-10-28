import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ConfigService } from 'src/core/admin/service/config.service';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

@Component({
  selector: 'app-newblogadd',
  templateUrl: './newblogadd.component.html',
  styleUrls: ['./newblogadd.component.scss']
})
export class NewBlogaddComponent implements OnInit {
  public pagesForm: FormGroup;
  public title: FormControl;
  public description: FormControl;
  public image: FormControl;
  public bannerimage: FormControl;
  public status: FormControl;
  public category_name: FormControl;
  public descriptionimage: FormControl;
  public submitted = false;
  editData: any = {}
  editId: any;
  uploadNewImage: any = false;
  uploadBanberNewImage: any = false;
  imageUploadData: any = {};
  imageUploadBannerData: any = {};
  ImageUrl: string | ArrayBuffer;
  imageUrl: string;
  imagePath: any;
  imagefile: string;
  imagebannerfile: string;
  getBlogdata: any;
  getid:any;
  public config: any;
  public ckeConfig: any;
  ckEditorValid:boolean =false;
  ckEditorVal ="";
  descriptionfile:string
  imageUploaddescriptionData: any = {};

  constructor(
    public bannerService: BannerService,
    public fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private configService: ConfigService,
    private route: ActivatedRoute,
    public ckeconfiqservice: CkeConfiqService,

  ) {
    this.config = this.ckeconfiqservice.getckeconfig();
   }

  ngOnInit(): void {
    this.imageUrl = this.configService.getImageUrl();
    this.pagesForm = this.fb.group({

      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      description: ['',Validators.compose([
        Validators.required,
      ])],
      image: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      bannerimage: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      status: ['', Validators.compose([
        Validators.required,
      ])],
      category_name: ['', Validators.compose([
        Validators.required,
      ])],
    });
    
    // this.pagesForm = this.fb.group({

    //   title: ['',],
    //   description: [''],
    //   image: new FormControl(null),
    //   bannerimage: new FormControl(null),
    //   status: [''],
    //   category_name: ['', Validators.required],
    // });

    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      const params: any = {};
      params.id = this.editId;
      this.bannerService.getBlogsDetails(params).subscribe((res: any) => {
        this.getBlogdata = res.data
        this.imageUploadData.image = this.getBlogdata.image
        this.imageUploadBannerData.image = this.getBlogdata.banner_image
        this.getData(res.data.description)
          this.setPage(res.data);
          this.cd.detectChanges();
        
      })
    }
    
  }

  setPage(details) {
    this.pagesForm.controls['title'].setValue(details.title);
    this.pagesForm.controls['description'].setValue(details.description);
    this.pagesForm.controls['image'].setValue(details.image);
    this.pagesForm.controls['bannerimage'].setValue(details.banner_image);
    this.pagesForm.controls['status'].setValue(details.isActive);
    this.pagesForm.controls['category_name'].setValue(details.category_name);
    console.log("details", this.pagesForm.value)
  }

  pagesCancel() {
    this.router.navigate(['/cms/Blogs/list']);
  }

  get f() {
    return this.pagesForm.controls;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.pagesForm.valid) {
      this.validateAllFormFields(this.pagesForm);
      return;
    }
    console.log('descriptvalue>>>',this.pagesForm.value.description)
    console.log('descplength',this.pagesForm.value.description.trim().length)


    // console.log('=== ', this.pagesForm.value.title, ' + ', this.pagesForm.value.title.trim(), ' + ', (this.pagesForm.value.title.trim()).length, this.pagesForm.value.title.trim().length<1)
    if(!this.pagesForm.value.title.trim() || this.pagesForm.value.title.trim().length == undefined || this.pagesForm.value.title.trim().length <1){
      this.pagesForm.controls['title'].setErrors({ incorrect: true, message: 'minlength errro...'});
      console.log('hhhhhhhhhhhh');
      return;
    }

    console.log(this.pagesForm.value.description.trim(),"..............................")

    // if(this.pagesForm.value.description.trim() || this.pagesForm.value.description.trim().length == undefined || this.pagesForm.value.description.trim().length < 1){
    //   this.pagesForm.controls['description'].setErrors({ incorrect: true, message: 'minlength errro...'});
    //   console.log('yyyyyyyyyyyyy');
    //   return;
    // }

    
    const params: any = {};
      params.title = this.pagesForm.value.title;
      params.description = window.btoa(this.pagesForm.value.description);
      params.image = this.pagesForm.value.image;
      params.banner_image = this.pagesForm.value.bannerimage;
      params.status = this.pagesForm.value.status;
      params.category_name = this.pagesForm.value.category_name;
      console.log("details", params, this.submitted, !this.pagesForm.valid, this.pagesForm.invalid)

    if(this.editId){
      params.id = Number(this.editId);
      console.log(params,"data")

      this.bannerService.updateBlog(params).subscribe((res:any)=>{
        if(res.status == 1){
          this.pagesForm.reset()
          this.router.navigate(['/cms/Blogs/list']);
        }
      })
    }else{
      this.bannerService.addBlog(params).subscribe((res:any)=>{
        if(res.status == 1){
          this.pagesForm.reset()
          this.router.navigate(['/cms/Blogs/list']);
        }
      })
    }
    // if (this.editId) {
    //   this.bannerService.updateBannerData(this.pagesForm.value, this.editId).subscribe((res: any) => {
    //     this.pagesForm.reset();
    //     this.pagesForm.get("status").setValue("1");
    //     setTimeout(() => {
    //     }, 3000);
    //     this.editData.image = null;
    //     this.uploadNewImage = false;
    //     this.cd.detectChanges()
    //   });
    // }
  }

  uploadFile(event: any, type: string) {
    const fileData = event.target.files[0]
    console.log(event.target.files[0])
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
      this.bannerService.fileUpload(fd).subscribe((res: any) => {
        if (type === 'image') {
          this.imageUploadData = res.data;
        } else if (type === 'bannerimage') {
          this.imageUploadBannerData = res.data;
        }else if(type === 'descriptionimage'){
          this.imageUploaddescriptionData = res.data;
        }
        setTimeout(() => {
          document.getElementById("descriptionImg").focus()
        }, 1000);
        this.cd.detectChanges()
      })
    }, 100)

  }
  getData(value:any){
   if(value.length > 0){
    this.ckEditorValid=true;
    this.ckEditorVal=value;
   }else{
    this.ckEditorValid=false;
   this.ckEditorVal=value;
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

   clickClose(){
    this.getBlogdata.image = ''; 
    // this.uploadNewImage = true;
   }

   bannerClickClose(){
    this.getBlogdata.banner_image = ''
    // this.uploadNewImage = true;
   }
}