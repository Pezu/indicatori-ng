import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-split-on-universal',
  templateUrl: './split-on-universal.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnUniversalComponent implements OnInit, OnChanges {

  @Input() value: any;
  @Input() splitObject: any;
  @Output() saveOk = new EventEmitter<Boolean>();
  public weightSum: any;

  constructor() {
  }

  ngOnInit() {
    this.calculate();
  }

  ngOnChanges() {
    this.calculate();
  }

  calculate() {
    this.weightSum = 0;
    for (const elem of this.splitObject.children) { this.weightSum = this.weightSum + Number(elem.weight); }
    let counter = 0;
    while (counter < this.splitObject.children.length) {
      this.splitObject.children[counter].value = this.value * Number(this.splitObject.children[counter].weight) / this.weightSum;
    counter++;
    }
    if (this.weightSum) { this.saveOk.emit(true); } else { this.saveOk.emit(false); }
}

decimalize(val: any): any {
  val = Math.round(val * 100);
  return val / 100;
}

}
