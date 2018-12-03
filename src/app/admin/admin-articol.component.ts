import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-admin-articol',
  templateUrl: './admin-articol.component.html',
  styleUrls: ['./admin-articol.component.scss']
})

export class AdminArticolComponent implements OnInit {

  public groupList: any[];
  public categoryList: any[];
  public categoryListDisplay: any[];
  public selectedGroupCode: String = '';
  public selectedCategoryCode: String = '';

  constructor(private catalogService: CatalogService) {

  }

  ngOnInit() {
    this.readData();
  }

  readData() {
    this.catalogService.getGroups().subscribe((response: any) => {
      this.groupList = response;
      console.log(response);
    });
    this.catalogService.getCategories().subscribe((response: any) => {
      this.categoryList = response;
      this.categoryListDisplay = this.categoryList;
      console.log(response);
    });
  }

  selectGroupOrCategory(type: Boolean) {
    if (type) {
      this.selectedCategoryCode = '';
    } else {
      for (const elem of this.categoryList) {if (elem.code === this.selectedCategoryCode) { this.selectedGroupCode = elem.group.code; }}
    }
    this.categoryListDisplay = this.categoryList;
    if (this.selectedGroupCode !== '') {
      this.categoryListDisplay = this.categoryList.filter(elem => elem.group.code === this.selectedGroupCode);
    }
  }
}
