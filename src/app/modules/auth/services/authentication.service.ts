import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpMethods } from '../../shared/enums/http-methods';
import { HttpService } from '../../shared/services/http.service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from '../components/interfaces/user';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
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
    const editedUsername = userInput.username.toLowerCase();

    const newUser = {
      username: editedUsername,
      password: userInput.password,
      email: userInput.email,
    };

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user',
      options: {
        body: newUser,
      },
    });
  }

  login(username: any, password: any): Observable<any> {
    return this.httpService
      .dispatchData({
        method: HttpMethods.Post,
        url: '/user/login',
        options: {
          body: { username: username.toLowerCase(), password: password },
        },
      })
      .pipe(
        map((authResult) => {
          sessionStorage.setItem('username', username.toLowerCase());
          sessionStorage.setItem('token', authResult.token);
          sessionStorage.setItem('hiddenChat', 'false');
          this.token = authResult.token;

          let user = this.getDecodedAccessToken();
          this.userSubject.next(user);

          return user;
        })
      );
  }

  resetPassword(
    username: any,
    oldpassword: any,
    newpassword: any
  ): Observable<any> {
    return this.httpService
      .dispatchData({
        method: HttpMethods.Post,
        url: '/user/resetpassword',
        options: {
          body: {
            username: username.toLowerCase(),
            oldpassword: oldpassword,
            newpassword: newpassword,
          },
        },
      })
      .pipe(
        map((resetResult) => {
          console.log(resetResult);
        })
      );
  }

  getDecodedAccessToken(): any {
    try {
      return jwtDecode(this.token);
    } catch (Error) {
      return null;
    }
  }

  getAllUsers(): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Get,
      url: '/user',
      options: {},
    });
  }

  getAllUsersByPoints(): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Get,
      url: '/user/usersbypoints',
      options: {},
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/username',
      options: {
        body: {
          username: username,
        },
      },
    });
  }

  upload(username: string, avatar: File | undefined): Observable<any> {
    let fd = new FormData();

    fd.append('username', username);
    fd.append('avatar', avatar!);

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/upload',
      options: {
        body: fd,
      },
    });
  }

  removeAvatar(username: string): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/removeAvatar',
      options: {
        body: {
          username: username,
        },
      },
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/forgot-password',
      options: {
        body: {
          email: email,
        },
      },
    });
  }
}
