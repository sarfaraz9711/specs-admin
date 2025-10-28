/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';

@Injectable()
export class CkeConfiqService {
  private confiq = {
    extraPlugins: 'justify,font',
    toolbar: [
      [
        'Bold',
        'Italic',
        'BulletedList',
        'Styles',
        'Link',
        'alignment'
      ],
      ['Table'],
      ['Image'], 
      { name: 'styles', items: ['Format', 'FontSize'] },
      { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }
    ],format_tags: 'p;h1;h2;h3', 
    fontSize_sizes: '8/8px;10/10px;12/12px;14/14px;16/16px;18/18px;24/24px;36/36px',
  };

  constructor() { }


  public getckeconfig() {
    return this.confiq;
  }
}

