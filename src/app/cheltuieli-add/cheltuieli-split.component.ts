import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cheltuieli-split',
  templateUrl: './cheltuieli-split.component.html',
  styleUrls: ['./cheltuieli-split.component.scss']
})

export class CheltuieliSplitComponent implements OnInit {

  public selectedSplitId: any = 0;
  public splitList: any[];
  @Input() value: Number;
  @Input() articleId: any;
  @Input() unitId: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor( private apiService: ApiService,
               private catalogService: CatalogService,
               public activeModal: NgbActiveModal) {

  }

  readData() {
    this.catalogService.getSplits().subscribe((response: any) => {
      this.splitList = response;
    });
  }

  ngOnInit() {

  }

  doSave() {

  }

  ok() {
    this.result.emit(true);
    this.activeModal.close();
}
}
