import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../services/utils.service';
@Component({
  selector: 'app-split-on-custom',
  templateUrl: './split-on-custom.component.html',
  styleUrls: ['./split-on-custom.component.scss']
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
    this.calculateRemainingSum(0);
  }

  readData() {
    this.splitObject.children.splice(0, this.splitObject.children.length);
    for (const elem of this.storedChildren) { this.splitObject.children.push(elem); }
    this.calculateRemainingSum(0);
  }

  calculateRemainingSum(time: any) {
    setTimeout( () => {
        let sum = 0;
        for (const elem of this.splitObject.children) { sum = sum + Number(elem.value); }
        this.remainingSum = this.decimalize(this.value) - sum;
        if (this.remainingSum === 0) {
            this.canSave = true;
            this.saveOk.emit(true);
          } else {
            this.canSave = false;
            this.saveOk.emit(false);
          }
    }, time );
  }

  decimalize(val: any): any {
    val = Math.round(val * 100);
    return val / 100;
  }


}
