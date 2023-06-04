import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethods } from '../../shared/enums/http-methods';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameMode = 1;
  public questionNumber = 0;
  public selectedAnswer = '';
  public answer = '';

  public correctMulti = 0;
  public correctNumerical = 0;

  constructor(private httpService: HttpService) { 
    this.gameMode = 1;
    this.questionNumber = 0;
    this.selectedAnswer = '';
    this.answer = '';

    this.correctMulti = 0;
    this.correctNumerical = 0;
  }

  updatePoints(username: string, earnedPoints: number): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/user/update',
      options: {
        body: {
          username: username,
          earnedPoints: earnedPoints
        }
      }
    })
  }
}
