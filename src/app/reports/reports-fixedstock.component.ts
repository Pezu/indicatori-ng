import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-fixedstock',
  templateUrl: './reports-fixedstock.component.html',
  styleUrls: ['./reports-table.component.scss']
})

export class ReportsFixedstockComponent implements OnInit {

  @Input() displayList: any;

  constructor() {

  }

  ngOnInit() {

  }

  decimalize(val: any): any {
    val = Math.round(val * 100);
    return val / 100;
  }
}
