import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observable} from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable()
export class CatalogService {

  private months: any;
  private units: any;
  private loadedUnits: Boolean = false;
  private categories: any;
  private loadedCategories: Boolean = false;
  private groups: any;
  private loadedGroups: Boolean = false;
  private monthlyType: any;
  private loadedMonthlyType: Boolean = false;

  constructor(private apiService: ApiService) {
    this.months = new Map();
    this.months.set(1, 'Ianuarie');
    this.months.set(2, 'Februarie');
    this.months.set(3, 'Martie');
    this.months.set(4, 'Aprilie');
    this.months.set(5, 'Mai');
    this.months.set(6, 'Iunie');
    this.months.set(7, 'Iulie');
    this.months.set(8, 'August');
    this.months.set(9, 'Septembrie');
    this.months.set(10, 'Octombrie');
    this.months.set(11, 'Noiembrie');
    this.months.set(12, 'Decembrie');
  }

  public loadAllCatalogs() {
    this.apiService.getUnits().subscribe((result: any) => {
      this.units = result;
    });

    this.apiService.getCategories().subscribe((result: any) => {
      this.categories = result;
    });
  }

  public getUnits(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedUnits) {
        observer.next(this.units);
        observer.complete();
      } else {
        this.apiService.getUnits().subscribe((result: any) => {
          this.units = result;
          this.loadedUnits = true;
          observer.next(this.units);
          observer.complete();
        });
      }
    });
    return obs;
  }

  public getCategories(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedCategories) {
        observer.next(this.categories);
        observer.complete();
      } else {
        this.apiService.getCategories().subscribe((result: any) => {
          this.categories = result;
          this.loadedCategories = true;
          observer.next(this.categories);
          observer.complete();
        });
      }
    });
    return obs;
  }

  public getGroups(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedGroups) {
        observer.next(this.groups);
        observer.complete();
      } else {
        this.apiService.getGroups().subscribe((result: any) => {
          this.groups = result;
          this.loadedGroups = true;
          observer.next(this.groups);
          observer.complete();
        });
      }
    });
    return obs;
  }

  public getMonthlyType(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedMonthlyType) {
        observer.next(this.monthlyType);
        observer.complete();
      } else {
        this.apiService.getMonthlyType().subscribe((result: any) => {
          this.monthlyType = result;
          this.loadedMonthlyType = true;
          observer.next(this.monthlyType);
          observer.complete();
        });
      }
    });
    return obs;
  }

  public getMonth(x: Number): String {
    return this.months.get(x);
  }

}
