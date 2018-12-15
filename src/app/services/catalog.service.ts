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
  private splits: any;
  private loadedSplits: Boolean = false;
  private accounts: any;
  private loadedAccounts: Boolean = false;
  private groups: any;
  private loadedGroups: Boolean = false;
  private monthlyType: any;
  private loadedMonthlyType: Boolean = false;
  private users: any;
  private loadedUsers: Boolean = false;
  private rapportTypes: any;
  private loadedRapportTypes: Boolean = false;

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

  public getSplits(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedSplits) {
        observer.next(this.splits);
        observer.complete();
      } else {
        this.apiService.getSplits().subscribe((result: any) => {
          this.splits = result;
          this.loadedSplits = true;
          observer.next(this.splits);
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

  public getAccounts(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedAccounts) {
        observer.next(this.accounts);
        observer.complete();
      } else {
        this.apiService.getAccounts().subscribe((result: any) => {
          this.accounts = result;
          this.loadedAccounts = true;
          observer.next(this.accounts);
          observer.complete();
        });
      }
    });
    return obs;
  }

  public getUsers(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedUsers) {
        observer.next(this.users);
        observer.complete();
      } else {
        this.apiService.getUsers().subscribe((result: any) => {
          this.users = result;
          this.loadedUsers = true;
          observer.next(this.users);
          observer.complete();
        });
      }
    });
    return obs;
  }

  public getRapports(): Observable<any> {
    const obs = new Observable( observer => {
      if (this.loadedRapportTypes) {
        observer.next(this.rapportTypes);
        observer.complete();
      } else {
        this.apiService.getRapports().subscribe((result: any) => {
          this.rapportTypes = result;
          this.loadedRapportTypes = true;
          observer.next(this.rapportTypes);
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
