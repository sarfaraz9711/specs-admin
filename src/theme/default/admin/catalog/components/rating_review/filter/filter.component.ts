/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { RatingReviewSandbox } from '../../../../../../../core/admin/catalog/ratingReview/ratingReview.sandbox';
import * as _ from 'lodash';

@Component({
  selector: 'app-spurt-catalog-ratings-review-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class RatingReviewFilterComponent implements OnInit {


  @Output() progressEmit = new EventEmitter<string>();
  public filterForm: FormGroup;
  public categoryNameList: FormControl;
  public sortOrder: FormControl;
  public pageSize: any;
  public dropDownProductNames: any = [];
  public productList: any = [];
  public prodName: string;


  constructor(
    public categorySandbox: CategoriesSandbox,
    public ratingReviewSandbox: RatingReviewSandbox,
    public productSandbox: ProductSandbox,
    public fb: FormBuilder
  ) { }


  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['']
    });
  }

  filter() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.filterForm.value.keyword ? this.filterForm.value.keyword : '';
    this.progressEmit.emit(param);
    document.getElementById("focusOut").focus()
  }

  reset() {
    if (this.filterForm.value.keyword) {
      this.filterForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.keyword = '';
      this.progressEmit.emit(param);
      this.ratingReviewSandbox.getRatingReviewList(param);
      param.count = 1;
      this.ratingReviewSandbox.getRatingReviewListCount(param);
    }

  }


}
