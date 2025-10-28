/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-audit-log-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class ReportHeaderComponent implements OnInit {

  constructor(public titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Reports');
  }

}
