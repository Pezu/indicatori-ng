import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simplemodal',
  templateUrl: './simplemodal.component.html',
  styleUrls: ['./simplemodal.component.css']
})

export class SimplemodalComponent implements OnInit {

  @Input()
  message: string;

  @Input()
  title: string;

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {

  }
}
