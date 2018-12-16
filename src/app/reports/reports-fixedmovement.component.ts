import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-fixedmovement',
  templateUrl: './reports-fixedmovement.component.html',
  styleUrls: ['./reports-table.component.scss']
})

export class ReportsFixedmovementComponent implements OnInit {

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
