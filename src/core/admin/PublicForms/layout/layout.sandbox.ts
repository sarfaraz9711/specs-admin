/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import * as catalogLayoutActions from './action/layout.action';
import { Subscription } from 'rxjs';

import {
  contactUsCount,
  contactUsCountLoading
} from './reducer/selectors';

@Injectable()
export class LayoutSandbox {
  public contactUsCount$ = this.appState.select(contactUsCount);
  
  public contactUsCountLoading$ = this.appState.select(contactUsCountLoading);


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
  ) {
    this.registerAuthEvents();
  }

  public getContactUsCount() {
    this.appState.dispatch(
      new catalogLayoutActions.GetContactUsCountAction()
    );
  }


  /**
   * Registers events
   */
  private registerAuthEvents(): void {
    // ----
  }
}
