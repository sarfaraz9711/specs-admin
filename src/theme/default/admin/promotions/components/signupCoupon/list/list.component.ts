import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponBasedPromotionService } from '../../../../../../../core/admin/Promotions/couponBased.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
public promotionsList: any;
  cnStatus: any = '';
  email:any = '';
  cnCode:any='';
  constructor(
    private route: Router,
    private _couponBasedPromotionService: CouponBasedPromotionService,
    private excelService :ExcelService
  ) { }

  ngOnInit(): void {
    this.getPromotionList();
  }

  

  getPromotionList() {
    let cnStatusfilter = ''
    if(this.cnStatus=="1"){
      cnStatusfilter = "YES";
    }else if(this.cnStatus=="0"){

      cnStatusfilter = "NO";
    }
    const params =`?redeemed=${cnStatusfilter}&code=${this.cnCode}&email=${this.email}`;
    this._couponBasedPromotionService.listSignupCouponsList(params).subscribe((res: any) => {
      if(res && res.status == 200){
        
        this.promotionsList = res.data.sort((a,b)=>(b.couponId-a.couponId));
      }
    }, (err) => {

    });
  }

  exportData(){
    this.excelService.exportAsExcelFile(this.promotionsList, 'signup-coupon-report')  
  }
  
  formOnChange(value:any, formItem:any) {
    if(formItem == 'status'){
      this.cnStatus = value;
    }
    if(formItem == 'Email'){
      this.email = value;
    }
    if(formItem == 'cnCode'){
      this.cnCode = value;
    }
    
  }
  
  searchcancel(flag:any ){
    
    if(flag == '1'){
      console.log(this.email, this.cnStatus, this.cnCode,  'jjjj')
    
    this.getPromotionList();
    
    }else{
      this.email = "";
      this.cnStatus = "";
      this.cnCode = "";
      
      this.getPromotionList();
    }
  }

}
