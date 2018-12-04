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
    this.apiService.getSplitDetails({
      parentUnitId: this.exp.unitId,
      expenseId: this.exp.id,
      articleId: this.exp.articleId,
      splitCode: this.toSelectedSplitCode.code,
      splitId: this.toSelectedSplitCode.id,
      month: this.month,
      categoryId: this.exp.categoryId,
      groupId: this.exp.groupId
    }).subscribe((result: any) => {
      this.splitObject = result;
      this.selectedSplitCode =  this.toSelectedSplitCode;
      this.dataKeeper.shareMessage('splitDetailsLoaded');
    });
  }

  doSave() {
    if (this.selectedSplitCode === 'PRC') {
      // let counter = 0;
      // while (counter < this.elementList.length) {
      //     this.elementList[counter].updateWeight = false;
      //     counter++;
      //   }
      // this.apiService.sendPercenatgeSplit(this.elementList).subscribe((result: any) => {
      //     this.ok();
      // });
    }
    console.log(this.splitObject);
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
