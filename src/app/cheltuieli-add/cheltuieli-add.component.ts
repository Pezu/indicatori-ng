import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { DataKeeperService } from '../services/datakeeper.service';

@Component({
  selector: 'app-cheltuieli-add',
  templateUrl: './cheltuieli-add.component.html',
  styleUrls: ['./cheltuieli-add.component.scss']
})

export class CheltuieliAddComponent implements OnInit {

  public groupList: any[] = [];
  public selectedGroupCode: String = '';
  public categoryList: any[] = [];
  public categoryListDisplay: any[] = [];
  public selectedCategoryCode: String = '';
  public articleList: any[] = [];
  public articleListDisplay: any[] = [];
  public selectedArticleId: any;
  public unitList: any[] = [];
  public selectedUnitId: Number;
  public selectedMonth: any;
  public gotResults: Boolean = false;

  constructor(private modalService: NgbModal,
    private apiService: ApiService,
    private catalogService: CatalogService,
    private dataKeeper: DataKeeperService) {
      this.dataKeeper.listen().subscribe((message: any) => {
        console.log(message);
        if (message === 'selectedMonthChange') { this.selectedMonth = this.dataKeeper.getData('selectedMonth'); }
    });
}

  ngOnInit() {
    this.gotResults = false;
    this.selectedUnitId = 0;
    this.initialInit();
    this.readData();
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
      this.categoryListDisplay = this.categoryList;
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

  readResults() {
    let groupId;
    let categoryId;
    for (const elem of this.groupList) {if (elem.code === this.selectedGroupCode) { groupId = elem.id; }}
    for (const elem of this.categoryList) {if (elem.code === this.selectedCategoryCode) { categoryId = elem.id; }}
    const output = {
      month: this.selectedMonth,
      articleId: this.selectedArticleId,
      uinitId: this.selectedUnitId,
      categoryId: categoryId,
      groupId: groupId
      };
    this.apiService.fetchFacturi(output).subscribe((result: any) => {
      console.log(result);
      this.gotResults = true;
    });
  }

  initialInit() {
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
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
    this.readResults();
  }

  changeArticle() {
    for (const elem of this.articleList) { if ( elem.id === this.selectedArticleId) {
      this.selectedCategoryCode = elem.categoryCode;
      this.selectedGroupCode = elem.groupCode;
    }}
    this.readResults();
  }

}
