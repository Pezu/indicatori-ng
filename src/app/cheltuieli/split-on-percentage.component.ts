import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-split-on-percentage',
  templateUrl: './split-on-percentage.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnPercentageComponent implements OnInit {

  @Input() value: any;
  @Input() splitObject: any;
  @Output() saveOk = new EventEmitter<Boolean>();
  public weightSum: any;
  public modifyWeight: Boolean = false;
  public modifyWeightSaved: Boolean = false;
  public remainingSum: any;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

  }

  calculate() {
      this.modifyWeight = false;
      this.weightSum = 0;
      for (const elem of this.splitObject.children) { this.weightSum = this.weightSum + Number(elem.weight); }
      let counter = 0;
      while (counter < this.splitObject.children.length) {
          if (this.weightSum) {
               let val = this.value * Number(this.splitObject.children[counter].weight) / this.weightSum;
               val = Math.round(val * 100);
               this.splitObject.children[counter].value = val / 100;
            } else {
              this.splitObject.children[counter].value = 0;
            }
      counter++;
      }
      this.redistribuire();
      if (this.weightSum) { this.saveOk.emit(true); } else { this.saveOk.emit(false); }
  }

  changeWeight() {
    this.modifyWeightSaved = true;
    this.calculate();
  }

  redistribuire() {
    if (this.splitObject) {
      let sum = 0;
      for (const elem of this.splitObject.children) { sum = sum + Number(elem.value); }
      sum = this.value - sum;
        let counter = 0;
        while (Math.abs(sum) > 0.005) {
          let val = 0;
          if ( sum > 0 ) {
            val = Number(this.splitObject.children[counter].value) + 0.01;
            sum = sum - 0.01;
          } else {
            val = Number(this.splitObject.children[counter].value) - 0.01;
            sum = sum + 0.01;
          }
            val = Math.round(val * 100);
            this.splitObject.children[counter].value = val / 100;
            counter++;
          }
    }
  }

  saveWeight() {
    this.splitObject.updateWeight = true;
    this.apiService.setSplitDetails(this.splitObject).subscribe((result: any) => {
      this.modifyWeightSaved = false;
    });
  }

}
