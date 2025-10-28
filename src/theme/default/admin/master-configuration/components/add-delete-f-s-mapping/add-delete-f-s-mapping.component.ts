import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddFacilitySkuMappingService } from 'src/core/admin/master-configuration/add-delete-f-s-mapping.service';

@Component({
  selector: 'app-add-delete-f-s-mapping',
  templateUrl: './add-delete-f-s-mapping.component.html',
  styleUrls: ['./add-delete-f-s-mapping.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AddDeleteFSMappingComponent {
  public user: FormGroup
  public form: FormGroup
  public facilityName: any
  public skuName : any
  public quantity : any


  constructor(
    public fb: FormBuilder,
    public _addMappingService: AddFacilitySkuMappingService,
    public __router: Router

  ) { }

  ngOnInit() {

    this.user = this.fb.group({
      facilityCode: new FormControl(null, [Validators.required]),
      sku: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required])
    })
  }

  onSubmits(){
    this.saveFormData(this.user.value)
  }

  onCancel() {
    this.__router.navigate(['/master-configuration/list-facility-sku'])
  }

 saveFormData(user){
    this._addMappingService.addFacilitySku(user).subscribe((res: any) => {
      if (res && res.status == 200) {
        console.log("data sbmited")
        this.__router.navigate(['/master-configuration/list-facility-sku'])
      }
    })
 }

}
