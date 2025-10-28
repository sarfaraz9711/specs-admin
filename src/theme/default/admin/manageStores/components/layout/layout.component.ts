/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutSandbox } from '../../../../../../core/admin/PublicForms/layout/layout.sandbox';

@Component({
  selector: 'app-contactus-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class StoresLayout implements OnInit {

  constructor(public layoutSandbox: LayoutSandbox) {}

  ngOnInit() {
    
  }
}
