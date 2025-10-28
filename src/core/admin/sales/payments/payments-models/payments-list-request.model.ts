/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class PaymentListRequestModel {
  public limit: number;
  public offset: number;
  public customerName: string;
  public startDate: string;
  public endDate: string;
  public paymentMethod: string;
  public email: string;
  public mobileNo: string;
  public fromDate: string;
  public toDate:string;
  public orderId:number;

  
  constructor(paymentListForm: any) {
    this.limit = paymentListForm.limit || '';
    this.offset = paymentListForm.offset || '';
    this.customerName = paymentListForm.customerName || '';
    this.startDate = paymentListForm.startDate || '';
    this.endDate = paymentListForm.endDate || '';
    this.paymentMethod = paymentListForm.paymentMethod || '';
    this.email = paymentListForm.email || '';
    this.mobileNo = paymentListForm.mobileNo || '';
    this.fromDate = paymentListForm.fromDate || '';
    this.toDate = paymentListForm.toDate || '';
    this.orderId = paymentListForm.orderId || '';

  }
}

// public limit: number;
// public offset: number;
// public orderId: string;
// public customerName: string;
// public email: string;
// public mobileNo: string;
// public mobileNoAlter: string;
// public totalAmount: string;
// public dateAdded: string;
// public keyword: string;
// public count: number;
// public orderStatusId: string;
// public fromDate: string;
// public toDate:string

// constructor(OrdersListForm: any) {
//   this.limit = OrdersListForm.limit || 0;
//   this.offset = OrdersListForm.offset || 0;
//   this.orderId = OrdersListForm.orderId || '';
//   this.totalAmount = OrdersListForm.totalAmount || '';
//   this.dateAdded = OrdersListForm.dateAdded || '';
//   this.keyword = OrdersListForm.keyword || '';
//   this.customerName = OrdersListForm.customerName || '';
//   this.email = OrdersListForm.email || '';
//   this.mobileNo = OrdersListForm.mobileNo || '';
//   this.mobileNoAlter = OrdersListForm.mobileNoAlter || '';
//   this.count = OrdersListForm.count || 0;
//   this.orderStatusId = OrdersListForm.orderStatusId || '';
//   this.fromDate = OrdersListForm.fromDate || '';
//   this.toDate = OrdersListForm.toDate || '';
