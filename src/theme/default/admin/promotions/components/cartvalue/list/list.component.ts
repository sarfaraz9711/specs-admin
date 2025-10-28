import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartValueService } from 'src/core/admin/Promotions/cartValueService';

@Component({
  selector: 'app-cart-value',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  public cartValuePromosList: any;
  constructor(
    private route: Router,
    public _CartValueService: CartValueService
  ) {

    //this.subscribeFeedback();
  }

  ngOnInit(): void {
    //this.feedbackList();
    this.getCartValuePromoList();
  }

  getCartValuePromoList () {
    this._CartValueService.listCartValuePromotions().subscribe((res : any)=> {
      if(res && res.status == 200){
        console.log(res.data, "cshabcahj");
        this.cartValuePromosList = res.data;
      }
    }, (err) => {
      console.log(err, "Error occured");
    })
  }

  

  addcartvalues (){
    this.route.navigate(['/promotions/cart-value']);
  }

  deletePromotion(id:any){
      console.log("jyoti idddddd",id);
    let payload=  {
         "id":id
      }
      this._CartValueService.listFreeProductPromotionsRemove(payload).subscribe((res : any)=> {
        console.log("jyoti res<<<<<<<<<<<<<<<<",res.status);
        if(res.status==1){
          this._CartValueService.listCartValuePromotions().subscribe((res : any)=> {
            if(res && res.status == 200){
             // console.log(res.data, "cshabcahj");
              this.cartValuePromosList = res.data;
            }
          }, (err) => {
            console.log(err, "Error occured");
          })
        }
      }, (err) => {
        console.log(err, "Error occured");
      }) 
  }

}
