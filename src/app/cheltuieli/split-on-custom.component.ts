import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../services/utils.service';
@Component({
  selector: 'app-split-on-custom',
  templateUrl: './split-on-custom.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnCustomComponent implements OnInit {

  @Input() value: any;
  @Input() splitObject: any;
  @Output() saveOk = new EventEmitter<Boolean>();

  public remainingSum: any;
  public canSave: Boolean;
  public storedChildren: any[];

  constructor() {

  }

  ngOnInit() {
    this.storedChildren = Utils.cloneObject(this.splitObject.children);
    this.calculateRemainingSum();
  }

  readData() {
    this.splitObject.children.splice(0, this.splitObject.children.length);
    for (const elem of this.storedChildren) { this.splitObject.children.push(elem); }
    this.calculateRemainingSum();
  }

  calculateRemainingSum() {
    let sum = 0;
    for (const elem of this.splitObject.children) { sum = sum + Number(elem.value); }
    this.remainingSum = this.value - sum;
    if (Math.abs(this.remainingSum) < 0.001) {
        this.canSave = true;
        this.saveOk.emit(true);
      } else {
        this.canSave = false;
        this.saveOk.emit(false);
      }
  }

}
