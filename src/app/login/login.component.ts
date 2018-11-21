import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public username: String;
  public password: String;
  public showAlert: boolean;

  constructor(private securityService: SecurityService,
              private router: Router) {

  }

  ngOnInit() {
    this.showAlert = false;
  }

  closeAlert() {
    this.showAlert = false;
  }

  onSubmit() {
    this.securityService.userLogin(this.username, this.password).subscribe((result: Boolean) => {
      if (result) {
        this.router.navigate(['../home']);
      } else {
        this.showAlert = true;
      }
    });
  }
}
