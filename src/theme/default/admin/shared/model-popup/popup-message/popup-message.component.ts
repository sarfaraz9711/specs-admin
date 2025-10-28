import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {
  popuUpDetails: any={};

  constructor(private _router: Router) { }
  @Input() popupMessage: Observable<any>;
  ngOnInit(): void {
    this.popupMessage.subscribe((res:any)=>{
      console.log(res)
      this.popuUpDetails=res
    })
  }
  closePopup(){
    if(this.popuUpDetails.popupRoute==""){
      this.popuUpDetails.popupShow=false
    }else{
      this._router.navigate([this.popuUpDetails.popupRoute])
    }
  }
}
