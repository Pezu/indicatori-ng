import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inventar-move',
  templateUrl: './inventar-move.component.html',
  styleUrls: ['./inventar-move.component.scss']
})

export class InventarMoveComponent implements OnInit {

  @Output() result: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() fix: any;
  @Input() accoutList: any;
  @Input() title: any;
  public destAccountId: any;
  public quantity: any = '';
  public description: any = '';

  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal) {

 }

  ngOnInit() {
    this.accoutList = this.accoutList.filter(elem => (elem.id !== this.fix.account.id));
    this.destAccountId = this.accoutList[0].id;
  }

  valid(): Boolean {
    if (this.accoutList.length === 0) { return false; }
    if (this.description === '') { return false; }
    if (isNaN(Number(this.quantity)) || Number(this.quantity) === 0 || Number(this.quantity) > this.fix.quantity) { return false; }
    return true;
  }

  doSave() {
      const output = {
        fixedId: this.fix.id,
        sourceAccountId: this.fix.account.id,
        destinationAccountId: this.destAccountId,
        quantity: this.quantity,
        description: this.description
      };
      this.apiService.moveFixed(output).subscribe((result: any) => {
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
