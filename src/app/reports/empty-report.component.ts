import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-report',
  templateUrl: './empty-report.component.html'
})

export class EmptyReportComponent implements OnInit {

  constructor( private router: Router) {

  }

  ngOnInit() {

  }

  clickButton() {
    this.router.navigate(['../userlogin']);
  }
}
