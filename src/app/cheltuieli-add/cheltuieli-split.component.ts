import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-cheltuieli-split',
  templateUrl: './cheltuieli-split.component.html',
  styleUrls: ['./cheltuieli-split.component.scss']
})

export class CheltuieliSplitComponent implements OnInit {

  public selectedSplitCode: any = 'NUL';
  public toSelectedSplitCode:  any = 'NUL';
  public splitList: any[];
  public splitObject: any;
  public canSave: Boolean;
  public value: Number;
  @Input() exp: any;
  @Input() month: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor( private apiService: ApiService,
               private catalogService: CatalogService,
               public activeModal: NgbActiveModal,
               private dataKeeper: DataKeeperService) {

  }

  ngOnInit() {
    this.value = this.exp.amount;
    this.canSave = true;
    this.readData();
  }

  readData() {
    this.catalogService.getSplits().subscribe((response: any) => {
      this.splitList = response;
      console.log(response);
    });
  }

  changeSplit() {
    let split = {id: 0, code: '', name: ''};
    for (const elem of this.splitList) { if (elem.code === this.toSelectedSplitCode) { split = elem; }}
     this.apiService.getSplitDetails({
      parentUnitId: this.exp.unitId,
      expenseId: this.exp.id,
      articleId: this.exp.articleId,
      splitCode: split.code,
      splitId: split.id,
      month: this.month,
      categoryId: this.exp.categoryId,
      groupId: this.exp.groupId
    }).subscribe((result: any) => {
      this.splitObject = result;
      let counter = 0;
      while (counter < this.splitObject.children.length) {
          if (this.splitObject.children[counter].weight === null) { this.splitObject.children[counter].weight = 0; }
      counter++;
      }
      console.log(this.splitObject);
      this.selectedSplitCode =  this.toSelectedSplitCode;
      this.dataKeeper.shareMessage('splitDetailsLoaded');
    });
  }

  doSave() {
    this.splitObject.updateWeight = false;
    this.apiService.setSplitDetails(this.splitObject).subscribe((result: any) => {
      this.result.emit(true);
      this.activeModal.close();
    }, error => {
      this.result.emit(false);
      this.activeModal.close();
    });
  }

  cancel() {
    this.result.emit(false);
    this.activeModal.close();
  }

  receiveMessage($event) {
    this.canSave = $event;
  }

  valid(): Boolean {
    let sum = 0;
    if (this.splitObject) {
      for (const elem of this.splitObject.children) { sum = sum + Number(elem.value); }
      if (Math.abs(Number(this.value) - sum) > 0.001) { return false; }
    } else { return false; }
    return true;
  }

}
