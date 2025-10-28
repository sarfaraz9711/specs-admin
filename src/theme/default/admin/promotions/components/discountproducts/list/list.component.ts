import { Component,OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountProductPromtionService } from "src/core/admin/Promotions/discountvalue.service";


@Component({
    selector: 'app-discount-products',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']

  })

export class ListProductComponent {
    public DisProductList: any;
  constructor(
    private route: Router,
    public _DiscountProductPromtionService: DiscountProductPromtionService,
  ) { }

  addDiscount() {
    this.route.navigate(['/promotions/discount-Products/add']);
  }

  ngOnInit(): void {
    this.getDiscountProduct();
  }
  getDiscountProduct () {
    this._DiscountProductPromtionService.listAllDiscountProducts().subscribe((res : any)=> {
      console.log(res, "list")
      this.DisProductList = res.sort((a,b)=>(b.id-a.id));
    })
  }

  addFreeProductPromo (){
    this.route.navigate(['/promotions/freeproducts/add']);
  }
  onStatusChange(id){
    const params: any = {};
    params.id = id.toString();
        this._DiscountProductPromtionService.updateproductById(id).subscribe((res : any)=> {
      console.log(res, "list2222")
      this.DisProductList = res.data.sort((a,b)=>(b.id-a.id));
    })
  }

  // copyTextToClipboard(text: string, index: number) {
  //   navigator.clipboard.writeText(text).then(() => {
  //     console.log('Text copied');
      
  //     const tooltipId = `tooltip-${index}`;
  //     const tooltipElement = document.getElementById(tooltipId);
  //     if (tooltipElement) {
  //       tooltipElement.classList.add('show');
  //       setTimeout(() => {
  //         tooltipElement.classList.remove('show');
  //       }, 2000);
  //     }
  //   }).catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }
    
}



