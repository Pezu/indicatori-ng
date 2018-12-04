import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-split-on-universal',
  templateUrl: './split-on-universal.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnUniversalComponent implements OnInit {

  @Input() value: any;
  @Input() splitObject: any;
  @Output() saveOk = new EventEmitter<Boolean>();
  public weightSum: any;

  constructor(private dataKeeper: DataKeeperService) {
    this.dataKeeper.listen().subscribe((message: any) => {
      if (message === 'splitDetailsLoaded') {
        this.calculate();
      }
  });
  }

  ngOnInit() {
  }

  calculate() {
    this.weightSum = 0;
    for (const elem of this.splitObject.children) { this.weightSum = this.weightSum + Number(elem.weight); }
    let counter = 0;
    while (counter < this.splitObject.children.length) {
             let val = this.value * Number(this.splitObject.children[counter].weight) / this.weightSum;
             val = Math.round(val * 100);
             this.splitObject.childrent[counter].value = val / 100;
    counter++;
    }
    if (this.weightSum) { this.saveOk.emit(true); } else { this.saveOk.emit(false); }
}

}
