import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-datelunare',
  templateUrl: './dateLunare.component.html',
  styleUrls: ['./dateLunare.component.scss']
})

export class DatelunareComponent implements OnInit {

  public monthlyTypeList: any[];
  public monthlyTypeId: Number = 0;

  constructor(private apiService: ApiService,
              private catalogService: CatalogService) {

  }

  ngOnInit() {
    this.catalogService.getMonthlyType().subscribe((response: any) => {
      this.monthlyTypeList = response;
    });
  }
}
