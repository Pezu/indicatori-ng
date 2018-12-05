import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cheltuieli-view',
  templateUrl: './cheltuieli-view.component.html',
  styleUrls: ['./cheltuieli-view.component.scss']
})

export class CheltuieliViewComponent implements OnInit {

  public splitObject: any = {};
  public splitListMap: any;
  public splitListNameMap: any;
  public unitListNameMap: any;
  @Input() exp: any;
  @Input() month: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor( private apiService: ApiService,
               private catalogService: CatalogService,
               public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.splitListMap = new Map;
    this.splitListNameMap = new Map;
    this.unitListNameMap = new Map;
    this.catalogService.getUnits().subscribe((response: any) => {
      for (const elem of response) { this.unitListNameMap.set(elem.id, elem.name); }
      console.log( this.unitListNameMap );
    });
    this.catalogService.getSplits().subscribe((response: any) => {
      for (const elem of response) { this.splitListMap.set(elem.id, elem.code); }
      for (const elem of response) { this.splitListNameMap.set(elem.id, elem.name); }
      this.readData();
    });
  }

  readData() {

     this.apiService.getSplitDetails({
      parentUnitId: this.exp.unitId,
      expenseId: this.exp.id,
      articleId: this.exp.articleId,
      splitCode: this.splitListMap.get(this.exp.splitId),
      splitId: this.exp.splitId,
      month: this.month,
      categoryId: this.exp.categoryId,
      groupId: this.exp.groupId
    }).subscribe((result: any) => {
      this.splitObject = result;
      let counter = 0;
      while (counter < this.splitObject.children.length) {
          if (this.splitObject.children[counter].weight === null) { this.splitObject.children[counter].weight = 0; }
      counter++;
      }
    });
  }


  cancel() {
    this.activeModal.close();
  }



}
