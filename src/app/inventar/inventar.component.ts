import { ApiService } from './../services/api.service';

import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { SimplemodalComponent } from '../utils/simplemodal.component';
import { YesnomodalComponent } from '../utils/yesnomodal.component';
@Component({
  selector: 'app-inventar',
  templateUrl: './inventar.component.html',
  styleUrls: ['./inventar.component.scss']
})

export class InventarComponent implements OnInit {

  public stareList: any = [
  { name: 'Toate', code: 'ALL' },
  { name: 'Casate', code: 'CST' },
  { name: 'Consumate', code: 'CNS' },
  { name: 'In uz', code: 'LIV' },
  ];
  public selectedStare: String = 'ALL';
  public accoutList: any;
  public selactedAccount: any = 0;
  public selectieAccount: Boolean = false;
  public fixedList: any = [];
  public pageSize: any = 50;
  public pageNo: any = 1;
  public pageMax: Number = 1;

  constructor(private catalogService: CatalogService,
              private apiService: ApiService) {

  }

  ngOnInit() {
  this.catalogService.getAccounts().subscribe((result: any) => {
    this.accoutList = result.filter(elem => ((elem.code !== 'CST') && (elem.code !== 'CNS')));
  });
  this.readResults(0);
  }

  changeStare() {
    if (this.selectedStare === 'LIV') {
      this.selectieAccount = true;
      this.readResults(this.selactedAccount);
    } else {
      this.selectieAccount = false;
      this.readResults(0);
    }
  }

  changeAccount() {
    this.readResults(this.selactedAccount);
  }

  readResults(selAcc: any) {
    const object = {filter: this.selectedStare, account: selAcc, pageNo: this.pageNo, pageSize: this.pageSize };
    this.apiService.getFixedList(object).subscribe((result) => {
      this.fixedList = result.fixed;
      this.pageMax = Math.floor(result.count / this.pageSize) + 1;
    });
  }

  paginaStanga() {
    this.pageNo = this.pageNo - 1;
    this.readResults(this.selactedAccount);
  }

  paginaDreapta() {
    this.pageNo = this.pageNo + 1;
    this.readResults(this.selactedAccount);
  }

  move(fix: any) {

  }

  quickMove(fix: any, whereId: any) {

  }

  confirmDelete(id: any) {

  }

  details(id: any) {

  }

}
