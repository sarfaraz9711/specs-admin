/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// Routing Module
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import { CouponSandbox } from '../../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { CouponService } from '../../../../../../../core/admin/catalog/coupon/coupon.service';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spurt-catalog-coupon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CouponListComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;


  public couponImage: any = [];
  public page: number;
  private offset: any = 0;
  public pageSize = '20';
  private keyword = '';
  public index: any;
  private currentPage: number;
  private sortOrder: number;
  private edit: any;
  public buttonCheck = true;
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];
  public queryData: any = {};
  public filterDataId = [];
  public couponListArray: any;
  public selectedAll = false;
  public filterData: any = [];
  public status: any = '';

  constructor(
    private couponService: CouponService,
    public couponSandbox: CouponSandbox,
    public layoutSandbox: LayoutsSandbox,
    private route: Router,
    public modalService: NgbModal,
    public router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.offset = this.router.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.router.snapshot.queryParamMap.get('index');
    this.couponList();
    this.couponPagination();
  }

  couponList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.status = this.status;
    param.sortOrder = Number(this.sortOrder);
    this.couponSandbox.couponList(param);
    this.subscriptions.push(this.couponSandbox.getCouponList$.subscribe((data: any) => {
      this.couponListArray = [];
      if (data && data.length > 0) {
        this.couponListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));


    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.route.navigate(
      [],
      {
        relativeTo: this.router,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  couponPagination() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = this.keyword;
    param.status = this.status;
    param.sortOrder = Number(this.sortOrder);
    param.count = 1;
    this.couponSandbox.couponListCount(param);
  }

  editCoupon(data) {
    this.edit = data;
    this.route.navigate(['/catalog/coupon/edit/' + this.edit.vendorCouponId], { queryParams: this.queryData });
  }

  addCoupon() {
    this.edit = ' ';
    this.couponService.setEditcoupon(this.edit);
    this.route.navigate(['/catalog/coupon/add'], { queryParams: this.queryData });
  }



  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.filterDataId = [];
    this.selectedAll = false;
    this.couponList();
  }

  deleteCoupon(couponId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const params: any = {};
        params.couponId = couponId;
        this.couponSandbox.couponDelete(params);
        this.subscriptions.push(this.couponSandbox.getCouponDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete.user.status === 1) {
              this.couponList();
              this.couponPagination();
            }
          }
        }));
      }
    });
  }

  // receive param from filter component .And calls couponPagination event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.status = event.status;
    this.offset = 0;
    if (this.keyword !== '' || this.status !== '' ) {
      this.paginator.firstPage();
      this.couponList();
      this.couponPagination();
    }

  }

  couponImageLoading(id) {
    this.couponImage[id] = true;
  }
  exportCoupon() {
    const param: any = {};
    param.vendorCouponId = this.filterDataId.toString();
    this.couponSandbox.exportCoupon(param);
  }
  exportAllCoupon() {
    const param: any = {};
    this.couponSandbox.exportAllCoupon(param);
  }
  selectAll() {
    for (let i = 0; i < this.couponListArray.length; i++) {
      this.couponListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();

  }

  filterDataList() {
    this.filterData = this.couponListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.vendorCouponId);
  }

  checkIfAllSelected() {
    this.selectedAll = this.couponListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  bulkDelete(){
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.vendorCouponId = this.filterDataId.toString();
        this.couponSandbox.CouponBulkDelete(param);
        this.subscriptions.push(this.couponSandbox.bulkDeleteLoaded$.subscribe(_delete => {
          if (_delete) {
              this.filterDataId = [];
              this.selectedAll = false;
              this.couponList();
              this.couponPagination();
          }
        }));
      }
    });

  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.filterDataId = [];
  }
}
