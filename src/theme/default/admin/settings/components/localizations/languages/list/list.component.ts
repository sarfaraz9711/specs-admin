/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguagesService } from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguageAddComponent } from '../add/add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-settings-language-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LanguageListComponent implements OnInit {
  public type = 'edit';
  public pageSize: any = 5;
  private keyword = '';
  private offset: number;
  private languageinfodetails: any = [];
  private pagenationcount = true;
  public index: number;
  private popoverContent: string;

  constructor(
    public modal: NgbModal,
    public languageSandbox: LanguagesSandbox,
    public router: Router,
    public service: LanguagesService
  ) { }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.regSubscribeEvents();
    this.languageList(this.offset);

    this.languageSandbox.languageAddLoaded$.subscribe(data => {
      if (data === true) {
        this.languageList(this.offset);
      }
    });

    this.languageSandbox.languageUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.languageList(this.offset);
      }
    });



  }

  /**
   * Handles form 'list' event. Calls sandbox Language list function .
   *
   * @param params storing entire value
   */
  languageList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.languageSandbox.languageList(params);
    if (this.pagenationcount) {
      params.count = 'true';
      this.languageSandbox.languageListPagination(params);
    }
  }

  addLanguage(data, type) {
    const modalRef = this.modal.open(LanguageAddComponent, {
      windowClass: 'add-customers', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      this.service.languageSetData(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.languageId;
    } else {
      this.service.languageSetData('');
    }
  }

  editLanguage(languageinfo) {
    this.languageinfodetails = languageinfo;
    this.service.languageSetData(this.languageinfodetails);
    this.router.navigate([
      '/settings/local/language/edit',
      this.languageinfodetails.languageId
    ]);
  }

  deleteLanguage(languageId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.languageSandbox.deleteLanguage({ languageId: languageId });
        this.regSubscribeEvents();
      }
    });
  }


  regSubscribeEvents() {
    this.languageSandbox.languageDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.languageList(this.offset);
      }
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.languageList(this.offset);
  }
}
