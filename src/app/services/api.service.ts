import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import UriType from '../interfaces/uri-type';

let baseUrl = ''

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    baseUrl = environment.baseUrl;
  }

  get(uri: UriType): Observable<any> {
    const url = `${baseUrl}/${uri}`;
    return this.http.get(url).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  post(uri: UriType, data: any): Observable<any> {
    const url = `${baseUrl}/${uri}`;
    return this.http.post(url, data).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  delete(uri: UriType, id: string): Observable<any> {
    const url = `${baseUrl}/${uri}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  patch(uri: UriType, body: any, id: string): Observable<any> {
    const url = `${baseUrl}/${uri}/${id}`;
    return this.http.patch(url, body).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  handleError(error: any) {
    switch (error.status) {
      case 300:
        break;

      case 400:
        break;

      case 404:
        break;

      case 500:
        break;

      default:
        break;
    }
    return throwError(() => error);
  }
}
