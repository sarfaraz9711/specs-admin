/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LayoutSandbox } from '../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';

@Component({
  selector: 'app-customer-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class GroupsFilterComponent implements OnInit {

  public statusFilterForm: FormGroup;
  public keyword: FormControl;
  @Input() pageSize: any;
  public pagenationCount: boolean;
  @Output() progressEmits = new EventEmitter<string>();

  constructor(public fb: FormBuilder, public sandbox: CustomersGroupSandbox, public laySandbox: LayoutSandbox) { }


  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.initForm();
  }

  initForm() {
    this.statusFilterForm = this.fb.group({
      keyword: ['', Validators.required]
    });
  }

  reset() {
    if (this.statusFilterForm.value.keyword) {
      this.statusFilterForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.keyword = '';
      this.progressEmits.emit(param);
      this.sandbox.customersGroupList(param);
      param.count = 1;
      this.sandbox.PaginationCustomersGroup(param);
    }

  }

  onSubmit() {
    this.keyword = this.statusFilterForm.value.keyword ? this.statusFilterForm.value.keyword : '';
    const param: any = {};
    param.keyword = this.keyword;
    this.progressEmits.emit(param);
    document.getElementById("focusOut").focus()
  }

}

