import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-cheltuieli',
  templateUrl: './cheltuieli.component.html',
  styleUrls: ['./cheltuieli.component.scss']
})

export class CheltuieliComponent implements OnInit {

  public groupList: any[] = [];
  public selectedGroupCode: any;
  public categoryList: any[] = [];
  public categoryListDisplay: any[] = [];
  public selectedCategoryCode: any;
  public articleList: any[] = [];
  public articleListDisplay: any[] = [];
  public selectedArticleId: any;

  constructor(private catalogService: CatalogService,
              private apiService: ApiService) {

  }

  ngOnInit() {
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
              this.articleList[counter].groupCode + ' - ' +
              this.articleList[counter].categoryCode + ' ' +
              this.articleList[counter].name;
      counter++;
      this.articleListDisplay = this.articleList;
      }
    });

  }


  selectGroupOrCategory(type: Boolean) {
    if (type) {
      this.selectedCategoryCode = null;
    }
    this.selectedArticleId = null;
    this.categoryListDisplay = this.categoryList;
    this.articleListDisplay = this.articleList;
    if (this.selectedGroupCode) {
      this.categoryListDisplay = this.categoryList.filter(elem => elem.group.code === this.selectedGroupCode);
      this.articleListDisplay = this.articleList.filter(elem => elem.groupCode === this.selectedGroupCode);
    }
    if (this.selectedCategoryCode) {
      this.articleListDisplay = this.articleList.filter(elem => elem.categoryCode === this.selectedCategoryCode);
      }
  }
}
