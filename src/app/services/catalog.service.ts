import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

/**
 * @description
 * @class
 */
@Injectable()
export class CatalogService {

  public units: any;
  public categories: any;

  constructor(private apiService: ApiService) {
    this.loadCatalogs();
  }

  public loadCatalogs() {
    this.apiService.getUnits().subscribe((result: any) => {
      this.units = result;
    }, error => {});

    this.apiService.getCategories().subscribe((result: any) => {
      this.categories = result;
    }, error => {});
  }

}
