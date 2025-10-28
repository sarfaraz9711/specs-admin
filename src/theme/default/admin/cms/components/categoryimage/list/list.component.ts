import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { Router } from '@angular/router';
import { ConfigService } from 'src/core/admin/service/config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  getCategoryData: any;
  imageUrl: string;
  brandNameForm: any;
  editData: any;
  editId: any;
  editProductIds: any;
  selectview:any
  listType: string;

  constructor(public bannerService: BannerService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private configService: ConfigService,

    ) { }
  ngOnInit(): void {
    const location = (window.location.hash).split('/')
    if(location[2]=='furo-home-page'){
      this.listType='furo'
    }else{
      this.listType='redchief'
    }
    this.imageUrl = this.configService.getImageUrl();
    this.brandNameForm = new FormGroup({
      parentcategoryId: new FormControl("", Validators.required),
      showOn: new FormControl("", Validators.required),
      link: new FormControl(null),
      imagePath: new FormControl(null, Validators.required),
      selectview: new FormControl(null),

    })
    this.getList()
  }

  getList() {
    this.bannerService.getOfferImageList(this.listType).subscribe((res: any) => {
      this.getCategoryData = res.data.filter((item) => item.showOn != "offerTab1" && item.showOn != "offerTab2"&& item.showOn != "offerTab3" && item.showOn != "left"  && item.showOn != "right" 
      && item.showOn != "banner2" && item.showOn != "banner3").sort((a, b) => (b.Id - a.Id));
      console.log("print list data", this.getCategoryData);
      this.cd.detectChanges();
    })
  }

  updateBannerStatus = ($event: any, data: any) => {
    this.router.navigate(['/cms/edit',data.Id] );
      
  }

  addPage() {
    this.router.navigate(['/cms/add']);
    
  }
  
  makeActiveInactive = ($event: any, data: any) => {
    const BannerValue = $event.target.checked;
    let params: any = {
      id: data.Id,
      status: BannerValue ? 1 : 0
    }
    this.bannerService.updateOfferImage(params).subscribe((res: any) => {
      console.log(res)
      this.getList()
    
    })
  }

  
}
