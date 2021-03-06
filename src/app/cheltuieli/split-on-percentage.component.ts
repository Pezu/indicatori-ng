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
    this.calculate();
  }

  calculate() {
      this.modifyWeight = false;
      this.weightSum = 0;
      for (const elem of this.splitObject.children) { this.weightSum = this.weightSum + Number(elem.weight); }
      let counter = 0;
      while (counter < this.splitObject.children.length) {
          if (this.weightSum) {
               this.splitObject.children[counter].value = this.value * Number(this.splitObject.children[counter].weight) / this.weightSum;
            } else {
              this.splitObject.children[counter].value = 0;
            }
      counter++;
      }
      if (this.weightSum) { this.saveOk.emit(true); } else { this.saveOk.emit(false); }
  }

  changeWeight() {
    this.modifyWeightSaved = true;
    this.calculate();
  }

  decimalize(val: any): any {
    val = Math.round(val * 100);
    return val / 100;
  }

  saveWeight() {
    this.splitObject.updateWeight = true;
    this.apiService.setSplitDetails(this.splitObject).subscribe((result: any) => {
      this.modifyWeightSaved = false;
    });
  }

}
