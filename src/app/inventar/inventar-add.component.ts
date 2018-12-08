import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

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
  public accountId: any;

  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal) {

 }

  ngOnInit() {
    this.accountId = this.accoutList[0].id;
  }

  valid(): Boolean {
    if (this.code === '') { return false; }
    if (this.name === '') { return false; }
    if (this.accoutList.length === 0) { return false; }
    return true;
  }

  doSave() {
      const output = {
        code: this.code,
        name: this.name,
        accountId: this.accountId
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