import { Component, OnInit, Input } from '@angular/core';
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
  public elementList: any[];
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
    this.apiService.getPercenatges(this.articleId, this.unitId).subscribe((response: any) => {
      this.elementList = response;
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
  }

  changeWeight() {
    this.modifyWeightSaved = true;
    this.calculate();
  }

  saveWeight() {
    this.modifyWeightSaved = false;
  }

}
