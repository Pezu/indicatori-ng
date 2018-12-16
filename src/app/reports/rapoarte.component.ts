import { ApiService } from './../services/api.service';
import { CatalogService } from './../services/catalog.service';
import { Component, OnInit } from '@angular/core';
import { DataKeeperService } from '../services/datakeeper.service';
@Component({
  selector: 'app-rapoarte',
  templateUrl: './rapoarte.component.html',
  styleUrls: ['./rapoarte.component.scss']
})

export class RapoarteComponent implements OnInit {

  public rapportList: any;
  public selectedRapportCode: any = '';
  public displayList: any;
  public selectedMonth: String;
  public downlink: any;

  constructor(
              private apiService: ApiService,
              private catalogService: CatalogService,
              private dataKeeper: DataKeeperService) {
                this.dataKeeper.listen().subscribe((message: any) => {
                  if (message === 'selectedMonthChange') { this.initialState(); }
              });
}

  ngOnInit() {
    this.catalogService.getRapports().subscribe((result: any) => {
      this.rapportList = result;
    });

  }

  initialState() {
    this.selectedRapportCode = '';
    this.displayList = [];
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
  }

  selectRapport() {
    if (this.selectedRapportCode === '') { return; }
    if (this.selectedRapportCode === 'SUM') {
      this.apiService.readRapportsSummary(this.selectedMonth).subscribe((result: any) => {
        this.displayList = result;
        this.downlink = 'http://localhost:9100/rapports/export/summary/' + this.selectedMonth;
      });
      return;
    }
    if (this.selectedRapportCode === 'FMO') {
      this.apiService.readRapportsFixedMovement(this.selectedMonth).subscribe((result: any) => {
        this.displayList = result;
        this.downlink = 'http://localhost:9100/rapports/export/summary/' + this.selectedMonth;
      });
      return;
    }
    if (this.selectedRapportCode === 'FST') {
      this.apiService.readRapportsFixedStock(this.selectedMonth).subscribe((result: any) => {
        this.displayList = result;
        this.downlink = 'http://localhost:9100/rapports/export/summary/' + this.selectedMonth;
      });
      return;
    }
  }

}
