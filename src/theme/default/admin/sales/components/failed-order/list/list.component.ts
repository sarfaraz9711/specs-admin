/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FailedOrderSandbox } from '../../../../../../../core/admin/sales/failed-order/failed-order-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';




@Component({
  selector: 'app-sales-failed-order-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class FailedOrderListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;

  public pageSize = '5';
  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: any;
  public buttonCheck = true;
  public pagination = true;
  public offset: any;
  private orderId: any;
  private orderStatusId: any;
  private customerName: string;
  private totalAmount: any;
  private dateAdded: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public orderListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  queryData: any = {};
  private subscriptions: Array<Subscription> = [];
  email: any;
  mobileNo: any;
  toDate: any;
  fromDate: any;
  public checkOrderData = [];



  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public appSandbox: FailedOrderSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public layoutSandbox: LayoutSandbox,
    public modalService: NgbModal,
    private excelService: ExcelService,

  ) {
    this.subscribeOrder();
  }

  ngOnInit() {

    // this.offset = 0;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getOrderList();
    this.getOrderCount();
    // this.index = 0;
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getOrderList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.email = this.email;
    params.mobileNo = this.mobileNo;
    params.toDate = this.toDate;
    params.fromDate = this.fromDate;
    console.log("apiparamsss", params)

    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.appSandbox.getOrderList(params);
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getOrderCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.count = 1;
    this.appSandbox.getOrderCount(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.selectedAll = false;
    this.filterDataId = [];
    this.getOrderList();
  }

  viewOrders(orderId) {
    // this.router.navigate(['/sales/failed-order/vieworder', orderId]);
    this.router.navigate(['/sales/orders/vieworder', orderId]);
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.orderId = event.orderId;
    this.customerName = event.customerName;
    this.totalAmount = event.totalAmount;
    this.dateAdded = event.dateAdded;
    this.email = event.email;
    this.mobileNo = event.mobileNo;
    this.fromDate = event.fromDate;
    this.toDate = event.toDate;
    this.offset = 0;
    if (this.orderId !== '' || this.customerName !== '' || this.totalAmount !== '' || this.dateAdded !== ''||this.email !== '' || this.mobileNo !== '' || this.fromDate || this.toDate) {
      this.paginator.firstPage();
      this.getOrderList();
      this.getOrderCount();
    }


  }

  exportExcel() {
    const param: any = {};
    param.orderId = this.filterDataId;
    this.appSandbox.orderExcel(param);
  }


  deleteOrder(orderId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.orderId = orderId;
        this.appSandbox.salesOrderDelete(param);
        this.subscriptions.push(this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.getOrderList();
              this.getOrderCount();
            }
          }
        }));
      }
    });
  }

  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.orderId = this.filterDataId;
        this.appSandbox.salesOrderDelete(param);
        this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.selectedAll = false;
              this.filterDataId = [];
              this.getOrderList();
              this.getOrderCount();
            }
          }
        });
      }
    });
  }

  subscribeOrder() {
    this.subscriptions.push(this.appSandbox.orderList$.subscribe(data => {
      this.orderListArray = [];
      if (data && data.length > 0) {
        this.orderListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  selectAll() {
    for (let i = 0; i < this.orderListArray.length; i++) {
      this.orderListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.orderListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  filterDataList() {
    this.filterData = this.orderListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderId);
  }

  checkOrder(event, list) {
    if(event.target.checked==true){
     this.checkOrderData.push(list);
    }else{
     const getIndex= this.checkOrderData.findIndex(item=>item.orderId==list.orderId)
     this.checkOrderData.splice(getIndex,1)
    }
   }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }



  exportAsXLSX(){
    let orderExportData:any;
    if(this.checkOrderData.length>0){
     orderExportData=this.checkOrderData;
    }else{
       orderExportData=this.orderListArray;

    }
    
    let orderData:any[]=[]
    orderExportData.forEach((item:any)=>{
      const orderStatus:any = (this.orderListArray.filter(it=>it.orderStatusId==item.orderStatusId))[0]
      orderData.push({
       "Order Id": item.orderPrefixId,"Customer Name": item.shippingFirstName,"Email": item.email,"Mobile": item.telephone,"Total Amount": item.totalAmount,"Order Created": item.dateAdded,"Order Updated": item.dateModified,"Reason": `Payment Failed On Payment Gateway(${item.paymentType})`
      })
    })
    this.excelService.exportAsExcelFile(orderData, 'failed-order-report')
}
}
