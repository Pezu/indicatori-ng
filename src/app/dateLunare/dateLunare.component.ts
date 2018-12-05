import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { CatalogService } from '../services/catalog.service';
import { DataKeeperService } from '../services/datakeeper.service';
import { SimplemodalComponent } from '../utils/simplemodal.component';
@Component({
  selector: 'app-datelunare',
  templateUrl: './dateLunare.component.html',
  styleUrls: ['./dateLunare.component.scss']
})

export class DatelunareComponent implements OnInit {

  public responseList: any[] = [];
  public monthlyTypeList: any[];
  public domainList: any[] = [];
  public monthlyTypeId: Number = 0;
  public selectedMonth: String;

  constructor(private modalService: NgbModal,
              private apiService: ApiService,
              private catalogService: CatalogService,
              private dataKeeper: DataKeeperService) {
                this.dataKeeper.listen().subscribe((message: any) => {
                  if (message === 'selectedMonthChange') { this.initialState(); }
              });
  }

  ngOnInit() {
    this.initialState();
  }

  initialState() {
    this.responseList = [];
    this.domainList = [];
    this.monthlyTypeId = 0;
    this.selectedMonth = this.dataKeeper.getData('selectedMonth');
    this.catalogService.getMonthlyType().subscribe((response: any) => {
      this.monthlyTypeList = response;
    });
    this.getStroredData();
  }

  getStroredData() {
    this.apiService.getMonthlyByMonthAndTypeId(this.selectedMonth, this.monthlyTypeId).subscribe((response: any) => {
      let counter = 0;
      while (counter < this.domainList.length) {
        for (const respelem of response) {
          if (Number(this.domainList[counter].unitId) === Number(respelem.unitId)) {
            this.domainList[counter].value = respelem.value;
           }}
      counter++;
      }
    });
  }

  changeMonthlyType() {
    this.domainList = [];
    this.apiService.getMonthlyAllowedUnits(this.monthlyTypeId).subscribe((response: any) => {
      for (const elem of response) {
        this.domainList.push({name: elem.name, value: 0, unitId: elem.id, typeId: this.monthlyTypeId, month: this.selectedMonth});
      }
      this.getStroredData();
    });
  }

  doSave() {
    const output = [];
    for (const elem of this.domainList) {
      output.push({value: elem.value, unitId: elem.unitId, typeId: elem.typeId, month: this.selectedMonth});
    }
    this.apiService.sendDateLunareUpdate(output).subscribe((result) => {
      const modalRef = this.modalService.open(SimplemodalComponent);
        modalRef.componentInstance.title = 'Salvare Date';
        modalRef.componentInstance.message = 'Date lunare salvate cu succes';
    }, error => {
      const modalRef = this.modalService.open(SimplemodalComponent);
        modalRef.componentInstance.title = 'Salvare Date';
        modalRef.componentInstance.message = 'Eroare la salvarea datelor';
    });
  }
}
