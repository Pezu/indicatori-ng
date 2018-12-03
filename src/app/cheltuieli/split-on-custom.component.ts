import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() elementList: any[];
  @Output() saveOk = new EventEmitter<Boolean>();

  public remainingSum: any;
  public canSave: Boolean;
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.readData();
  }

  readData() {
    this.elementList.slice(0, this.elementList.length);
    this.apiService.getManualSplit(this.articleId, this.unitId).subscribe((response: any) => {
      for (const elem of response) { this.elementList.push(elem); }
      this.calculateRemainingSum();
      console.log('element List: ');
      console.log(response);
    });
  }

  calculateRemainingSum() {
    let sum = 0;
    let counter = 0;
    while (counter < this.elementList.length) {
      sum = sum + Number(this.elementList[counter].value);
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
