import { Subject } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataKeeperService } from '../services/datakeeper.service';
import { Utils } from '../services/utils.service';

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
    this.apiService.getHSDAvailable(this.exp.unitId).subscribe((result: any) => {
        this.catalogService.getSplits().subscribe((response: any) => {
          this.splitList = Utils.cloneObject(response);
          if (!result) { this.splitList =  this.splitList.filter(elem => elem.code !== 'HSD'); }
          this.apiService.getDefaultSplit(this.exp.unitId, this.exp.articleId).subscribe((ans: any) => {
            if (ans.code === null) { this.toSelectedSplitCode = 'NUL'; } else { this.toSelectedSplitCode = ans.code; this.changeSplit(); }
          });
        });
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
      this.selectedSplitCode =  this.toSelectedSplitCode;
      this.dataKeeper.shareMessage('splitDetailsLoaded');
    });
  }

  doSave() {

    if (this.toSelectedSplitCode === 'MAN') {
      for (let i = 0; i < this.splitObject.children.length; i++) {
        const kid = this.splitObject.children[i];
        kid.value = kid.value / this.decimalize(this.value) * this.value.valueOf();
      }
    }

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
    this.activeModal.close();
  }

  receiveMessage($event) {
    this.canSave = $event;
  }

  valid(): Boolean {
    let sum = 0;
    if (this.splitObject) {
      for (const elem of this.splitObject.children) { sum = sum + Number(elem.value); }
      if (Math.abs(Number(this.value) - sum) > 0.0049) { return false; }
    } else { return false; }
    return true;
  }

  decimalize(val: any): any {
    val = Math.round(val * 100);
    return val / 100;
  }

}
