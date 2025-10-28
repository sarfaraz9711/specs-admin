/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class OrderslistModel {
  public limit: number;
  public offset: number;
  public orderId: string;
  public customerName: string;
  public email: string;
  public mobileNo: string;
  public mobileNoAlter: string;
  public totalAmount: string;
  public dateAdded: string;
  public keyword: string;
  public count: number;
  public orderStatusId: string;
  public fromDate: string;
  public toDate:string

  constructor(OrdersListForm: any) {
    this.limit = OrdersListForm.limit || 0;
    this.offset = OrdersListForm.offset || 0;
    this.orderId = OrdersListForm.orderId || '';
    this.totalAmount = OrdersListForm.totalAmount || '';
    this.dateAdded = OrdersListForm.dateAdded || '';
    this.keyword = OrdersListForm.keyword || '';
    this.customerName = OrdersListForm.customerName || '';
    this.email = OrdersListForm.email || '';
    this.mobileNo = OrdersListForm.mobileNo || '';
    this.mobileNoAlter = OrdersListForm.mobileNoAlter || '';
    this.count = OrdersListForm.count || 0;
    this.orderStatusId = OrdersListForm.orderStatusId || '';
    this.fromDate = OrdersListForm.fromDate || '';
    this.toDate = OrdersListForm.toDate || '';
  }
}
