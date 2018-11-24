import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SecurityService} from './security.service';
import {Router} from '@angular/router';

@Injectable()
export class MessageService {

    constructor( private http: HttpClient,
                 private securityService: SecurityService,
                 private router: Router) {}

    getRequest(getURL: string): Observable<any> {
        const obs = new Observable( observer => {
            this.http.get(getURL, {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Token', String(this.securityService.getToken())),
                observe: 'response' }).subscribe((response: any) => {
                    observer.next(response.body);
                    observer.complete();
                }, error => {
                    if (error.error.status === 1001) { this.router.navigate(['../userlogin']); }
                    observer.error(error);
                }
                );
        });

        return obs;

    }

    deleteRequest(getURL: string): Observable<any> {
        const obs = new Observable( observer => {
            this.http.delete(getURL, {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Token', String(this.securityService.getToken())),
                observe: 'response' }).subscribe((response: any) => {
                    observer.next(response.body);
                    observer.complete();
                }, error => {
                    if (error.error.status === 1001) { this.router.navigate(['../userlogin']); }
                    observer.error(error);
                }
                );
        });
        return obs;
    }

    postRequest(getURL: string, body: any): Observable<any> {
        const obs = new Observable( observer => {
            this.http.post(getURL, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Token', String(this.securityService.getToken())),
                observe: 'response' }).subscribe((response: any) => {
                    observer.next(response.body);
                    observer.complete();
                }, error => {
                    if (error.error.status === 1001) { this.router.navigate(['../userlogin']); }
                    observer.error(error);
                }
                );
        });
        return obs;
    }

    putRequest(getURL: string, body: any): Observable<any> {
      const obs = new Observable( observer => {
          this.http.put(getURL, body, {
              headers: new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Token', String(this.securityService.getToken())),
              observe: 'response' }).subscribe((response: any) => {
                  observer.next(response.body);
                  observer.complete();
              }, error => {
                  if (error.error.status === 1001) { this.router.navigate(['../userlogin']); }
                  observer.error(error);
              }
              );
      });
      return obs;
  }

}
