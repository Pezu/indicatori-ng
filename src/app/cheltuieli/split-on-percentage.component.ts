import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-split-on-percentage',
  templateUrl: './split-on-percentage.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnPercentageComponent implements OnInit {

  @Input() value: any;
  @Input() articleId: any;
  @Input() unitId: any;
  @Input() elementList: any[];
  @Output() saveOk = new EventEmitter<Boolean>();
  public weightSum: any;
  public modifyWeight: Boolean = false;
  public modifyWeightSaved: Boolean = false;
  public remainingSum: any;

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.readData();
  }

  readData() {
    this.elementList.slice(0, this.elementList.length);
    this.apiService.getPercenatgeSplit(this.articleId, this.unitId).subscribe((response: any) => {
      for (const elem of response) { this.elementList.push(elem); }

      this.calculate();
    });
  }

  calculate() {
      this.modifyWeight = false;
      this.weightSum = 0;
      for (const elem of this.elementList) { this.weightSum = this.weightSum + Number(elem.weight); }
      let counter = 0;
      while (counter < this.elementList.length) {
          if (this.weightSum) {
               let val = this.value * Number(this.elementList[counter].weight) / this.weightSum;
               val = Math.round(val * 100);
               this.elementList[counter].value = val / 100;
            } else {
              this.elementList[counter].value = 0;
            }
      counter++;
      }
      if (this.weightSum) { this.saveOk.emit(true); } else { this.saveOk.emit(false); }
  }

  changeWeight() {
    this.modifyWeightSaved = true;
    this.calculate();
  }

  saveWeight() {
    let counter = 0;
    while (counter < this.elementList.length) {
      this.elementList[counter].updateWeight = true;
    counter++;
    }
    this.apiService.sendPercenatgeSplit(this.elementList).subscribe((result: any) => {
      this.modifyWeightSaved = false;
    });
  }

}
