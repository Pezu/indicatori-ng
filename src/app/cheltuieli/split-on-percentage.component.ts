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

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.readData();
  }

  readData() {
    this.apiService.getPercenatges(this.articleId, this.unitId).subscribe((response: any) => {
      this.elementList = response;
      console.log('aici: ');
      console.log(response);
      console.log(this.elementList);
    });
  }

}
