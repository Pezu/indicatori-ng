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

  getSplits() {
    return this.messageService.getRequest('/api/catalog/splits');
  }

  getGroups() {
    return this.messageService.getRequest('/api/catalog/groups');
  }

  getGrupaCategorieArticol() {
    return this.messageService.getRequest('/api/catalog/autocomplete');
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

  getPercenatges(articleId: any, unitId: any) {
    return this.messageService.getRequest('/api/expense/percentage/' + String(unitId) + '/' + String(articleId));
  }

  fetchFacturi(output: any) {
    return this.messageService.postRequest('/api/expense/get', output);
  }

  addFacturi(expense: any) {
    return this.messageService.postRequest('/api/expense/insert', expense);
  }

  deleteFacturi(expenseId: any) {
    return this.messageService.getRequest('/api/expense/delete/' + expenseId);
  }

}
