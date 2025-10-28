import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponBasedPromotionService } from '../../../../../../../core/admin/Promotions/couponBased.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
public promotionsList: any;
public cnStatus: any;
public couponPromotionType:any='';
public couponCode:any='';
public couponValue:any='';
public isActive:any='';
public startDate:any='';
public endDate:any='';
public usagesPopUp= false;
public couponDetail=''



  constructor(
    private route: Router,
    private _couponBasedPromotionService: CouponBasedPromotionService,
    private excelService :ExcelService,
    private _cd: ChangeDetectorRef,
    private datepipe: DatePipe,


  ) { }

  ngOnInit(): void {
    this.getPromotionList();

  }

  addCouponBasedPromo() {
    this.route.navigate(['/promotions/coupon-based/add']);
  }
  formOnChange(value:any, formItem:any) {
    console.log("value>>>",value);
    console.log("formItem>>>",formItem);

    if(formItem == 'couponPromotionType'){
      this.couponPromotionType = value;
    }
    if(formItem == 'couponCode'){
      this.couponCode = value;
    }
    if(formItem == 'couponValue'){
      this.couponValue = value;
    }
    if(formItem == 'isActive'){
      this.isActive = value;
    }
    if(formItem == 'startDate'){
      this.startDate = value;
    }
    if(formItem == 'endDate'){
      this.endDate = value;
    }
    
    this._cd.detectChanges()
  }
  searchcancel(flag:any ){
    if(flag == '1'){    
    const params =`?couponPromotionType=${this.couponPromotionType}&couponCode=${this.couponCode}&couponValue=${this.couponValue}&isActive=${this.isActive}&startDate=${this.startDate}&endDate=${this.endDate}`;
    this._couponBasedPromotionService.listFreeProductPromotionsAll(params).subscribe((res: any)=>{
      console.log(res.data, "Nerosdfsfs")
      this.promotionsList = res.data;
       
      this._cd.detectChanges()
     })
    
    }else{
      this.getPromotionList();
      this._cd.detectChanges()
      
    }
  }
  modelOpenStatus(modelStatus:any){
    this.usagesPopUp=modelStatus;
  }
  checkCouponDetail(couponCode) {
    this._couponBasedPromotionService.couponBasedDetail(couponCode).subscribe((res: any)=>{
      this.couponDetail=res.data;
      this.modelOpenStatus(true)
      this._cd.detectChanges()
     })
   // 
  }
  

  exportAsXLSX(){
    let promotionData:any[]=[]
    this.promotionsList.forEach((item:any)=>{
      //console.log("data>>>>>>",item);
      promotionData.push({
       "Promotion Type": item.couponPromotionType=="allUsers"?"For All Users":'For Redchief Employee',"Coupon code": item.couponCode,"Coupon name": item.couponName,"Coupon type": item.couponType==2?'Amount discount':'',"Coupon Value":item.couponValue,"Status":item.isActive==1?'Enable':'Disable',"Start Date":this.datepipe.transform(item.startDate, 'yyyy-MM-dd hh:mm:ss'),"End Date":this.datepipe.transform(item.endDate, 'yyyy-MM-dd hh:mm:ss')
      })
    })
        this.excelService.exportAsExcelFile(promotionData, 'coupon-report')


}

  getPromotionList() {
    this._couponBasedPromotionService.listFreeProductPromotions().subscribe((res: any) => {
      console.log(res, "Nero Hello")
      if(res && res.status == 200){
        
        this.promotionsList = res.data.sort((a,b)=>(b.couponId-a.couponId));
      }
    }, (err) => {

    });
  }

  exportData(){
    this.excelService.exportAsExcelFile(this.promotionsList, 'coupon-report')  
  }
  

}
