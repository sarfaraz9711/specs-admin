import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FacilitySkuMappingService } from 'src/core/admin/master-configuration/facility-sku-mapping.service';

@Component({
  selector: 'app-facility-sku-upload',
  templateUrl: './facility-sku-upload.component.html',
  styleUrls: ['./facility-sku-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacilitySkuUploadComponent implements OnInit {
  csvFile: any;
  csvFileName: any;
  uploadSubmit: boolean;
  fileInput: any;
  toastr: any;
  sandbox: any;
  subscriptions: any;
  uploadPage: boolean;
  initialPage: boolean;
  csvFileSelected: boolean;

  uploadFile: any
  popupMessage: any = new BehaviorSubject({});

  constructor(public cd: ChangeDetectorRef, private _serviceImport: FacilitySkuMappingService) { }

  ngOnInit(): void {
  }


  onUpload(event) {
    this.csvFile = event.target.files[0];
    this.csvFileName = event.target.files[0].name;
  }

  reset(fileInput) {
    this.csvFileName = '';
    this.csvFile = undefined;
    this.uploadSubmit = false;
    this.fileInput.nativeElement.value = '';
  }

  // upload file

  uploadSuccess() {
    this.uploadSubmit = true;
    if (!this.csvFile) {
      return;
    }
    const ext = /^.+\.([^.]+)$/.exec(this.csvFile.name);
    if (!ext || (ext && ext[1] !== 'csv')) {
      this.toastr.errorToastr('Please choose the csv file');
      this.csvFile = undefined;
      this.csvFileName = '';
      return;
    }
    const params: any = {};
    let _d = new FormData();
    _d.append('file', this.csvFile);
    params.file = this.csvFile;
    console.log("params", params);
    // this.sandbox.uploadFile(params);
    // this.subscriptions.push(this.sandbox.uploadFile$.subscribe(data => {
    //   if (data && data.status === 1) {
    //     this.uploadPage = false;
    //     this.initialPage = true;
    //     this.csvFileSelected = false;
    //     this.csvFileName = '';
    //     this.cd.detectChanges();
    //   }
    // }));
    this._serviceImport.importFileSystem(_d).subscribe({
        next : (val)=>this.ifResultSuccess(val),
        error : (error)=>this.ifResultError(error)
      });
  }

  downloadSuccess(){
    
  }


  ifResultSuccess = (res:any) =>{
    console.log(res);
    if (res.status == '200') {
      this.uploadPage = false;
      this.initialPage = true;
      this.csvFileSelected = false;
      this.csvFileName = '';
      

      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "File uploaded successfully, It will start syncing automatically in 30 minutes.",
        popupAction: "Ok",
        popupClass: "alert alert-success",
        popupRoute: ""
      });

      this.cd.detectChanges();
    } else {
      
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Something went wrong.",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      });

      this.cd.detectChanges();
    }
  }

  ifResultError = (error:any) =>{
    console.log("error", error);
    
    this.popupMessage.next({
      popupShow: true,
      popupHeader: "Message",
      popupMessage: "Something went wrong.",
      popupAction: "Ok",
      popupClass: "alert alert-danger",
      popupRoute: ""
    });
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    //this.subscriptions.forEach(each => each.unsubscribe());
  }

}
