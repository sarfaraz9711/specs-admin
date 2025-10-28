/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AddFacilitySkuMappingService } from 'src/core/admin/master-configuration/add-delete-f-s-mapping.service';
// import { FacilitySkuMappingService } from 'src/core/admin/master-configuration/facility-sku-mapping.service';


@Component({
  selector: 'app-facility-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FacilityFilterComponent implements OnInit {

  public facilityftrform: FormGroup;
  public facilityCode: FormControl;
 @Output() sendData= new EventEmitter<any>();
  constructor(
    public fb: FormBuilder,
    public _addMappingService: AddFacilitySkuMappingService
  ) { }


  ngOnInit() {
   
    this.initForm()
  }

  
  initForm() {
    this.facilityftrform = this.fb.group({
      facilityCode: [null, [Validators.required]],
    });
  }

  reset() {
    this.sendData.emit("Reset")

  }

  onSubmit() {
    console.log(this.facilityftrform.value)
   this.filterfacility(this.facilityftrform.value)

  }

  filterfacility(facilityCode:any){
    console.log(facilityCode)
  this._addMappingService.filterFacilitySku(facilityCode).subscribe((res:any)=>{
      if(res && res.status == 200){
        console.log("data filtr")
        this.sendData.emit(res.data)
      }
  },(err:any)=>{
      console.log(err, "not filter")
  })
   }


}
