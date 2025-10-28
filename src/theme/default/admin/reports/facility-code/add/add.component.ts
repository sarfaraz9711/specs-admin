import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Console } from "console";
import { BehaviorSubject } from "rxjs";
import { ConfigrationFacilityCodeService } from "src/core/admin/reports/configrationFacilityCode.service";
import { ExcelService } from "src/core/admin/reports/excelfacility.service";



@Component({
  selector: 'app-facility-code',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})

export class FacilityCodeComponent implements OnInit{
  public user: FormGroup;
 


  public isEdit: boolean
  public configrationdetail: any = {}
  public facilityDataList: any
  popupMessage= new BehaviorSubject({})

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _configrationFacilityCodeService: ConfigrationFacilityCodeService,
    private excelService: ExcelService
  ){ }

  
  ngOnInit(){

    this.user = this.fb.group({
      facilityCode: new FormControl(null, [Validators.required, Validators.pattern('/[A-Z]{3}(?:, [A-Z]{3}){0,14}/')])

    })
    this.getFacilityDataList()
  }

  onSubmits(user){
    if(user !== " "){
      this.saveFormData(user);
    }else {
     this.facilityDataList(user)
    }
    console.log(this.facilityDataList, "cnsb")
}

// onCancel() {
//   this._router.navigate(['/reports/facility-code/list']);
// }


     saveFormData(user){
      this._configrationFacilityCodeService.addFacilityCode(user).subscribe((res : any)=> {
        if (res && res.status == 200) {
          this.popupMessage.next({
            popupShow: true,
            popupHeader:"Message",
            popupMessage:"Facility inventory sync successfully",
            popupAction:"Ok",
            popupClass: "alert alert-success",
            popupRoute: ""
          })
        }
        
      })
     }

     getFacilityDataList () {
      this._configrationFacilityCodeService.listFacilityCode().subscribe((res : any)=> {
        if(res && res.status == 200){
          console.log(res.data, "cshabcahj");
          this.facilityDataList = res.data;
          console.log(this.facilityDataList, "xhbnh")
        }
      }, (err) => {
        console.log(err, "Error occured");
      })
    }

    exportAsXLSX(){
      this.excelService.exportAsExcelFile(this.facilityDataList, 'sample')
    }
}

