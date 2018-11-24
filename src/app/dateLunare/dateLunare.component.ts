import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-datelunare',
  templateUrl: './dateLunare.component.html',
  styleUrls: ['./dateLunare.component.scss']
})

export class DatelunareComponent implements OnInit {

  public responseList: any[] = [];
  public monthlyTypeList: any[];
  public domainList: any[] = [];
  public monthlyTypeId: Number = 0;
  public selectedMonth: String;

  constructor(private apiService: ApiService,
              private catalogService: CatalogService,
              private dataKeeper: DataKeeperService) {
                this.dataKeeper.listen().subscribe((message: any) => {
                  console.log(message);
                  if (message === 'selectedMonthChange') { this.initialState(); }
              });
  }

  ngOnInit() {
    this.initialState();
  }

  initialState() {
    this.responseList = [];
    this.domainList = [];
    this.monthlyTypeId = 0;
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
    this.catalogService.getMonthlyType().subscribe((response: any) => {
      this.monthlyTypeList = response;
    });
  }

  changeMonthlyType() {
    this.domainList = [];
    this.apiService.getMonthlyAllowedUnits(this.monthlyTypeId).subscribe((response: any) => {
      for (const elem of response) {
        this.domainList.push({name: elem.name, value: 0, id: elem.id, type: this.monthlyTypeId, month: this.selectedMonth});
      }
    });
  }

  doSave() {
    const output = [];
    for (const elem of this.domainList) {
      output.push({value: elem.value, id: elem.id, type: elem.type, month: this.selectedMonth});
    }
    this.apiService.sendDateLunareUpdate(output).subscribe();
  }
}
