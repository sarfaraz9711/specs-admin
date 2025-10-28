import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUsService } from 'src/core/admin/PublicForms/contactUs.service';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';
import { CouponBasedPromotionService } from '../../../../../../../core/admin/Promotions/couponBased.service';
@Component({
  selector: 'app-contactus-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

 
public contactUsList: any;
  constructor(
    private route: Router,
    private _contactUsService: ContactUsService,
    private excelService : ExcelService
  ) { }

  ngOnInit(): void {
    this.getContactUsList();
  }

  addCouponBasedPromo() {
    this.route.navigate(['/promotions/coupon-based/add']);
  }

  getContactUsList() {
    this._contactUsService.listContactUs().subscribe((res: any) => {
      console.log(res, "ghghjhj")
      if(res && res.status == 200){
        
        var myArray = res.data;
        myArray.sort(function(a, b) {
          return (a.createdDate > b.createdDate) ? -1 : ((a.createdDate < b.createdDate) ? 1 : 0);
      });

        this.contactUsList = myArray;
      }
    }, (err) => {

    });
  }
  exportAsXLSX(){
    console.log("contact us<<<<<<<<<<",this.contactUsList);
    const result = this.contactUsList.map(({id,isActive,createdDate,...rest}) => ({...rest}));

   this.excelService.exportAsExcelFile(result, 'sample')
  }

}
