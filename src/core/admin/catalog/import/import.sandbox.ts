/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as importActions from './action/import.action';
// selectors
import { uploadFile } from './reducer/import.selectors';

@Injectable()
export class ImportSandbox {

  public uploadFile$ = this.appState.select(uploadFile);

  constructor(protected appState: Store<store.AppState>) {}

  public downloadFile({}) {
    this.appState.dispatch(new importActions.DownloadFileAction({}));
  }

  public uploadFile(data) {
    this.appState.dispatch(new importActions.UploadFileAction(data));
    }
  public updateProduct(data) {
      this.appState.dispatch(new importActions.UploadFileAction(data));
      }
}
