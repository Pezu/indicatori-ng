import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataKeeperService } from '../services/datakeeper.service';
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

  constructor(private dataKeeper: DataKeeperService) {
    this.dataKeeper.listen().subscribe((message: any) => {
      if (message === 'splitDetailsLoaded') {
        this.storedChildren = this.splitObject.children;
      }
  });
  }

  ngOnInit() {

  }

  readData() {
    this.splitObject.children.slice(0, this.splitObject.children.length);
    for (const elem of this.storedChildren) { this.splitObject.children.push(elem); }

  }

  calculateRemainingSum() {
    let sum = 0;
    let counter = 0;
    while (counter < this.splitObject.children.length) {
      sum = sum + Number(this.splitObject.children[counter].value);
    counter++;
    }
    this.remainingSum = this.value - sum;
    if (Math.abs(this.remainingSum) < 0.01) {
        this.canSave = true;
        this.saveOk.emit(true);
      } else {
        this.canSave = false;
        this.saveOk.emit(false);
      }
  }

}
