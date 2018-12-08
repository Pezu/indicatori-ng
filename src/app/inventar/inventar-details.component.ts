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
  public code: any;
  public name: any;

  constructor(private apiService: ApiService,
              public activeModal: NgbActiveModal) {

 }

  ngOnInit() {
    this.apiService.getFixedDetails(this.id).subscribe((response: any) => {
      this.displayList = response.fixed;
      let counter = 0;
      while (counter < this.displayList.length) {
        const d = new Date( this.displayList[counter].createdAt );
        this.displayList[counter].createdAt = d.getDate() + '-' +
                                              (d.getMonth() + 1) + '-' +
                                              d.getFullYear() + ' ' +
                                              d.getHours() + ':' +
                                              d.getMinutes();
        if (d.getDate() < 10) { this.displayList[counter].createdAt = '0' + this.displayList[counter].createdAt; }
        counter++;
      }
    });
  }

  cancel() {
    this.activeModal.close();
  }
}
