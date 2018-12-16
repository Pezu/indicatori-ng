import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../services/api.service';

import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { SimplemodalComponent } from '../utils/simplemodal.component';
import { YesnomodalComponent } from '../utils/yesnomodal.component';
import { InventarAddComponent } from './inventar-add.component';
import { InventarMoveComponent } from './inventar-move.component';
import { InventarDetailsComponent } from './inventar-details.component';
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
              private apiService: ApiService,
              private modalService: NgbModal) {

  }

  ngOnInit() {
  this.catalogService.getAccounts().subscribe((result: any) => {
    this.accoutList = result.filter(elem => ((elem.code !== 'CST') && (elem.code !== 'CNS')));
  });
  this.readResults(0, true);
  }

  changeStare() {
    if (this.selectedStare === 'LIV') {
      this.selectieAccount = true;
      this.readResults(this.selactedAccount, true);
    } else {
      this.selectieAccount = false;
      this.readResults(0, true);
    }
  }

  changeAccount() {
    this.readResults(this.selactedAccount, true);
  }

  readResults(selAcc: any, toPage1: Boolean) {
    if (toPage1) { this.pageNo = 1; }
    const object = {filter: this.selectedStare, account: selAcc, pageNo: this.pageNo, pageSize: this.pageSize };
    this.apiService.getFixedList(object).subscribe((result) => {
      this.fixedList = result.fixed;
      this.pageMax = Math.floor(result.count / this.pageSize) + 1;
    });
  }

  paginaStanga() {
    this.pageNo = this.pageNo - 1;
    this.readResults(this.selactedAccount, false);
  }

  paginaDreapta() {
    this.pageNo = this.pageNo + 1;
    this.readResults(this.selactedAccount, false);
  }

  move(fix: any) {
    const modalRef = this.modalService.open(InventarMoveComponent, {'size': 'lg'});
    modalRef.componentInstance.accoutList = this.accoutList;
    modalRef.componentInstance.fix = fix;
    modalRef.componentInstance.result.subscribe((result: Boolean) => {
        if (result) {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
            modalRef1.componentInstance.title = 'Mutare in inventar';
            modalRef1.componentInstance.message = 'Obiectul a fost mutat cu succes';
            this.readResults(this.selactedAccount, true);
        } else {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
          modalRef1.componentInstance.title = 'Mutare in inventar';
          modalRef1.componentInstance.message = 'A survenit o eroare';
        }
        });
  }

  confirmQuickMove(fix: any, where: any) {
    let message;
    let title;
    let message1;
    let title1;
    if (where === 'CST') {
      title = 'Casare Obiect';
      message = 'Obiectul a fost casat';
      title1 = 'Confirmare casare obiect';
      message1 = 'Sunteti sigur ca vreti sa marcati obiectul casat?';
    } else {
      title = 'Marcat consumat';
      message = 'Obiectul a fost consumat';
      title1 = 'Confirmare consumare obiect';
      message1 = 'Sunteti sigur ca vreti sa marcati obiectul consumat?';
    }
    const modalRef = this.modalService.open(YesnomodalComponent);
    modalRef.componentInstance.titlu = title1;
    modalRef.componentInstance.message = message1;
    modalRef.componentInstance.result.subscribe(() => {
        this.quickMove(fix, where, message, title);
        }, error => {});
  }

  quickMove(fix: any, where: any, message: any, title: any) {
    let destId;
    this.catalogService.getAccounts().subscribe((result: any) => {
      for (const elem of result) { if (elem.code === where) { destId = elem.id; } }
    });
    const output = {
      fixedId: fix.id,
      sourceAccountId: fix.account.id,
      destinationAccountId: destId
    };
    this.apiService.moveFixed(output).subscribe((result: any) => {
      const modalRef1 = this.modalService.open(SimplemodalComponent);
      modalRef1.componentInstance.title = title;
      modalRef1.componentInstance.message = message;
      this.readResults(this.selactedAccount, true);
    }, error => {
      const modalRef1 = this.modalService.open(SimplemodalComponent);
      modalRef1.componentInstance.title = title;
      modalRef1.componentInstance.message = 'A survenit o eroare';
    });
  }

  confirmDelete(id: any) {
    const modalRef = this.modalService.open(YesnomodalComponent);
    modalRef.componentInstance.titlu = 'Stergere obiect';
    modalRef.componentInstance.message = 'Confirmati eliminarea obiectului din evidenta';
    modalRef.componentInstance.result.subscribe(() => {
        this.delete(id);
        }, error => {});
  }

  delete(id: any) {
    this.apiService.deleteFixed(id).subscribe(( result: any ) => {
        const modalRef = this.modalService.open(SimplemodalComponent);
        modalRef.componentInstance.title = 'Stergere obiect din inventar';
        modalRef.componentInstance.message = 'Obiectul a fost sters';
    }, error => {
      const modalRef = this.modalService.open(SimplemodalComponent);
      modalRef.componentInstance.title = 'Stergere obiect din inventar';
        modalRef.componentInstance.message = 'A survenit o eroare la salvare';
    });
  }

  details(id: any, code: any, name) {
    const modalRef = this.modalService.open(InventarDetailsComponent, {'size': 'lg'});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.code = code;
    modalRef.componentInstance.name = name;
  }

  add() {
    const modalRef = this.modalService.open(InventarAddComponent, {'size': 'lg'});
    modalRef.componentInstance.accoutList = this.accoutList;
    modalRef.componentInstance.result.subscribe((result: Boolean) => {
        if (result) {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
            modalRef1.componentInstance.title = 'Adaugare in inventar';
            modalRef1.componentInstance.message = 'Adaugarea a fost efectuata cu succes';
            this.readResults(this.selactedAccount, true);
        } else {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
          modalRef1.componentInstance.title = 'Adaugare in inventar';
          modalRef1.componentInstance.message = 'A survenit o eroare';
        }
        });
  }

}
