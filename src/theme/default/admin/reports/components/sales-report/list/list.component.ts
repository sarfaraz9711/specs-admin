import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { SalesReportSandbox } from '../../../../../../../core/admin/reports/sales-report/sales-report.sandbox';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class SalesReportListComponent implements OnInit, OnDestroy {

  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public productKeyword: any = '';
  public categoryKeyword: any = '';
  public selectedProductId: any = [];

  public fromDate: any;
  public toDate: any;
  private subscriptions: Array<Subscription> = [];
  public productError = false;
  public submitted = false;
  public filterParams: any;
  public extraColumns: any = [];
  public manafacturer = false;
  public orderStatus = false;
  public customerGroup = false;
  public orderId = false;
  public paymentType = false;
  public browserInfo = false;
  public minimumDate: any;

  @ViewChild('drop') public drop: ElementRef;



  constructor(public sandbox: SalesReportSandbox, public datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    public layoutSandbox: LayoutSandbox,
    public cd: ChangeDetectorRef) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryList();
  }

  getProductList() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.keyword = this.productKeyword;
    params.sku = '';
    params.status = '';
    params.price = '';
    this.sandbox.getProductList(params);
  }

  getCategoryList() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.keyword = this.categoryKeyword;
    params.status = '';
    this.sandbox.getCategoryList(params);
  }

  searchProduct(key) {
    const params: any = {};
    params.keyword = key;
    this.sandbox.searchProduct(params);
  }

  searchCategory(key) {
    const params: any = {};
    params.keyword = key;
    this.sandbox.searchCategory(params);
  }

  selectProduct(checked, list) {
    this.submitted = false;
    const params: any = {};
    params.list = list;
    params.checked = checked;
    this.sandbox.selectProduct(params);
  }


  selectCategory(checked, list) {
    this.submitted = false;
    const params: any = {};
    params.list = list;
    params.checked = checked;
    this.sandbox.selectCategory(params);
  }


  generateReport() {
    let productId = [];
    this.submitted = true;
    this.productError = false;
    this.subscriptions.push(this.sandbox.selectedProductList$.subscribe(data => {
      if (data && data.length > 0) {
        this.selectedProductId = data;
      } else {
        this.selectedProductId = [];
      }
    }));

    if (this.selectedProductId.length === 0) {
      this.productError = true;
      return;
    } else {
      this.selectedProductId.forEach(data => {
        productId.push(data.productId);
      });
    }
    const params: any = {};
    params.productId = productId.toString();

    const fromdates = this.fromDate;
    params.startDate = fromdates ? (fromdates.year) + '-' + ('0' + fromdates.month).slice(-2) + '-' + ('0' + fromdates.day).slice(-2) : '';
    const todates = this.toDate;
    params.endDate = todates ? (todates.year) + '-' + ('0' + todates.month).slice(-2) + '-' + ('0' + todates.day).slice(-2) : '';
    // params.startDate = this.fromDate ? this.datePipe.transform(this.fromDate, 'yyyy-MM-dd') : '';
    // params.endDate = this.toDate ? this.datePipe.transform(this.toDate, 'yyyy-MM-dd') : '';

    localStorage.setItem('salesReportParams', JSON.stringify(params));
    this.sandbox.salesReportList(params);
    this.subscriptions.push(this.sandbox.salesReportListLoaded$.subscribe(data => {
      if (data && data === true) {
        this.filterParams = localStorage.getItem('salesReportParams') ? JSON.parse(localStorage.getItem('salesReportParams')) : '';
        this.cd.detectChanges();
      }
    }));
  }

  close() {
    this.dropdown.close();
  }

  exportSalesReport() {
    let params: any = {};
    params = this.filterParams;
    this.sandbox.exportSalesReport(params);
  }

  dateChange(event) {
    this.minimumDate = event.value;
  }

  ngOnDestroy() {
    this.sandbox.clearList({});
  }
}
