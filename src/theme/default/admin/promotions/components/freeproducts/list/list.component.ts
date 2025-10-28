import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FreeProductPromtionService } from '../../../../../../../core/admin/Promotions/freeproductspromotions.service';
@Component({
  selector: 'app-freeproducts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  public freeProductPromosList: any;
  constructor(
    private route: Router,
    public _freeProductPromService: FreeProductPromtionService
  ) {

    //this.subscribeFeedback();
  }

  ngOnInit(): void {
    //this.feedbackList();
    this.getFreeProductPromoList();
  }

  getFreeProductPromoList () {
    this._freeProductPromService.listFreeProductPromotions().subscribe((res : any)=> {
      if(res && res.status == 200){
        console.log(res.data, "Nero data");
        this.freeProductPromosList = res.data.sort((a,b)=>(b.promotion_id-a.promotion_id));
      }
    }, (err) => {
      console.log(err, "Error occured");
    })
  }

  addFreeProductPromo (){
    this.route.navigate(['/promotions/freeproducts/add']);
  }

}
