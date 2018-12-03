import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-split-on-custom',
  templateUrl: './split-on-custom.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnCustomComponent implements OnInit {

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
      console.log('element List: ');
      console.log(response);
      console.log(this.weightSum);
    });
  }

  calculate() {
      this.modifyWeight = false;
      this.weightSum = 0;
      for (const elem of this.elementList) { this.weightSum = this.weightSum + elem.weight; }
      let counter = 0;
      while (counter < this.elementList.length) {
          this.elementList[counter].value = this.value * this.elementList[counter].weight / this.weightSum;
      counter++;
      }
  }

  changePercent() {
    this.modifyWeight = true;
    this.remainingSum = this.value;
    for (const elem of this.elementList) {
      this.remainingSum = this.remainingSum - Number(elem.value); console.log(this.remainingSum); }
    if (Math.abs(this.remainingSum) < 0.000001) { this.remainingSum = 0; }
  }

  calculateWeight() {
    this.modifyWeightSaved = true;
    let smalest = this.value;
    for (const elem of this.elementList) { if (elem.value < smalest) { smalest = elem.value; } }
    let counter = 0;
    while (counter < this.elementList.length) {
        this.elementList[counter].weight = this.elementList[counter].value / smalest * 100;
    counter++;
    }
    this.calculate();
  }

  changeWeight() {
    this.modifyWeightSaved = true;
    this.calculate();
  }

  saveWeight() {
    this.modifyWeightSaved = false;
  }

}
