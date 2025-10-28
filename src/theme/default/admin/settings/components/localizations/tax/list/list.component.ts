/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxSandbox } from '../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../../core/admin/settings/localizations/tax/tax.service';
import { TaxAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-spurt-taxlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TaxListComponent implements OnInit {
  public type = 'edit';
  public pageSize: any = 5;
  private pageoffset: number;
  private editedTaxValue: any = {};
  private popoverContent: any;

  constructor(
    public modal: NgbModal,
    public sandbox: TaxSandbox,
    private taxService: TaxService,
    private router: Router
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.taxList();
    this.countPaginationApi();

    this.sandbox.taxAddLoaded$.subscribe(data => {
      if (data) {
        this.taxList();
      }
    });

    this.sandbox.taxUpdateLoaded$.subscribe(data => {
      if (data) {
        this.taxList();
      }
    });
  }

  addTax(data, type) {
    const modalRef = this.modal.open(TaxAddComponent, {
      windowClass: 'add-customers', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      this.taxService.setEditedValue(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.taxId;
    } else {
      this.taxService.setEditedValue('');
    }
  }

  /**
   * Handles form 'list' event. Calls sandbox Tax List function.
   *
   * @param params storing entire value
   */
  taxList(offset: any = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = '';
    params.count = '';
    this.sandbox.getTaxList(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Tax List Pagination count function.
   *
   * @param params storing entire value
   */
  countPaginationApi() {
    const params: any = {};
    params.limit = 5;
    params.offset = '';
    params.keyword = '';
    params.count = 1;
    this.sandbox.getTaxListCount(params);
  }

  onPageChange(event) {
    this.pageoffset = event.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    this.taxList(this.pageoffset);
    this.taxService.deletePagerefresh(this.pageoffset);
  }

  editTax(value: any) {
    this.editedTaxValue = this.taxService.setEditedValue(value);
    this.router.navigate(['/settings/local/tax/edit', value.taxId]);
  }

  deleteTax(taxId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteTax({ taxId: taxId });
        this.regSubscribeEvents();
      }
    });
  }

  regSubscribeEvents() {
    this.sandbox.getTaxDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.taxList(this.pageoffset);
        this.countPaginationApi();
      }
    });
  }
}
