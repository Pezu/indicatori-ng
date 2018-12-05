import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-cheltuieli-view',
  templateUrl: './cheltuieli-view.component.html',
  styleUrls: ['./cheltuieli-view.component.scss']
})

export class CheltuieliViewComponent implements OnInit {

  @Input() exp: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor( private apiService: ApiService,
               private catalogService: CatalogService,
               public activeModal: NgbActiveModal,
               private dataKeeper: DataKeeperService) {

}

  ngOnInit() {

  }


  cancel() {
    this.result.emit(false);
    this.activeModal.close();
  }
}
