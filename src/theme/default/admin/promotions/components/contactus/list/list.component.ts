/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
//import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
//import { CustomersApiClientService } from '../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
//import { CustomerAddressComponent } from '../address/address.component';
import { LayoutSandbox } from '../../../../../../../core/admin/PublicForms/layout/layout.sandbox';
//import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-contactus-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ContactUsListComponent {

  @ViewChild('paginator') paginator: MatPaginator;


  public closeResult: string;
  public pageSize = '10';
  public pageSizeOptions = [10, 20];
  public offset: any = 0;
  public keyword = '';
  public currentPage: number;
  public index: any;
  public buttoncheck = true;
  public popoverContent: any;
  public checkedArray: any = [];
  public limit = 10;
  public name = '';
  public customerGroupName: any;
  public email: any;
  public customergroup: any;
  public customerGroup: any;
  public date: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  private subscriptions: Array<Subscription> = [];
  // bulk delete or bulk export variables
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public customerListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  queryData: any = {};
  public directiveH : any = ""

  constructor(
    private modalService: NgbModal,
    private router: Router,
    //public sandbox: CustomerSandbox,
    //public Sandbox: CustomersGroupSandbox,
    public layoutSandbox: LayoutSandbox,
    //private service: CustomersApiClientService,
    public route: ActivatedRoute
  ) {

    this.directiveH = "t--ddd"
  }

  

  ngOnInt(){
    this.directiveH = "sdfsdfsfsf-"
  }
}
