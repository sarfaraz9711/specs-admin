/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
// Routing Module
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { RatingReviewSandbox } from '../../../../../../../core/admin/catalog/ratingReview/ratingReview.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spurt-catalog-rating-review-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RatingReviewListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  public currentRate: number;
  public page: number;
  public offset: any = 0;
  public pageSize: any;
  private keyword = '';
  public index: any;
  private currentPage: number;
  private sortOrder: number;
  private edit: any;
  public buttonCheck = true;
  public productListImage = {};
  public imageUrl: string;
  queryData: any = {};
  closeResult: string;
  currentModal: any;


  constructor(
    public productSandbox: ProductSandbox,
    public categorySandbox: CategoriesSandbox,
    public layoutSandbox: LayoutsSandbox,
    public ratingReviewSandbox: RatingReviewSandbox,
    private route: Router,
    public router: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.currentRate = 3.5;
    this.imageUrl = environment.imageUrl;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.ratingReviewList();
    this.ratingReviewListCount();
    this.offset = this.router.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.router.snapshot.queryParamMap.get('index');
  }

  ratingReviewList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.count = '';
    this.ratingReviewSandbox.getRatingReviewList(param);

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

  ratingReviewListCount() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.count = 1;
    this.ratingReviewSandbox.getRatingReviewListCount(param);
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.ratingReviewList();
  }

  receiveProgress(event) {
    this.index = 0;
    this.sortOrder = event.sortOrder;
    this.offset = 0;
    this.keyword = event.keyword;
    if (this.keyword !== '') {
      this.paginator.firstPage();
      this.ratingReviewList();
      this.ratingReviewListCount();
    }

  }

  productListImageLoading(id) {
    this.productListImage[id] = true;
  }

  updateRatingStatus(event, rating) {
    const FeatureValue = event.target.checked;
    console.log("checked>>data>>",event.target);
    const param: any = {};
    param.ratingId = rating.ratingId;
    if (FeatureValue === true) {
      param.status = 1;
      param.isCommentApproved = 1;
      this.productSandbox.doRatingStatus(param);
    } else {
      param.status = 0;
      param.isCommentApproved = 0;
      this.productSandbox.doRatingStatus(param);
    }
  }

  imageSliderImage(data){
    this.currentModal = this.modalService.open(data, { ariaLabelledBy: 'modal-basic-title' });

    this.currentModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  removeImage() {
    console.log("hello", this.currentModal)
    if (this.currentModal) {
      this.currentModal.dismiss('Cross clicked');
      this.currentModal = null; 
    }
  }
}

