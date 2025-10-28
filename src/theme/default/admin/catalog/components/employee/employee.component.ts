import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ImportService } from 'src/core/admin/catalog/import/import.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  addemployeeForm: FormGroup;
  updateemployeeForm: FormGroup;
  public addcsvFileName: any;
  public addcsv: any;
  public addcsvFile: any;
  public updatecsvFileName: any;
  public updatecsv: any;
  public updatecsvFile: any;
  public uploadSubmit: boolean;
  fileInput: any;
  popupMessage = new BehaviorSubject({})
  exportReportForm: any;
  public showResultDiv: boolean = false;
  private subscriptions: Array<Subscription> = [];

  constructor(public cd: ChangeDetectorRef,
    private _importService: ImportService,
    private excelService: ExcelService,
  ) { }

  ngOnInit(): void {

    this.addemployeeForm = new FormGroup({
      imagePath: new FormControl(null, Validators.required),
    })
    this.updateemployeeForm = new FormGroup({
      imagePath: new FormControl(null, Validators.required),
    })
    this.exportReportForm = new FormGroup({
      employeeStatus: new FormControl("", Validators.required)
    })
  }

  formSubmit() {

  }
  addreset(fileInput) {
    this.addcsvFileName = '';
    this.addcsv = '';
    this.addcsvFile = undefined;
    this.uploadSubmit = false;


    (<HTMLInputElement>document.getElementById('addfileUpload')).value = "";
  }
  updatereset(fileInput) {
    this.updatecsvFileName = '';
    this.updatecsv = '';
    this.updatecsvFile = undefined;
    this.uploadSubmit = false;


    (<HTMLInputElement>document.getElementById('updatefileUpload')).value = "";
  }
  onaddUpload(event) {
    this.addcsv = event.target.files[0];
  }
  adduploadSuccess() {
    this.uploadSubmit = true;
    if (!this.addcsv) {
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Upload file",
        popupMessage: "Please select file first",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return;
    }
    this.showResultDiv = true;
    this.addcsvFile = this.addcsv;
    let _d = new FormData();
    _d.append('file', this.addcsv);
    this._importService.addEmployee(_d).subscribe(data => {
      this.cd.detectChanges();
    })
  }

  onupdateUpload(event) {

    this.updatecsv = event.target.files[0];
    console.log(this.updatecsv)
  }

  updateuploadSuccess() {
    this.uploadSubmit = true;
    console.log(this.updatecsv)
    if (!this.updatecsv) {
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Upload file",
        popupMessage: "Please select file first",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return;
    }
    this.showResultDiv = true;
    this.updatecsvFile = this.updatecsv;
    let _d: FormData = new FormData();
    _d.append('file', this.updatecsv);
    console.log(_d)
    this._importService.updateEmployee(_d).subscribe(data => {
      this.cd.detectChanges();
    })
  }

  exportAsXLSX() {
    const payload: any = `active=${this.exportReportForm.value.employeeStatus}`
    this._importService.getemployeeReport(payload).subscribe((res: any) => {
      console.log("Print", res.data.length)
      if (res.data.length > 0) {
        this.excelService.exportAsExcelFile(res.data, 'empolyee-report')
      } else {
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "Message",
          popupMessage: "No Data found",
          popupAction: "Ok",
          popupClass: "alert alert-danger",
          popupRoute: ""
        })
      }
    })
  }

  employeesexportAsXLSX() {
    // const payload: any = `active=${this.exportReportForm.value.employeeStatus}`
    this._importService.getallEmployeedata().subscribe((res: any) => {
      console.log("Print", res.data.length)
      if (res.data.length > 0) {
        this.excelService.exportAsExcelFile(res.data, 'empolyee-order-report')
      } else {
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "Message",
          popupMessage: "No Data found",
          popupAction: "Ok",
          popupClass: "alert alert-danger",
          popupRoute: ""
        })
      }
    })
  }
}
