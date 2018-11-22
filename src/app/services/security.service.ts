import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


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

  constructor(private http: HttpClient) {
    this.token = null;
   }

   getLogin( body: any ): Observable<any> {
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
          observer.next(true);
          observer.complete();
        }, error => {
          this.token = '';
          this.userRights = '';
          this.userRole = '';
          this.userName = '';
          this.userLogged = false;
          observer.next(false);
          observer.complete();
        }); });
    return obs;
  }

  public getToken(): any {
    return this.token;
  }

  public isLogged(): Boolean {
    return this.userLogged;
  }

}
