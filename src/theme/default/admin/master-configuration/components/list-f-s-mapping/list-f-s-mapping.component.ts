import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFacilitySkuMappingService } from 'src/core/admin/master-configuration/add-delete-f-s-mapping.service';
import { mode } from 'src/core/admin/settings/generalsetting/generalsetting-reducer/generalsetting.selector';
import { DeleteConfirmationDialogComponent } from '../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-facility-sku',
  templateUrl: './list-f-s-mapping.component.html',
  styleUrls: ['./list-f-s-mapping.component.scss']
})
export class ListComponent implements OnInit {
  
  public facilitySkuList: any;
  public buttoncheck: true
  constructor(
    private route: Router,
    public _listMappingService: AddFacilitySkuMappingService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //this.feedbackList();
    this.getfacilitySkuList();
  }

  getfacilitySkuList () {
    this._listMappingService.listFacilitySku().subscribe((res : any)=> {
      if(res && res.status == 200){
        console.log(res.data, "cshabcahj");
        this.facilitySkuList = res.data;
      }
    }, (err) => {
      console.log(err, "Error occured");
    })
  }

  changeFilter(event) {
    this.buttoncheck = event.target.checked;
  }
  

  addfacilitySku (){
    this.route.navigate(['/master-configuration/add-delete-facility-sku']);
  }


  deletefacility(id:any){
  let json = {
    "id":id
  }
this._listMappingService.deleteFacilitySku(json).subscribe((res:any)=>{
    if(res && res.status == 200){
     this.getfacilitySkuList()
    }
},(err:any)=>{
    console.log(err, "not deleted")
})
 }


 getData(data:any){
  console.log(data)
  if(data=="Reset"){
    this.getfacilitySkuList()
  }else{
    this.facilitySkuList=data
  }
  
 }
}
