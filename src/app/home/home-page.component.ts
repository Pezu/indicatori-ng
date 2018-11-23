import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { SecurityService } from '../services/security.service';
import { DataKeeperService } from '../services/datakeeper.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  public loggedUser: String;
  public loggedUserRole: String;
  public selectedMonth: String;
  public monthList: any[] = [];

  constructor(private catalogService: CatalogService,
              private securityService: SecurityService,
              private dataKeeper: DataKeeperService ) {

  }

  ngOnInit() {
  this.loggedUser = this.securityService.getUserName();
  this.loggedUserRole = this.securityService.getUserRole();
  this.generateMonthList();
  }

  generateMonthList() {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.selectedMonth = String(year) + String(month);
    this.dataKeeper.storeData('selectedMonth', this.selectedMonth);
    if ((month - 3) < 1) { year--; month = 9 + month; } else { month = month - 3; }
    let mountCount = 1;
    while (mountCount < 6) {
      if (month < 10) {
        this.monthList.push({val: String(year) + '0' + String(month), name: String(year) + ' - ' + this.catalogService.getMonth(month)});
      } else {
        this.monthList.push({val: String(year) + String(month), name: String(year) + ' - ' + this.catalogService.getMonth(month)});
      }
      month++;
      if (month > 12) { month = 1; year++; }
      mountCount++;
    }
  }

  changeSelectedMonth() {
    this.dataKeeper.storeData('selectedMonth', this.selectedMonth);
  }

  hasRight(right: String): Boolean {
    return true;
  }
}
