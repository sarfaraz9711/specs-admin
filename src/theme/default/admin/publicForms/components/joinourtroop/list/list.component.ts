import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelServiceJoin } from 'src/core/admin/PublicForms/exceljoinourtroops.service';
import { JoinOurTroopService } from 'src/core/admin/PublicForms/joinourtroop';


@Component({
  selector: 'app-joinourtroop',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class JoinOurTroopList implements OnInit {
public troopList: any;
  constructor(
    private route: Router,
    private _troopService: JoinOurTroopService,
    private excelService: ExcelServiceJoin
  ) { }

  ngOnInit(): void {
    this.getTroopList();
  }

  getTroopList() {
    this._troopService.listTroopData().subscribe((res: any) => {
      console.log(res, "ghghjhj")
      if(res && res.status == 200){
        
        this.troopList = res.data;
        console.log(this.troopList, "trooplist")
      }
    }, (err) => {

    });
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.troopList, 'sample')
  }

}
