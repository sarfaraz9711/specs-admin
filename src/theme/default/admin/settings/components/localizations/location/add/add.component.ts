/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '../../../../../../../../core/admin/settings/localizations/location/location.sandbox';
import { LocationService } from '../../../../../../../../core/admin/settings/localizations/location/location.service';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
const CSS_CLASS_NAMES = {
  highLight: 'dd-highlight-item'
};
@Component({
  selector: 'app-settings-location-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class LocationAddComponent implements OnInit {
  private isCount: boolean;
  public config: any = { displayKey: 'name', value: 'countryId', search: true };
  public submitted = false;
  private countryId: any;
  public pageSize = 5;
  private keyword = '';
  private offset: any;
  private valid: boolean;
  private editlocationinfo: any = [];
  private pagenationcount = 1;
  public countryvalid: any;
  public updatetitle: any;
  private editLocationId: any;
  public countryList: any = [];
  // FormGroup Variable
  public locationForm: FormGroup;
  public locationname: FormControl;
  public locationcode: FormControl;

  constructor(
    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: LocationSandbox,
    public countrysandbox: CountrySandbox,
    private router: Router,
    public service: LocationService
  ) { }

  // VALIDATION
  get f() {
    return this.locationForm.controls;
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  /**initially calls  getCountryListwith arguments(offset,keyword)
   * initForm,editLocationList
   *
   * */
  ngOnInit() {
    this.initForm();
    this.editLocationId = this.route.snapshot.paramMap.get('id');
    this.editLocationList();
    this.subscribe();
  }

  subscribe() {
    this.countrysandbox.countryList$.subscribe(data => {
      this.countryList = data;
    });
  }

  initForm() {
    this.locationForm = this.fb.group({
      locationname: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$'),Validators.maxLength(255)]],
      locationcode: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)

      ])],
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Location updateLocation and addNewLocation function if form is valid.
   *
   * @param countryForm entire form value
   * @param para storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      if (this.countryId) {
        this.countryvalid = false;
      } else {
        this.countryvalid = true;
      }
      return;
    }
    if (
      this.locationForm.value.locationname !== '' &&
      this.locationForm.value.locationcode !== ''
    ) {
      const para: any = {};
      para.locationName = this.locationForm.value.locationname;
      para.zipCode = this.locationForm.value.locationcode;
      if (this.editlocationinfo && this.editlocationinfo[0].deliveryLocationId) {
        para.deliveryLocationId = this.editlocationinfo[0].deliveryLocationId;
        this.sandbox.updateLocation(para);
        this.getLocationsList(this.offset);
      } else {
        this.sandbox.addNewLocation(para);
        this.getLocationsList(this.offset);
      }
    } else {
      this.valid = true;
    }
    this.getLocationsList(this.offset);
    this.modalService.close('close');
  }


  getLocationsList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.sandbox.getLocationList(params);
    if (this.isCount) {
      params.count = true;
      this.sandbox.getlocationpagination(params);
    }
  }




  close() {
    this.modalService.close('close');

  }
  cancel() {
    this.router.navigate(['/settings/local/delivery-location']);
  }

  editLocationList() {
    this.editlocationinfo.push(this.service.getlocationlistdata());
    if (this.editlocationinfo[0] !== null) {
      if (this.editlocationinfo[0] && this.editlocationinfo[0].locationName) {
        this.updatetitle = 1;
        this.locationForm.controls['locationname'].setValue(this.editlocationinfo[0].locationName);
        this.locationForm.controls['locationcode'].setValue(this.editlocationinfo[0].zipCode);
      }
    } else {
      this.locationForm = null;
    }
  }
}
