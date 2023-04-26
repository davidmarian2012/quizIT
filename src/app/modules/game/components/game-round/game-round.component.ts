import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestionService } from 'src/app/modules/core/services/question.service';

@Component({
  selector: 'app-game-round',
  templateUrl: './game-round.component.html',
  styleUrls: ['./game-round.component.css']
})
export class GameRoundComponent implements OnInit {

  public numericalQuestions$: Observable<any>;
  public randomizedNumericalQuestions$: Observable<any>;
  
  hey:string ="hey";

  public multiAnswerQuestions$: Observable<any>;
  public randomizedMultiAnswerQuestions$: Observable<any>;

  constructor(private router: Router, private questionService: QuestionService) { 

    this.numericalQuestions$ = this.questionService.getAllNumericalQuestions();
    this.multiAnswerQuestions$ = this.questionService.getAllMultiQuestions();

    this.randomizedNumericalQuestions$ = this.numericalQuestions$.pipe(
      map(numericalQuestions => {
        const randomValues: any[] = [];
        
        while(randomValues.length < 1) {
            const randomIndex = Math.floor(Math.random() * numericalQuestions.length);
            if(!randomValues.includes(numericalQuestions[randomIndex])) {
              randomValues.push(numericalQuestions[randomIndex]);
            }
        }
        return randomValues;
      })
    );

    this.randomizedMultiAnswerQuestions$ = this.multiAnswerQuestions$.pipe(
      map(mutltiAnswerQuestions => {
        const randomValues: any[] = [];
        
        while(randomValues.length < 1) {
            const randomIndex = Math.floor(Math.random() * mutltiAnswerQuestions.length);
            if(!randomValues.includes(mutltiAnswerQuestions[randomIndex])) {
              randomValues.push(mutltiAnswerQuestions[randomIndex]);
            }
        }
        return randomValues;
      })
    );
  }

  ngOnInit(): void {
  }

}
