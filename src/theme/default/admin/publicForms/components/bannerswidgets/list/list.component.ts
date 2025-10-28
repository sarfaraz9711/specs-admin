import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ExcelService } from 'src/core/admin/PublicForms/excelbanners.service';


@Component({
  selector: 'app-bannerwidgets-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public bannerwidgetsList: any;
  constructor(
    private route: Router,
    public BannerService: BannerService,
    public excelService: ExcelService
  ) {

    //this.subscribeFeedback();
  }

  ngOnInit(): void {
    //this.feedbackList();
    this.getBannerWidgetList();
  }

  getBannerWidgetList() {
    this.bannerwidgetsList = [
      {
        "counter": "4",
        "title": "Summer sale",
        "link": "www.piccosoft.com",
        "imagePath": "banner/Img_1663906625570.jpeg"
      },
      {
        "counter": "3",
        "title": "Choose Your Style",
        "link": "www.piccosoft",
        "imagePath": "banner/Img_1663905753467.jpeg"
      },
      {
        "counter": "1",
        "title": "Diwali Sale",
        "link": "www.piccosoft.com",
        "imagePath": "banner/Img_1663905859884.jpeg"
      }
    ]


    // this.BannerService.getbannerwidgetsListdata().subscribe((res : any)=> {
    //   if(res && res.status == 200){
    //     console.log(res.data, "dvvsjgvh");
    //     this.bannerwidgetsList = res.data;
    //   }
    // }, (err) => {
    //   console.log(err, "Error occured");
    // })
  }



  addBannerWidget() {
    this.route.navigate(['/components/bannerwidgets/add']);
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.bannerwidgetsList, 'sample')
  }

}
