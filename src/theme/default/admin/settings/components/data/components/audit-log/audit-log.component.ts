/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'node_modules/rxjs/dist/types';
import { AuditLogSandbox } from 'src/core/admin/reports/audit-log/audit-log.sandbox';
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {

  public filterForm: FormGroup;
  public filterEnable = true;
  public buttoncheck = false;
  public buttonActive = false;
  public sellerArray = [];
  public selectedAll: any;
  public filterData: any = [];
  public filterDataId = [];
  public bulkFunction = false;
  private isCount: boolean;
  public pageSize: any = 20;
  public index: any = 0;
  public offset: any = 0;
  public keyword: any = '';
  public selectedDays?: any;
  public module?: any;
  public actionBy?: any;
  public queryData: any = {};
  fromDate: FormControl;
  toDate: FormControl;
  auditLogForm: FormGroup;
  public maxDate: any;
  public todayDate: any;
  isRequired = false;
  dateError: string;
  minDate: any;
  startDate: string;
  endDate: string;
  private subscriptions: Array<Subscription> = [];
  submitted = false;

  constructor(

    public sandbox: AuditLogSandbox, public router: Router, public route: ActivatedRoute, public fb: FormBuilder, public datepipe: DatePipe, public modalService: NgbModal) {
    this.subscribeVal();
  }

  ngOnInit(): void {
    this.initForm();
    // this.filterEnable = true;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.auditLogList();
    this.sandbox.auditLogModule({});
    this.auditLogListCount();
    this.getUserList(this.offset);
    this.todayDate = new Date();
    // this.maxDate = this.todayDate;
    this.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() };

  }
  pageLength() {
    this.auditLogList();
    this.auditLogListCount();
  }

  initForm() {
    this.fromDate = new FormControl('', [Validators.required]);
    this.toDate = new FormControl('', [Validators.required]);
    (this.auditLogForm = this.fb.group({
      fromDate: this.fromDate,
      toDate: this.toDate
    }));
  }

  // USER LIST
  getUserList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = '';
    this.sandbox.getUserList(params);

  }

  resetFilter() {
    if ((this.selectedDays !== '' && this.selectedDays !== null && this.selectedDays !== undefined) || (this.keyword !== '' && this.keyword !== null && this.keyword !== undefined) || (this.module !== '' && this.module !== null && this.module !== undefined) || (this.actionBy !== '' && this.actionBy !== null && this.actionBy !== undefined)) {
      this.selectedDays = null;
      this.keyword = '';
      this.module = null;
      this.actionBy = null;
      this.auditLogList();
      this.auditLogListCount();
    }

  }
  applyFilter() {
    this.keyword = this.selectedDays;
    this.module = this.module;
    this.actionBy = this.actionBy;
    if ((this.keyword !== '' && this.keyword !== undefined && this.keyword !== null) || (this.module !== '' && this.module !== undefined && this.module !== null) || (this.actionBy !== '' && this.actionBy !== undefined && this.actionBy !== null)) {
      this.auditLogList();
      this.auditLogListCount();
    }
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.sellerArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }

  }

  selectAll(event: any) {
    for (let i = 0; i < this.sellerArray.length; i++) {
      this.sellerArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  filterDataList() {
    this.filterData = this.sellerArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.auditLogId);
  }

  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttoncheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttoncheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  auditLogList() {
    const params: any = {};
    params.offset = this.offset || '';
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.module = this.module ? params.module = this.module : '';
    params.actionBy = this.actionBy ? params.actionBy = this.actionBy : '';
    this.sandbox.auditLogList(params);

    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

  }

  auditLogListCount() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.keyword = this.keyword;
    params.module = this.module || '';
    params.actionBy = this.actionBy || '';
    params.count = true;
    this.sandbox.auditLogListCount(params);
  }


  onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.auditLogList();
  }


  deleteDate() {
    const form = this.auditLogForm.value.fromDate;
    const to = this.auditLogForm.value.toDate;
    if (form && form.year) {
      this.startDate = form.year + '-' + form.month + '-' + form.day;
    }
    if (to && to.year) {
      this.endDate = to.year + '-' + to.month + '-' + to.day;
    }
    if (this.auditLogForm.value.fromDate || this.auditLogForm.value.toDate) {
      this.submitted = false;
      const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
        size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
      });
      modelRef.componentInstance.key = '';
      modelRef.componentInstance.id = '';
      modelRef.result.then((result) => {
        if (result === 'deleted') {
          const params: any = {};
          params.fromDate = this.startDate;
          params.toDate = this.endDate;
          this.sandbox.deleteLogs(params);
          this.subscriptions.push(this.sandbox.deleteLogs$.subscribe(_delete => {
            if (_delete) {
              if (_delete.status === 1) {
                this.auditLogList();
                this.auditLogListCount();
                this.auditLogForm.reset();

              }
            }
          }));
        }
      });
    } else {
      this.submitted = true;
    }

  }

  subscribeVal() {

    this.subscriptions.push(this.sandbox.auditLogList$.subscribe(data => {
      if (data && data[0]) {
        this.sellerArray = [];
        this.sellerArray = data.map(val => {
          return { ...val, selected: false };
        });

      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }


}
