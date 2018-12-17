import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-inventar-add',
  templateUrl: './inventar-add.component.html',
  styleUrls: ['./inventar-add.component.scss']
})

export class InventarAddComponent implements OnInit {

  @Output() result: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() accoutList: any;
  public code: any = '';
  public name: any = '';
  public pret: any = '';
  public nrArticole: Number = 1;
  public listaArticole: any = [];
  public accountId: any;
  public valueList: Number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal) {

 }

  ngOnInit() {
    this.initialInit();
  }

  initialInit() {
    this.accountId = this.accoutList[0].id;
    this.name = '';
    this.pret = '';
    this.listaArticole = [];
  }

  valid(): Boolean {
    for (let x = 0; x < this.listaArticole.length; x++) {
      if (this.listaArticole[x].code === '') { return false; }
      if (this.listaArticole[x].code === this.code) { return false; }
      for (let y = x; y < this.listaArticole.length; y++) {
        if ((this.listaArticole[x].code === this.listaArticole[y].code) && (x !== y)) { return false; }
      }
    }
    if (this.code === '') { return false; }
    if (this.name === '') { return false; }
    if (!Utils.stringCanContainOnlyNumbers(this.pret) || (Number(this.pret) === 0)) { return false; }
    if (this.accoutList.length === 0) { return false; }
    return true;
  }

  doSave() {
      const outlist = [this.code];
      for (const elem of this.listaArticole) { outlist.push(elem.code); }
      const output = {
        pret: this.pret,
        name: this.name,
        accountId: this.accountId,
        artList: outlist
      };
      this.apiService.addFixed(output).subscribe((result: any) => {
        this.result.emit(true);
        this.activeModal.close();
      }, error => {
        this.result.emit(false);
        this.activeModal.close();
      });
  }

  changeNrArticole() {
    this.listaArticole = [];
    for (let x = 1; x < this.nrArticole; x++ ) { this.listaArticole.push({code: ''}); }
  }

  cancel() {
    this.activeModal.close();
  }

}
