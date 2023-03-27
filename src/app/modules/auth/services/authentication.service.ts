import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpMethods } from '../../shared/enums/http-methods';
import { HttpService } from '../../shared/services/http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;

  constructor(private httpService: HttpService, private router: Router) { }

  register(userInput: any): Observable<any> {
    const newUser = {
      "username": userInput.username,
      "password": userInput.password,
      "email": userInput.email
    }

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user',
      options: {
        body: newUser
      }
    });

    // await fetch("http://localhost:8080/user", {
    //   method: "POST",
    //   body: JSON.stringify(newUser),
    //   headers: {"Content-Type": "application/json"}
    // })
  }

  login(username: any, password: any): Observable<any>{

    // const newUser = {
    //   "username": userInput.username,
    //   "password": userInput.password,
    //   "email": userInput.email
    // }

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/login',
      options: {
        body: {username: username, password: password}
      }
    });

    // await fetch("http://localhost:8080/user/login", {
    //   method: "POST",
    //   body: JSON.stringify(newUser),
    //   headers: {"Content-Type": "application/json"}
    // })
  }
}
