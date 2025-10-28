/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
// sandbox
import { VariantsSandbox } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.sandbox';
import { VariantsService } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VariantsAddComponent } from '../add/add.component';

@Component({
  selector: 'app-list-productoption',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class VariantsListComponent implements OnInit, OnDestroy {

  private offset = 0;
  public pageSize = '10';
  public index: number;
  private currentPage: number;
  public deleteId: boolean;
  private subscriptions: Array<Subscription> = [];
  variantDetails: any = {};
  type: any = 'edit';
  // modalService: any;

  constructor(
    public sandbox: VariantsSandbox,
    public service: VariantsService,
    private route: Router,
    public modalService: NgbModal
  ) { }

  // initially calls  productOptionsList,productPagination
  ngOnInit() {
    this.sandbox.productOptionsAddLoaded$.subscribe(data => {
      if (data === true) {
        this.productOptionsList();
        this.productOptionListCount();
      }
    });
    this.sandbox.productOptionsUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.productOptionsList();
        this.productOptionListCount();
      }
    });
    this.index = 0;
    this.deleteId = true;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.productOptionsList();
    this.productOptionListCount();
  }

  /** calls sandbox getVariantsList for pagination
   *  @param  by default empty value
   *  */
  productOptionsList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = '';
    this.sandbox.getVariantsList(param);
  }

  /** calls sandbox getVariantsListCount for pagination
   *  @param count by default value
   *  */
  productOptionListCount() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = 1;
    this.sandbox.getVariantsListCount(param);
  }
  pageLength() {
    this.productOptionsList();
    this.productOptionListCount();
  }

  /**
   * Handles  'onPageChange' event. Calls categorylist function .
   *  @param event  from material paginator value
   */

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.productOptionsList();
  }

  // calls sandbox doVariantsDelete .param from the event
  deleteOptions(id) {

    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.doVariantsDelete({ id: id });
        this.subscriptions.push(this.sandbox.deleteVariant$.subscribe(data => {
          if (data && data.status === 1) {
            this.productOptionsList();
            this.productOptionListCount();
          }
        }));
      }
    });


  }

  // edit product options
  editOptions(value) {
    this.route.navigate(['/settings/site-settings/variants/edit', value.id]);
  }

  // add product options
  addOption() {
    this.route.navigate(['/settings/site-settings/variants/add']);
  }


  addNewVariant(data, type) {
    this.variantDetails = null;
    this.service.variantsetdata(this.variantDetails);
    const modalRef2 = this.modalService.open(VariantsAddComponent, {
      windowClass: 'roles', backdrop: 'static', centered: true
    });
    if (type === 'edit') {
      this.variantDetails = data;
      this.service.variantsetdata(this.variantDetails);

      modalRef2.componentInstance.edit = 'edit';
      modalRef2.componentInstance.id = data;
    }
    modalRef2.result.then(result => {
      if (result === 'close') {

      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
