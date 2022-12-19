import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpMethods } from '../../shared/enums/http-methods';
import { HttpService } from '../../shared/services/http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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

  login(userInput: any): Observable<any>{
    const newUser = {
      "username": userInput.username,
      "password": userInput.password,
      "email": userInput.email
    }

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/login',
      options: {
        body: newUser
      }
    });

    // await fetch("http://localhost:8080/user/login", {
    //   method: "POST",
    //   body: JSON.stringify(newUser),
    //   headers: {"Content-Type": "application/json"}
    // })
  }
}
