import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-split-on-custom',
  templateUrl: './split-on-custom.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnCustomComponent implements OnInit {

  @Input() value: any;

  constructor() {

  }

  ngOnInit() {

  }
}
