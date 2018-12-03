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
  public selectedGroupId: Number = 0;
  public categoryListDisplay: any[] = [];
  public selectedCategoryId: Number = 0;
  public articleListDisplay: any[] = [];
  public selectedArticleId: any;
  public selectedUnitId: any;
  public value: any = '';
  public description: any = '';

  constructor(private apiService: ApiService,
              public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.articleListDisplay = this.articleList;
    this.selectedUnitId = '';
  }

  getGroupCodeById(id: Number): String {
    for (const elem of this.groupList) { if (Number(elem.id) === id) { return elem.code; }}
    return '';
  }

  getCategoryCodeById(id: Number): String {
    for (const elem of this.categoryList) { if (Number(elem.id) === id) { return elem.code; }}
    return '';
  }

  getGroupIdByCode(code: String): Number {
    for (const elem of this.groupList) { if (elem.code === code) { return elem.id; }}
    return 0;
  }

  getCategoryIdByCode(codeGr: String, codeCat: String): Number {
    let groupId = 0;
    for (const elem of this.groupList) { if (elem.code === codeGr) { groupId = elem.id; }}
    const categoryList = this.categoryList.filter(elem => Number(elem.group.id) === Number(groupId));
    for (const elem of categoryList) { if (elem.code === codeCat) { return elem.id; }}
    return 0;
  }

  selectGroup() {
    const groupCode = this.getGroupCodeById(Number(this.selectedGroupId));
    this.selectedArticleId = null;
    this.selectedCategoryId = 0;
    if (Number(this.selectedGroupId) !== 0) {
      this.categoryListDisplay = this.categoryList.filter(elem => Number(elem.group.id) === Number(this.selectedGroupId));
      this.articleListDisplay = this.articleList.filter(elem => elem.groupCode === groupCode);
    } else {
      this.articleListDisplay = this.articleList;
      this.categoryListDisplay = [];
    }
  }

  selectCategory() {
    const groupCode = this.getGroupCodeById(Number(this.selectedGroupId));
    const categoryCode = this.getCategoryCodeById(Number(this.selectedCategoryId));
    this.selectedArticleId = null;
    if (Number(this.selectedCategoryId) !== 0) {
      this.articleListDisplay = this.articleList.filter(elem => elem.groupCode === groupCode);
      this.articleListDisplay = this.articleListDisplay.filter(elem => elem.categoryCode === categoryCode);
      } else {
        if (Number(this.selectedGroupId) !== 0) {
          this.articleListDisplay = this.articleList.filter(elem => elem.groupCode === groupCode);
        } else {
          this.articleListDisplay = this.articleList;
        }
      }
  }

  changeArticle() {
    for (const elem of this.articleList) { if ( elem.id === this.selectedArticleId) {
      this.selectedGroupId = this.getGroupIdByCode(elem.groupCode);
      this.categoryListDisplay = this.categoryList.filter(filterElem => Number(filterElem.group.id) === Number(this.selectedGroupId));
      this.selectedCategoryId = this.getCategoryIdByCode(elem.groupCode, elem.categoryCode);
    }}
  }

  validResult(): Boolean {
    if (Number(this.selectedCategoryId) === 0) { return false; }
    if (Number(this.selectedGroupId) === 0) { return false; }
    if (this.selectedArticleId === null || this.selectedArticleId === 0) { return false; }
    if (this.selectedUnitId === '' || this.selectedUnitId === 0) { return false; }
    if (!Utils.stringCanContainOnlyNumbersOrPoint(this.value) || this.value === '') { return false; }

    return true;
  }

  doSave() {
    const output = {
      unitId: this.selectedUnitId,
      articleId: this.selectedArticleId,
      groupId: this.selectedGroupId,
      categoryId: this.selectedCategoryId,
      month: this.month,
      amount: this.value,
      direct: true,
      description: this.description };
    this.apiService.addFacturi(output).subscribe((result: any) => {
      this.result.emit('Saved');
      this.activeModal.close();
    }, error => {
      this.result.emit('Error');
      this.activeModal.close();
    });
          }
  doCancel() {
    this.result.emit('Cancel');
    this.activeModal.close();
}
}
