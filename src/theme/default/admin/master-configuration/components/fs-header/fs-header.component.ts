import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-fs-header',
  templateUrl: './fs-header.component.html',
  styleUrls: ['./fs-header.component.scss']
})
export class FsHeaderComponent implements OnInit {

  constructor(public titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Master Settings');    
  }

}
