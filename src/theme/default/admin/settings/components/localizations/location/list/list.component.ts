/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocationService } from '../../../../../../../../core/admin/settings/localizations/location/location.service';
import { LocationSandbox } from '../../../../../../../../core/admin/settings/localizations/location/location.sandbox';
import { LocationAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-settings-location-list',
  templateUrl: './list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}.coc{
  background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
}`]
})
export class LocationListComponent implements OnInit {
  public type = 'edit';
  public pageSize = '5';
  private keyword = '';
  private offset: any;
  private isCount: boolean;
  public currentPage: any;
  public index: any;
  private popoverContent: any;

  constructor(
    public modal: NgbModal,
    private router: Router,
    public locationSandbox: LocationSandbox,
    public service: LocationService
  ) {
    this.regSubscribeEvents();
  }

  // initially calls getLocationsList with argument( offset)
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.getLocationsList(this.offset);

    this.locationSandbox.locationAddLoaded$.subscribe(data => {
      if (data === true) {
        this.getLocationsList(this.offset);
      }
    });

    this.locationSandbox.locationUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.getLocationsList(this.offset);
      }
    });
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  /**
   * Handles  'getLocationsList' event. Calls sandbox getLocationList  and getlocationpagination function .
   *
   * @param offset from material paginator
   * @param params storing pagination value
   */
  getLocationsList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.locationSandbox.getLocationList(params);
    if (this.isCount) {
      params.count = true;
      this.locationSandbox.getlocationpagination(params);
    }
  }

  // navigate to add component
  AddeNewLocation(data, type) {
    const modalRef = this.modal.open(LocationAddComponent, {
      windowClass: 'add-customers', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      this.service.setlocationlistdata(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.deliveryLocationId;
    } else {
      this.service.setlocationlistdata('');
    }
  }

  // calls service setlocationlistdata with argument (list).And navigate to edit component.
  editlocation(list) {
    this.service.setlocationlistdata(list);
    this.router.navigate(['/settings/local/delivery-location/edit', list.deliveryLocationId]);
  }

  // calls getLocationsList with argument(offset)for pagination
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getLocationsList(this.offset);
  }

  /**  calls locationSandbox locationDelete with argument (locationId)
   * calls stopPropagation function
   * */

  deleteLocation(locationId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.locationSandbox.locationDelete({ locationId: locationId });
      }
    });
  }

  /**  calls locationSandbox  deleteLocation$ if success reponse gotted then
   * calls getLocationsList function with argument(offset).
   * */
  regSubscribeEvents() {
    this.locationSandbox.deleteLocation$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getLocationsList(this.offset);
      }
    });
  }
}
