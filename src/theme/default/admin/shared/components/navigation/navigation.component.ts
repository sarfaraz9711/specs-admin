/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userDetails: any;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  public language: string;
  userData: any;

  constructor(public translate: TranslateService) {}

  ngAfterViewInit() {
    // ----
  }
  openplugin() {
    window.open(environment.pluginUrl);
  }
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("adminUser")).usergroup.groupId
    console.log("this.userData",this.userData)
  }
}
