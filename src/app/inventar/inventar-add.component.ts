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
  public name: any = '';
  public pret: any = '';
  public nrArticole: Number = 1;
  public quantity: any = '';
  public description: any = '';
  public accountId: any;


  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal) {

 }

  ngOnInit() {
    this.initialInit();
  }

  initialInit() {
    this.accountId = this.accoutList[0].id;
  }

  valid(): Boolean {
    if (this.name === '') { return false; }
    if (this.description === '') { return false; }
    if (isNaN(Number(this.pret)) || Number(this.pret) === 0) { return false; }
    if (isNaN(Number(this.quantity)) || Number(this.quantity) === 0) { return false; }
    if (this.accoutList.length === 0) { return false; }
    return true;
  }

  doSave() {

      const output = {
        pret: this.pret,
        name: this.name,
        accountId: this.accountId,
        quantity: this.quantity,
        description: this.description
      };
      this.apiService.addFixed(output).subscribe((result: any) => {
        this.result.emit(true);
        this.activeModal.close();
      }, error => {
        this.result.emit(false);
        this.activeModal.close();
      });
  }

  cancel() {
    this.activeModal.close();
  }

}
