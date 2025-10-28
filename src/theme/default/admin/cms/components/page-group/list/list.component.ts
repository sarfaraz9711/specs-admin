/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import { ToastrManager } from 'ng6-toastr-notifications';
import { PageGroupSandbox } from '../../../../../../../core/admin/cms/page-group/page-group.sandbox';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-spurt-cms-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
export class PageGroupListComponent implements OnInit {

  public pageSize: any = 5;
  public keyword: any = '';
  public offset: any;
  public closeResult: string;
  public pageId: number;
  public currentPage: number;
  public index: any;
  public queryData: any = {};

  constructor(
    private toastr: ToastrManager,
    public appSandbox: PageGroupSandbox,
    private router: Router,
    public modalService: NgbModal,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.getPageGroupList(this.offset, this.keyword);
    this.getPagesPagination(this.offset, this.keyword);
    this.regSubscriptionEvents();
    this.index = 0;
  }

  regSubscriptionEvents() {
    this.appSandbox.pageGroupDelete$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.getPageGroupList(this.offset, this.keyword);
        this.getPagesPagination(this.offset, this.keyword);
      }
    });
  }

  getPageGroupList(offset, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    this.appSandbox.getPageGroupList(params);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getPagesPagination(offset, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getPagePagination(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getPageGroupList(this.offset, '');
  }

  editPageGroup(pagesList) {
    this.router.navigate(['/cms/page-group/edit', pagesList.groupId], { queryParams: this.queryData });
  }

  addPageGroup() {
    this.router.navigate(['/cms/page-group/add'], { queryParams: this.queryData });
  }


  deletePageGroup(pageId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.appSandbox.deletePageGroupList({ id: pageId });
        this.regSubscriptionEvents();
      }
    });
  }

  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Page');
  }

  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }
}
