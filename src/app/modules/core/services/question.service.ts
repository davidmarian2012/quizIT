import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpMethods } from '../../shared/enums/http-methods';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpService: HttpService, private router: Router) {}

  saveMultiQuestion(receivedInput: any): Observable<any> {
    const newQuestion = {
      question: receivedInput.question,
      answers: receivedInput.answers,
      correct: receivedInput.correct,
    };

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/multiquestion',
      options: {
        body: newQuestion,
      },
    });
  }

  saveNumericalQuestion(receivedInput: any): Observable<any> {
    const newQuestion = {
      question: receivedInput.question,
      answer: receivedInput.answer,
    };

    return this.httpService.dispatchData({
      method: HttpMethods.Post,
      url: '/numericalquestion',
      options: {
        body: newQuestion,
      },
    });
  }

  getAllMultiQuestions(): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Get,
      url: '/multiquestion',
      options: {},
    });
  }

  getAllNumericalQuestions(): Observable<any> {
    return this.httpService.dispatchData({
      method: HttpMethods.Get,
      url: '/numericalquestion',
      options: {},
    });
  }
}
