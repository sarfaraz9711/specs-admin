/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class OrderslistResponseModel {
  public orderId: number;
  public totalAmount: string;
  public dateAdded: string;
  public keyword: string;
  public shippingFirstName: string;
  public email: string;
  public mobileNo: string;
  public mobileNoAlter: string;
  public dateModified: string;
  public isActive: number;
  public orderStatus: object;
  public invoicePrefix: string;
  public orderPrefixId: string;
  public currencySymbolLeft: string;
  public currencySymbolRight: string;
  public NoOfItems: number;
  public shippingZone: string;
  public shippingCity: string;
  public orderStatusId:any
  public orderCreatedDateInIST: string;
  public orderModifiedDateInIST: string
  quantity: any;
  couponAmount: any;
  creditNoteAmount: any;
  loyalityPoint: any;
  paymentMethod: any;
  sentOnUc:any
  ucOrderStatus:any
  facilityCode:any
  facilityName:any
  orderProductPrefixId:any


  constructor(responseOrdersListForm: any) {
    this.orderId = responseOrdersListForm.orderId || 0;
    this.totalAmount = responseOrdersListForm.total || '';
    this.dateAdded = responseOrdersListForm.createdDate || '';
    this.keyword = responseOrdersListForm.keyword || '';
    this.shippingFirstName = responseOrdersListForm.shippingFirstname || '';
    this.email = responseOrdersListForm.email || '';
    this.mobileNo = responseOrdersListForm.mobileNo || '';
    this.mobileNoAlter = responseOrdersListForm.mobileNoAlter || '';
    this.dateModified = responseOrdersListForm.modifiedDate || '';
    this.isActive = responseOrdersListForm.isActive || 0;
    this.orderStatus = responseOrdersListForm.orderStatus;
    this.invoicePrefix = responseOrdersListForm.invoicePrefix || 'SPU';
    this.orderPrefixId = responseOrdersListForm.orderPrefixId || '';
    this.currencySymbolLeft = responseOrdersListForm.currencySymbolLeft;
    this.currencySymbolRight = responseOrdersListForm.currencySymbolRight;
    this.NoOfItems = responseOrdersListForm.NoOfItems || 0;
    this.shippingZone = responseOrdersListForm.shippingZone || '';
    this.shippingCity = responseOrdersListForm.shippingCity || '';
    this.orderStatusId = responseOrdersListForm.orderStatusId || '';
    this.orderCreatedDateInIST = responseOrdersListForm.orderCreatedDateInIST || '';
    this.orderModifiedDateInIST = responseOrdersListForm.orderModifiedDateInIST || '';
    this.quantity = responseOrdersListForm.quantity || 0;
    this.couponAmount = responseOrdersListForm.couponAmount || 0;
    this.creditNoteAmount = responseOrdersListForm.creditNoteAmount || 0;
    this.loyalityPoint = responseOrdersListForm.loyalityPoint || 0;
    this.paymentMethod = responseOrdersListForm.paymentMethod || 0;
    this.sentOnUc = responseOrdersListForm.sentOnUc || 0;
    this.ucOrderStatus = responseOrdersListForm.ucOrderStatus || '';
    this.facilityCode = responseOrdersListForm.facilityCode || '';
    this.facilityName = responseOrdersListForm.facilityName || '';
    this.orderProductPrefixId = responseOrdersListForm.orderProductPrefixId || '';
    


  }
}
