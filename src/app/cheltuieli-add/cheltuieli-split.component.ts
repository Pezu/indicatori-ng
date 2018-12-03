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

  public selectedSplitCode: any = 'NUL';
  public splitList: any[];
  public elementList: any[] = [];
  public canSave: Boolean;
  @Input() value: Number;
  @Input() articleId: any;
  @Input() unitId: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor( private apiService: ApiService,
               private catalogService: CatalogService,
               public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.canSave = true;
    this.readData();
  }

  readData() {
    this.catalogService.getSplits().subscribe((response: any) => {
      console.log(response);
      this.splitList = response;
    });
  }

  doSave() {
    if (this.selectedSplitCode === 'PRC') {
      let counter = 0;
      while (counter < this.elementList.length) {
          this.elementList[counter].updateWeight = false;
          counter++;
        }
      this.apiService.sendPercenatgeSplit(this.elementList).subscribe((result: any) => {
          this.ok();
      });
    }
    console.log(this.elementList);
    console.log(this.canSave);
  }

  ok() {
    this.result.emit(true);
    this.activeModal.close();
  }

  cancel() {
    this.result.emit(false);
    this.activeModal.close();
  }

  receiveMessage($event) {
    this.canSave = $event;
  }

}
