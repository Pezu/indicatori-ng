import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-dateLunare',
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

  }

  ngOnInit() {
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
    this.catalogService.getMonthlyType().subscribe((response: any) => {
      this.monthlyTypeList = response;
    });
  }

  changeMonthlyType() {
    this.apiService.getMonthlyAllowedUnits(this.monthlyTypeId).subscribe((response: any) => {
      for (const elem of response) {
        this.domainList.push({name: elem.name, value: 0, id: elem.id, type: this.monthlyTypeId, month: this.selectedMonth});
      }
    });
  }

  doSave() {
    console.log(this.domainList);
    this.apiService.sendDateLunareUpdate(this.domainList).subscribe();
  }
}
