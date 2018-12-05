import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { SimplemodalComponent } from '../utils/simplemodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-menu.component.scss']
})

export class AdminUserComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private apiService: ApiService,
    private catalogService: CatalogService) {

}

  ngOnInit() {

  }
}
