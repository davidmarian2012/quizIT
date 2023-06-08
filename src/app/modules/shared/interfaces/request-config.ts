import { HttpMethods } from '../enums/http-methods';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestConfig {
  method: HttpMethods;
  url: string;
  options?: {
    body?: any;
    headers?: HttpHeaders;
    params?: HttpParams;
  };
}
