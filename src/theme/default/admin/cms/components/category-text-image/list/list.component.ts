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
export class CategoryTextImageList implements OnInit {
  categoryList: any;


  constructor(public bannerService: BannerService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private configService: ConfigService,

    ) { }
  ngOnInit(): void {
    sessionStorage.removeItem("categoryImageId")
    sessionStorage.removeItem("categoryImageType")
    this.getAllRecords()
  }

getAllRecords(){
  this.bannerService.getCategoryImage().subscribe((res:any)=>{
      this.categoryList = res.data
      this.cd.detectChanges()
  })
}

  addPage(){
    this.router.navigate(['/cms/category-add'])
  }
  
  editRecord(id:any, type:any){
    sessionStorage.setItem("categoryImageId",id)
    sessionStorage.setItem("categoryImageType",type)
      this.router.navigate(['/cms/category-add'])
  }
}
