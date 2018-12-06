import { ApiService } from './../services/api.service';
import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventar-details',
  templateUrl: './inventar-details.component.html',
  styleUrls: ['./inventar-details.component.scss']
})

export class InventarDetailsComponent implements OnInit {

  @Input() id: any;
  public displayList: any[];

  constructor(private apiService: ApiService,
              public activeModal: NgbActiveModal) {

 }

  ngOnInit() {
    this.apiService.getFixedDetails(this.id).subscribe((response: any) => {
      this.displayList = response;
      console.log(response);
    });
  }

  cancel() {
    this.activeModal.close();
  }
}
