import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';

@Component({
  selector: 'app-commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.scss']
})
export class CommentlistComponent implements OnInit {

  public queryData: any = {};
  getCategoryData: any;



  constructor(
    public bannerService: BannerService,
    private cd: ChangeDetectorRef,
    private router: Router,
     ) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.bannerService.getCommentslist().subscribe((res: any) => {
      this.getCategoryData = res.data
      console.log("print list data", this.getCategoryData);
      this.cd.detectChanges();
    })
  }

  updateBannerStatus = (id) => {

  const params: any = {};
  params.id = id;
  params.isActive=1;
  this.bannerService.approveComment(params).subscribe((res:any)=>{
    if(res.status == 1){
      this.getList()
      this.cd.detectChanges();
    }
  })      
  }

}
