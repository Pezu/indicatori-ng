import { Injectable } from '@angular/core';
import { Utils } from './utils.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DataKeeperService {

  private dataToKeep: any;
  private messageSharing = new Subject<any>();

  constructor( ) {
    this.dataToKeep = new Map;
  }

  public storeData( name: String, data: any ) {
      const storeName = Utils.cloneObject(name);
      const storeData = Utils.cloneObject(data);
      this.dataToKeep.set(storeName, storeData);
  }

  public getData( name: String ): any {
    return this.dataToKeep.get(name);
  }


  listen(): Observable<any> {
     return this.messageSharing.asObservable();
  }

  shareMessage(messageTo: string) {
     this.messageSharing.next(messageTo);
  }

}