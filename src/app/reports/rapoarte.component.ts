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
  public selectedDateStart: String;
  public selectedDateStop: String;
  public dateList: any[];

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
    this.generateDateList();
    this.initialState();
  }

  generateDateList() {
    this.dateList = [];
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) {
      this.selectedDateStart = String(year) + '-0' + String(month);
    } else {
      this.selectedDateStart = String(year) + '-' + String(month);
    }
    this.selectedDateStop = this.selectedDateStart;
    while (!((year === 2018) && (month === 11))) {
      if (month < 10) {
        this.dateList.push({
          code: String(year) + '-0' + String(month),
          name: String(year) + ' - ' + this.catalogService.getMonth(month)});
      } else {
        this.dateList.push({
          code: String(year) + '-' + String(month),
          name: String(year) + ' - ' + this.catalogService.getMonth(month)});
      }
    month--;
    if (month === 0) {
      month = 12;
      year--;
      }
    }


  }

  initialState() {
    this.selectedRapportCode = '';
    this.displayList = [];
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
  }

  selectRapport() {
    if (this.selectedRapportCode === '') { return; }
    if (this.selectedRapportCode === 'SUM') {
      this.apiService.readRapportsSummary(this.selectedDateStart, this.selectedDateStop).subscribe((result: any) => {
        this.displayList = result;
        this.downlink = 'http://localhost:9100/rapports/export/summary/' + this.selectedMonth;
      });
      return;
    }
    if (this.selectedRapportCode === 'FMO') {
      this.apiService.readRapportsFixedMovement(this.selectedDateStart, this.selectedDateStop).subscribe((result: any) => {
        this.displayList = result;
        this.downlink = 'http://localhost:9100/rapports/export/fixed-balance/' + this.selectedMonth;
      });
      return;
    }
    if (this.selectedRapportCode === 'FST') {
      this.apiService.readRapportsFixedStock(this.selectedDateStart, this.selectedDateStop).subscribe((result: any) => {
        this.displayList = result;
        this.downlink = 'http://localhost:9100/rapports/export/fixed-stock/' + this.selectedMonth;
      });
      return;
    }
  }

}
