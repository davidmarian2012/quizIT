import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestConfig } from '../interfaces/request-config';
 
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private baseUrl = 'http://127.0.0.1:8080';  
 
  constructor(private httpClient: HttpClient) { }
 
  dispatchData(config: RequestConfig): Observable<any> {
    return this.httpClient.request(
      config.method,
         this.baseUrl+config.url,
      {...config.options}
    ).pipe(retry(1), catchError(this.handleError));
  }
 
  handleError(error: any): Observable<never> {
    let errorMessage = {
      message: '',
      errors: ''
    };
 
    if(error.error instanceof ErrorEvent) {
      errorMessage.message = error.error.message;
    } else {
      if(error.error.errors) errorMessage.errors = error.error.errors;
 
      errorMessage.message = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
 
    return throwError(() => {
      return errorMessage;
    });
  }
}