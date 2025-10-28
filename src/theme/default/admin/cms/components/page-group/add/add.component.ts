/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { PageGroupSandbox } from '../../../../../../../core/admin/cms/page-group/page-group.sandbox';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cms-pages-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class PageGroupAddComponent implements OnInit {

  public pageGroupForm: FormGroup;
  public submitted = false;
  public pagesInfo: any = [];
  public editPagesId: string;
  public id: any = '';
  private subscriptions: Array<Subscription> = [];
  public queryDetails: any = {};

  constructor(
    private modalService: NgbModal,
    public appSandbox: PageGroupSandbox,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router
  ) {
    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;
  }

  ngOnInit() {
    this.initForm();
    this.editPagesId = this.route.snapshot.paramMap.get('id');
    if (this.editPagesId) {
      const params: any = {};
      params.id = this.editPagesId;
      this.appSandbox.getPageDetails(params);
      this.editPages();
    }
  }

  // Cancel It Navigate  to add page to List page
  pagesCancel() {
    this.router.navigate(['/cms/page-group'], { queryParams: this.queryDetails });
  }

  // Form  Initialization
  initForm() {
    this.pageGroupForm = this.fb.group({
      groupName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      status: [null, Validators.required]
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox pages  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmit() {
    this.submitted = true;
    if (!this.pageGroupForm.valid) {
      this.validateAllFormFields(this.pageGroupForm);
      return;
    }
    const params: any = {};
    params.pageGroupName = this.pageGroupForm.value.groupName;
    params.status = +this.pageGroupForm.value.status;
    if (this.editPagesId) {
      params.id = this.editPagesId;
      this.appSandbox.updatePageGroupList(params);
    } else {
      this.appSandbox.addPageGroup(params);
    }
    this.subscribe();
  }

  public subscribe() {
    this.appSandbox.pageGroupListCount$.subscribe(data => { });
    this.subscriptions.push(
      this.appSandbox.addPagesStatus$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/page-group/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );

    this.subscriptions.push(
      this.appSandbox.updatePages$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/page-group/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
    this.subscriptions.push(
      this.appSandbox.pageGroupDelete$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/page-group/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
  }


  // edit function for pages
  editPages() {
    this.subscriptions.push(this.appSandbox.pageDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setPage(data);
      }
    }));
  }

  setPage(details) {
    this.pageGroupForm.controls['groupName'].setValue(details.groupName);
    this.pageGroupForm.controls['status'].setValue(details.isActive);
  }

  // show all validation at when invalid form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
