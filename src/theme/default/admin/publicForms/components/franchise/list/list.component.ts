import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/core/admin/PublicForms/excelfranchise.service';
import { FranchiseService } from 'src/core/admin/PublicForms/franchise.service';

@Component({
  selector: 'app-franchise',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
public franchiseList: any;
  constructor(
    private route: Router,
    private _franchiseService: FranchiseService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getFranchiseList();
  }

  getFranchiseList() {
    this._franchiseService.listFranchise().subscribe((res: any) => {
      console.log(res, "ghghjhj")
      if(res && res.status == 200){
        let myArray = res.data;
        myArray.sort(function(a, b) {
          return (a.Id > b.Id) ? -1 : ((a.Id < b.Id) ? 1 : 0);
      });
        this.franchiseList = myArray;
        
      }
    }, (err) => {

    });
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.franchiseList, 'sample')
  }

}
