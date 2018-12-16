import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-summary',
  templateUrl: './reports-summary.component.html',
  styleUrls: ['./reports-table.component.scss']
})


export class ReportsSummaryComponent implements OnInit {

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
