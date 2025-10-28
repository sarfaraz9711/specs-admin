import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportSandbox } from '../../../../../../../core/admin/catalog/import/import.sandbox';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription ,BehaviorSubject} from 'rxjs';
import { ImportService } from 'src/core/admin/catalog/import/import.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
import { ProductService } from 'src/core/admin/catalog/product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  brandNameForm: FormGroup
  public csvFile: any;
  public csv: any;
  private subscriptions: Array<Subscription> = [];
  public csvFileName:any;
  public uploadSubmit:boolean;
  fileInput: any;
  public showResultDiv:boolean=false;

  popupMessage=new BehaviorSubject({})
  csvImage: any;
  showResultDivImage: boolean;





  constructor(public cd: ChangeDetectorRef, private _importService: ImportService,private router:Router,
    private excelService: ExcelService,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.brandNameForm = new FormGroup({
      imagePath: new FormControl(null, Validators.required),
    })
   // this.uploaded=false;
  }

  formSubmit() {
   
  }
  reset() {
    this.csvFileName = '';
    this.csv = '';
    this.csvImage=''
    this.csvFile = undefined;
    this.uploadSubmit = false;

    
    (<HTMLInputElement>document.getElementById('fileUpload')).value = "";
    (<HTMLInputElement>document.getElementById('fileUpload1')).value = "";
  }
  onUpload(event, flag) {
    if(flag==1){
      this.csv = event.target.files[0];
    }else{
      this.csvImage = event.target.files[0];
    }
  }
  uploadSuccess(flag:any) {
    //this.showResultDiv=true;
    if(flag==1){
      this.showResultDiv=true;
      this.csvFile = this.csv;
    }else{
      this.showResultDivImage=true;
      this.csvFile = this.csvImage;
    }
    this.uploadSubmit = true;
    if(!this.csvFile){
      this.popupMessage.next({  
        popupShow: true,
        popupHeader:"Upload file",
        popupMessage:"Please select file first",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return;
    }
    
    let _d = new FormData();
    _d.append('file', this.csvFile);
    console.log(_d)
    this._importService.updateProduct(_d, flag).subscribe(data=>{
      this.cd.detectChanges();
      this.reset()
    })
  }

  downloadCorrectionFile(uploaded:any){
    let filepath=uploaded;
    this._importService.downloadCorrectionFile(filepath).subscribe(data=>{
      const linkSource =
      'data:application/octet-stream;base64,' +data.data;
    const downloadLink = document.createElement('a');
    const fileName = uploaded;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    })
    

  }
  exportAsXLSX(){
    console.log("orderStstuslist>>>>>",);
this.productService.exportProduct().subscribe((res:any)=>{
if(res.length>0){
    this.excelService.exportAsExcelFile(res, 'order-report')
}

})}

}
