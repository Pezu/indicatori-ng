import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss']
})

export class AddExpenseModalComponent implements OnInit {

  @Output() result: EventEmitter<string> = new EventEmitter<string>();
  @Input() month: any[];
  @Input() articleList: any[];
  @Input() categoryList: any[];
  @Input() groupList: any[];
  @Input() unitList: any[];
  public selectedGroupCode: String = '';
  public categoryListDisplay: any[] = [];
  public selectedCategoryCode: String = '';
  public articleListDisplay: any[] = [];
  public selectedArticleId: any;
  public selectedUnitId: Number;
  public value: any = '';
  public description: any = '';

  constructor(private apiService: ApiService,
              public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.categoryListDisplay = this.categoryList;
    this.articleListDisplay = this.articleList;
  }

  selectGroupOrCategory(type: Boolean) {
    if (type) {
      this.selectedCategoryCode = '';
    }
    this.selectedArticleId = null;
    this.categoryListDisplay = this.categoryList;
    this.articleListDisplay = this.articleList;
    if (this.selectedGroupCode !== '') {
      this.categoryListDisplay = this.categoryList.filter(elem => elem.group.code === this.selectedGroupCode);
      this.articleListDisplay = this.articleList.filter(elem => elem.groupCode === this.selectedGroupCode);
    }
    if (this.selectedCategoryCode !== '') {
      this.articleListDisplay = this.articleList.filter(elem => elem.categoryCode === this.selectedCategoryCode);
      }
  }

  changeArticle() {
    for (const elem of this.articleList) { if ( elem.id === this.selectedArticleId) {
      this.selectedCategoryCode = elem.categoryCode;
      this.selectedGroupCode = elem.groupCode;
    }}
  }


  validResult(): Boolean {
    if (this.selectedCategoryCode === '') { return false; }
    if (this.selectedGroupCode === '') { return false; }
    if (this.selectedArticleId === null || this.selectedArticleId === 0) { return false; }
    if (this.selectedUnitId === null || this.selectedUnitId === 0) { return false; }
    if (!Utils.stringCanContainOnlyNumbersOrPoint(this.value) || this.value === '') { return false; }

    return true;
  }

  doSave() {
    let groupId;
    let categoryId;
    for (const elem of this.groupList) {if (elem.code === this.selectedGroupCode) { groupId = elem.id; }}
    for (const elem of this.categoryList) {if (elem.code === this.selectedCategoryCode) { categoryId = elem.id; }}
    const output = {
      unitId: this.selectedUnitId,
      articleId: this.selectedArticleId,
      groupId: groupId,
      categoryId: categoryId,
      month: this.month,
      amount: this.value,
      direct: true,
      description: this.description };
    this.apiService.addFacturi(output).subscribe((result: any) => {
      this.result.emit('Saved');
      this.activeModal.close();
    });
          }
  doCancel() {
    this.result.emit('Cancel');
    this.activeModal.close();
}
}
