import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpMethods } from '../enums/http-methods';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpService: HttpService, private router: Router) { }

  saveMessage(messageInput: any): Observable<any> {
    const newMessage = {
      "author": messageInput.author,
      "content": messageInput.content
    }

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/message',
      options: {
        body: newMessage
      }
    });
  }

  getAllMessages(): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Get,
      url: '/message',
      options: {}
    });
  }
}
