import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  constructor(private catalogService: CatalogService ) {

  }

  ngOnInit() {
  this.catalogService.loadCatalogs();
  }

  hasRight(right: String): Boolean {
    return true;
  }
}

