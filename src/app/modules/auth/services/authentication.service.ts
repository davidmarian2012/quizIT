import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpMethods } from '../../shared/enums/http-methods';
import { HttpService } from '../../shared/services/http.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from '../components/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<User>;
  userSubject: BehaviorSubject<User>;
  token: string = '';

  constructor(private httpService: HttpService, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(this.getDecodedAccessToken());
    this.user = this.userSubject.asObservable();
   }

  get userValue(): User {
    return this.userSubject.value;
  }

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
    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/login',
      options: {
        body: {username: username, password: password}
      }
     }
    ).pipe(map(authResult => {

      sessionStorage.setItem('token', authResult.token);
      this.token = authResult.token;

      let user = this.getDecodedAccessToken();
      this.userSubject.next(user);
      
      return user;
    }));
  }

  getDecodedAccessToken(): any {
    try {
      return jwtDecode(this.token);
    } catch (Error) {
      return null;
    }
  }

}
