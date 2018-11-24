import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


/**
 * @description
 * @class
 */
@Injectable()
export class SecurityService {

  private userLogged: Boolean;
  private userName: String = '';
  private userRights: String = '';
  private userRole: String = '';
  private token: String = '';

  constructor(private http: HttpClient,
              private router: Router) {
    this.getDataToLocalStorage();
   }

   private getLogin( body: any ): Observable<any> {
        const obs = new Observable( observer => {
          this.http.post('/api/user/login', body, {
              headers: new HttpHeaders().set('Content-Type', 'application/json'),
              observe: 'response' }).subscribe((response: any) => {
                  observer.next(response.body);
                  observer.complete();
              }, error => {
                  observer.error(error);
              }
              );
      });
      return obs;
   }

  public userLogin(user: String, password: String): Observable<any> {
    const obs = new Observable( observer => {
        this.getLogin({ username: user, password: password }).subscribe((response: any) => {
          this.token = response.token;
          this.userRights = response.rights;
          this.userRole = response.role;
          this.userName = response.name;
          this.userLogged = true;
          this.setDataToLocalStorage();
          observer.next(true);
          observer.complete();
        }, error => {
          this.token = '';
          this.userRights = '';
          this.userRole = '';
          this.userName = '';
          this.userLogged = false;
          this.setDataToLocalStorage();
          observer.next(false);
          observer.complete();
        }); });
    return obs;
  }

  public userLogOff() {
    this.token = '';
    this.userRights = '';
    this.userRole = '';
    this.userName = '';
    this.userLogged = false;
    this.setDataToLocalStorage();
    this.router.navigate(['../userlogin']);
  }

  private getDataToLocalStorage() {
    if (localStorage.getItem('userName')) { this.userName = localStorage.getItem('userName'); }
    if (localStorage.getItem('userRights')) { this.userRights = localStorage.getItem('userRights'); }
    if (localStorage.getItem('userRole')) { this.userRole = localStorage.getItem('userRole'); }
    if (localStorage.getItem('token')) { this.token = localStorage.getItem('token'); }
  }

  private setDataToLocalStorage() {
    localStorage.setItem('userName', this.userName.valueOf());
    localStorage.setItem('userRights', this.userRights.valueOf());
    localStorage.setItem('userRole', this.userRole.valueOf());
    localStorage.setItem('token', this.token.valueOf());
  }

  public getToken(): any {
    return this.token;
  }

  public getUserName(): any {
    return this.userName;
  }

  public getUserRole(): any {
    return this.userRole;
  }

  public isLogged(): Boolean {
    return this.userLogged;
  }

}
