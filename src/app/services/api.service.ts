import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

/**
 * @description
 * @class
 */
@Injectable()
export class ApiService {

  constructor(private messageService: MessageService) {
  }

  getUnits() {
    return this.messageService.getRequest('/api/catalog/units');
  }

  getCategories() {
    return this.messageService.getRequest('/api/catalog/categories');
  }

  getMonthlyType() {
    return this.messageService.getRequest('/api/catalog/mounthly-type');
  }

  getMonthlyAllowedUnits(id: Number) {
    return this.messageService.getRequest('/api/monthly/allowed/' + String(id));
  }

  sendDateLunareUpdate(toSendList: any) {
    return this.messageService.postRequest('/api/monthly/update', toSendList);
  }

  getMonthlyByMonthAndTypeId(month: any, type_id: any) {
    return this.messageService.getRequest('/api/monthly/get/' + String(month) + '/' + String(type_id));
  }

}
