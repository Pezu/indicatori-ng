import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-split-on-universal',
  templateUrl: './split-on-universal.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class SplitOnUniversalComponent implements OnInit {

  @Input() value: any;
  @Input() articleId: any;
  @Input() unitId: any;
  @Input() elementList: any[];
  @Output() saveOk = new EventEmitter<Boolean>();
  public weightSum: any;

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.readData();
  }

  readData() {
    this.elementList.slice(0, this.elementList.length);
    this.apiService.getUniversalSplit(this.articleId, this.unitId).subscribe((response: any) => {
      for (const elem of response) { this.elementList.push(elem); }
      this.calculate();
      console.log('element List: ');
      console.log(response);
    });
  }

  calculate() {
    this.weightSum = 0;
    for (const elem of this.elementList) { this.weightSum = this.weightSum + Number(elem.weight); }
    let counter = 0;
    while (counter < this.elementList.length) {
             let val = this.value * Number(this.elementList[counter].weight) / this.weightSum;
             val = Math.round(val * 100);
             this.elementList[counter].value = val / 100;
    counter++;
    }
    if (this.weightSum) { this.saveOk.emit(true); } else { this.saveOk.emit(false); }
}

}
