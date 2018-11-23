import { Injectable } from '@angular/core';
import { Utils } from './utils.service';

@Injectable()
export class DataKeeperService {

  private dataToKeep: any;

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

}