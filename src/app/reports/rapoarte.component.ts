import { ApiService } from './../services/api.service';
import { CatalogService } from './../services/catalog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rapoarte',
  templateUrl: './rapoarte.component.html',
  styleUrls: ['./rapoarte.component.scss']
})

export class RapoarteComponent implements OnInit {

  public rapportList: any;
  public selectedRapportCode: any = '';
  public displayList: any;

  constructor(private catalogService: CatalogService,
              private apiService: ApiService) {

  }

  ngOnInit() {
    this.catalogService.getRapports().subscribe((result: any) => {
      this.rapportList = result;
    });

  }

  selectRapport() {
    if (this.selectedRapportCode !== '') {
      this.apiService.readRapports(this.selectedRapportCode).subscribe((result: any) => {
        this.displayList = result;
      });
    }
  }

  doExport() {
    if (this.selectedRapportCode !== '') {
      this.apiService.exportRapports(this.selectedRapportCode).subscribe((result: any) => {
      });
    }
  }


}
