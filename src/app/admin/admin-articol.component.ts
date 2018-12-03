import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { SimplemodalComponent } from '../utils/simplemodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-articol',
  templateUrl: './admin-articol.component.html',
  styleUrls: ['./admin-menu.component.scss']
})

export class AdminArticolComponent implements OnInit {

  public groupList: any[];
  public categoryList: any[];
  public categoryListDisplay: any[];
  public selectedGroupId: Number = 0;
  public selectedCategoryId: Number = 0;
  public canAddArticle: Boolean = false;
  public articleName: String = '';

  constructor(private modalService: NgbModal,
              private apiService: ApiService,
              private catalogService: CatalogService) {

  }

  ngOnInit() {
    this.readData();
  }

  readData() {
    this.catalogService.getGroups().subscribe((response: any) => {
      this.groupList = response;
    });
    this.catalogService.getCategories().subscribe((response: any) => {
      this.categoryList = response;
    });
  }

  selectGroup() {
    this.canAddArticle = false;
    this.selectedCategoryId = 0;
    if (Number(this.selectedGroupId) !== 0) {
      this.categoryListDisplay = this.categoryList.filter(elem => Number(elem.group.id) === Number(this.selectedGroupId));
    } else {
      this.categoryListDisplay = [];
    }
  }

  selectCategory() {
    if (Number(this.selectedCategoryId) !== 0) {
        this.canAddArticle = true;
      } else {
        this.canAddArticle = false;
      }
  }

  valid(): Boolean {
    console.log('valid');
    if (this.articleName === '') { console.log('false'); return false; }
    return true;
  }

  doSave() {
    this.apiService.sendNewArticle({
          name: this.articleName,
          groupId: this.selectedGroupId,
          categoryId: this.selectedCategoryId
        }).subscribe((response: any) => {
              const modalRef = this.modalService.open(SimplemodalComponent);
              modalRef.componentInstance.title = 'Salvare Articol';
              modalRef.componentInstance.message = 'Articol salvat cu succes';
          }, error => {
            const modalRef = this.modalService.open(SimplemodalComponent);
              modalRef.componentInstance.title = 'Salvare Articol';
              modalRef.componentInstance.message = 'A survenit o eroare la salvare';
          });
    console.log(this.articleName);
  }
}
