import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ConfigService } from 'src/core/admin/service/config.service';

@Component({
  selector: 'app-newbloglist',
  templateUrl: './newbloglist.component.html',
  styleUrls: ['./newbloglist.component.scss']
})
export class NewBloglistComponent implements OnInit {

  public queryData: any = {};
  getCategoryData: any;



  constructor(
    public bannerService: BannerService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private configService: ConfigService,  ) { }

  ngOnInit(): void {
    this.getList()
  }
  addPage() {
    this.router.navigate(['/cms/Blogs/add']);
  }
  getList() {
    this.bannerService.getBlogList().subscribe((res: any) => {
      this.getCategoryData = res.data
      console.log("print list data", this.getCategoryData);
      this.cd.detectChanges();
    })
  }

  updateBannerStatus = (id) => {
    this.router.navigate(['/cms/Blogs/edit',id] );
      
  }

}
