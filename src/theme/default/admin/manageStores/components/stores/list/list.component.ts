import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/core/admin/stores/stores.service';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';
import { CouponBasedPromotionService } from '../../../../../../../core/admin/Promotions/couponBased.service';
import {BehaviorSubject} from "rxjs"
@Component({
  selector: 'app-contactus-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


public storeList: any;
  constructor(
    private route: Router,
    private _storesService: StoresService,
    private excelService : ExcelService
  ) { }

  ngOnInit(): void {
    this.getStoreList();
  }

  

  getStoreList() {
    this._storesService.storeList().subscribe((res: any) => {
      
      if(res && res.status == 200){
        
        var myArray = res.data;
        myArray.sort(function(a, b) {
          return (a.createdDate > b.createdDate) ? -1 : ((a.createdDate < b.createdDate) ? 1 : 0);
      });

        this.storeList = myArray;
      }
    }, (err) => {

    });
  }
  exportAsXLSX(){
    
    const result = this.storeList.map(({id,isActive,createdDate,...rest}) => ({...rest}));

   this.excelService.exportAsExcelFile(result, 'sample')
  }

  addStore (){
    this.route.navigate(['/manage-stores/stores/add']);
  }

  editStore (id: any){
    this._storesService.sendEditId.subscribe();
    this._storesService.sendEditId.next(id)
    this.route.navigate(['/manage-stores/stores/add']);
  }
  

}
