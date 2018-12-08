import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { DataKeeperService } from '../services/datakeeper.service';
import { AddExpenseModalComponent } from './add-expense-modal.component';
import { CheltuieliSplitComponent } from './cheltuieli-split.component';
import { SimplemodalComponent } from '../utils/simplemodal.component';
import { YesnomodalComponent } from '../utils/yesnomodal.component';
import { CheltuieliViewComponent } from './cheltuieli-view.component';
@Component({
  selector: 'app-cheltuieli-add',
  templateUrl: './cheltuieli-add.component.html',
  styleUrls: ['./cheltuieli-add.component.scss']
})

export class CheltuieliAddComponent implements OnInit {

  public groupList: any[] = [];
  public selectedGroupId: any = 0;
  public categoryList: any[] = [];
  public categoryListDisplay: any[] = [];
  public selectedCategoryId: any = 0;
  public articleList: any[] = [];
  public articleListDisplay: any[] = [];
  public selectedArticleId: any;
  public unitList: any[] = [];
  public selectedUnitId: any;
  public selectedMonth: any;
  public expensesList: any;
  public filterSplited: any = 2;
  public filterEntered: any = 2;
  public pageSize: any = 10;
  public pageNo: any = 1;
  public pageMax: any;

  constructor(private modalService: NgbModal,
    private apiService: ApiService,
    private catalogService: CatalogService,
    private dataKeeper: DataKeeperService) {
      this.dataKeeper.listen().subscribe((message: any) => {
        if (message === 'selectedMonthChange') {
          this.initialInit();
          this.readResults(true);
        }
    });
}

  ngOnInit() {
    this.selectedUnitId = 0;
    this.initialInit();
    this.readData();
    this.readResults(true);
  }

  readData() {
    this.catalogService.getUnits().subscribe((response: any) => {
      this.unitList = response;
    });
    this.catalogService.getGroups().subscribe((response: any) => {
      this.groupList = response;
    });
    this.catalogService.getCategories().subscribe((response: any) => {
      this.categoryList = response;
    });
    this.apiService.getGrupaCategorieArticol().subscribe((response) => {
      this.articleList = response;
      let counter = 0;
      while (counter < this.articleList.length) {
          this.articleList[counter].composedName =
              this.articleList[counter].groupCode + '.' +
              this.articleList[counter].categoryCode + '.' +
              this.articleList[counter].code + ' - ' +
              this.articleList[counter].name;
      counter++;
      this.articleListDisplay = this.articleList;
      }
    });
  }

  decimalize(val: any): any {
    val = Math.round(val * 100);
    return val / 100;
  }

  readResults(toPage1: Boolean) {
    if (toPage1) { this.pageNo = 1; }
    const output = {
      month: this.selectedMonth,
      articleId: null,
      unitId: null,
      categoryId: null,
      groupId: null,
      root: this.filterEntered,
      split: this.filterSplited,
      pageSize: this.pageSize,
      pageNo: this.pageNo
      };
    if (this.selectedArticleId) { output.articleId = this.selectedArticleId; }
    if ((Number(this.selectedUnitId) !== 0)) { output.unitId = this.selectedUnitId; }
    if (Number(this.selectedGroupId) !== 0) { output.groupId = this.selectedGroupId; }
    if (Number(this.selectedCategoryId) !== 0) { output.categoryId = this.selectedCategoryId; }
    this.apiService.fetchFacturi(output).subscribe((result: any) => {
      this.pageMax = Math.floor(result.count / this.pageSize) + 1;
      this.expensesList = result.expenses;
    });
  }

  initialInit() {
    this.selectedArticleId = null;
    this.selectedUnitId = 0;
    this.selectedCategoryId = 0;
    this.selectedGroupId = 0;
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
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
    this.readResults(true);
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
      this.readResults(true);
  }

  changeArticle() {
    for (const elem of this.articleList) { if ( elem.id === this.selectedArticleId) {
      this.selectedGroupId = this.getGroupIdByCode(elem.groupCode);
      this.categoryListDisplay = this.categoryList.filter(filterElem => Number(filterElem.group.id) === Number(this.selectedGroupId));
      this.selectedCategoryId = this.getCategoryIdByCode(elem.groupCode, elem.categoryCode);
    }}
    this.readResults(true);
  }

  addFactura() {
    const modalRef = this.modalService.open(AddExpenseModalComponent, {'size': 'lg'});
    modalRef.componentInstance.articleList = this.articleList;
    modalRef.componentInstance.categoryList = this.categoryList;
    modalRef.componentInstance.groupList = this.groupList;
    modalRef.componentInstance.unitList = this.unitList;
    modalRef.componentInstance.month = this.selectedMonth;
    modalRef.componentInstance.result.subscribe( (value: any) => {
        let confirmare = true;
        if ( value === 'Saved' ) { this.readResults(true); }
        if ( value === 'Error' ) { confirmare = false; }
        if (!confirmare) {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
          modalRef1.componentInstance.title = 'Salvare Cheltuiala';
          modalRef1.componentInstance.message = 'A survenit o eroare la salvarea datelor';
        }
      });
  }

  confirmDelete(id: Number) {
    const modalRef = this.modalService.open(YesnomodalComponent);
    modalRef.componentInstance.titlu = 'Confirma stergerea';
    modalRef.componentInstance.message = 'Sunteti sigur ca vreti sa eliminati aceasta cheltuiala?';
    modalRef.componentInstance.result.subscribe(() => {
        this.deleteFactura(id);
        }, error => {});
  }

  deleteFactura(id: Number) {
    this.apiService.deleteFacturi(id).subscribe((result: any) => {
      this.readResults(true);
    });
  }

  confirmDeleteSplit(id: Number) {
    const modalRef = this.modalService.open(YesnomodalComponent);
    modalRef.componentInstance.titlu = 'Confirma stergerea impartirii';
    modalRef.componentInstance.message = 'Confirmand veti elimina impartirea de pe aceasta cheltuiala';
    modalRef.componentInstance.result.subscribe(() => {
        this.deleteSplit(id);
        }, error => {});
  }

  deleteSplit(id: Number) {
    this.apiService.deleteFacturiImpartite(id).subscribe((result: any) => {
      this.readResults(true);
    });
  }

  articleName(id: any): String {
    for (const elem of this.articleList) {
      if (elem.id === id) { return elem.name; }
    }
  }

  unitName(id: any): String {
    for (const elem of this.unitList) {
      if (elem.id === id) { return elem.name; }
    }
  }

  codeName(groupId: any, catId: any, artId: any): String {
    let groupCode = '';
    let catCode = '';
    for (const elem of this.groupList) {
      if (elem.id === groupId) { groupCode = elem.code; }
    }
    for (const elem of this.categoryList) {
      if (elem.id === catId) { catCode = elem.code; }
    }
    for (const elem of this.articleList) {
      if (elem.id === artId) { return groupCode + '.' + catCode + '.' + elem.code; }
    }
  }

  paginaStanga() {
    this.pageNo = this.pageNo - 1;
    this.readResults(false);
  }

  paginaDreapta() {
    this.pageNo = this.pageNo + 1;
    this.readResults(false);
  }

  split(exp: any) {
    const modalRef = this.modalService.open(CheltuieliSplitComponent, {'size': 'lg'});
    modalRef.componentInstance.month = this.selectedMonth;
    modalRef.componentInstance.exp = exp;
    modalRef.componentInstance.result.subscribe((result: Boolean) => {
        if (result) {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
            modalRef1.componentInstance.title = 'Impartire Cheltuiala';
            modalRef1.componentInstance.message = 'Suma a fost impartita cu succes';
            this.readResults(true);
        } else {
          const modalRef1 = this.modalService.open(SimplemodalComponent);
          modalRef1.componentInstance.title = 'Impartire Cheltuiala';
          modalRef1.componentInstance.message = 'A survenit o eroare';
        }
        });
  }

  viewSplit(exp: any) {
    const modalRef = this.modalService.open(CheltuieliViewComponent, {'size': 'lg'});
    modalRef.componentInstance.month = this.selectedMonth;
    modalRef.componentInstance.exp = exp;
    modalRef.componentInstance.result.subscribe((result: Boolean) => {
        });
  }

}
