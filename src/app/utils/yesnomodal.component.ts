import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yesnomodal',
  templateUrl: './yesnomodal.component.html',
  styleUrls: ['./yesnomodal.component.css']
})

export class YesnomodalComponent {

  @Output() result: EventEmitter<boolean> = new EventEmitter();

  @Input() message: string;

  @Input() titlu: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ok() {
      this.result.emit(true);
      this.activeModal.close();
  }

}
