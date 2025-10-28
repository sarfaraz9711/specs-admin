import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DeliveryTatService } from "src/core/admin/reports/deliveryTat.service";



@Component({
  selector: 'app-file-upload',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})

export class DeliveryTatComponent implements OnInit {
  public user: FormGroup;
  public formData = new FormData
  fileName = '';
  public tat: any;
  public uploadSubmit = false;
  ReqJson: any = {};
  RequestOptions: any
  parm: any
  selectedFile: any
  fileUploadForm: any
  fileError: any
  fileSelectedToUpload: any
  fileProgress: any
  

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public _DeliveryTatService: DeliveryTatService
  ) { }

  ngOnInit() {

    this.user = this.fb.group({
      tat: new FormControl(this.tat, [Validators.required]),

    })
    

  }

  onUpload(val: any) {
    console.log(val, "hbnb")
    this.fileProgress = 0
    const fd = new FormData()
    fd.append("file", this.fileName) ;
    fd.append("file_type", 'ecom tat'); 

    console.log(fd, "dcv")
    
    this._DeliveryTatService.addTat(fd).subscribe((res: any)=>{
      if(res && res.status == 200){
        
        console.log(res, "fvyjfvj")
      }
    })



  }

  handleChange(event) {
    console.log(event, "hjhj")
    this.fileName = event.target.files[0];
  }


  onFileSelected(event) {
    let getFileType = event.target.files[0].type
    let fileLength = getFileType.length
    let fileIndex = getFileType.indexOf('/') + 1
    let getExt = event.target.files[0].type.substring(fileIndex, fileLength);
    console.log(fileLength, "filelength")

    if (this.parm.fileType.includes(getExt)) {
      this.selectedFile = <File>event.target.files[0];
      document.getElementById("fileError").style.display = "none"
    } else {
      this.fileUploadForm.controls.fileUpload.reset()
      document.getElementById("fileError").style.display = "block"
      this.fileError = "File format not supported"
      return false
    }
    let allowedFileSize: number = 1024 * 100 //Size in MB(1MB = 1024KB)
    let uploadedFileSize: number = parseInt((event.target.files[0].size / 1000).toFixed(0)) //Size in KB

    this.fileSelectedToUpload = uploadedFileSize;

    console.log("uploadedFileSize", uploadedFileSize);
    if (uploadedFileSize <= allowedFileSize) {
      document.getElementById("fileError").style.display = "none"
    } else {
      this.fileUploadForm.controls.fileUpload.reset()
      document.getElementById("fileError").style.display = "block"
      this.fileError = "File size should be less than 100 MB"
      return false
    }

  }


}

