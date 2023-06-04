import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestionService } from 'src/app/modules/core/services/question.service';
import { GameService } from '../../services/game.service';
import { Question } from '../../enums/question.enum';

@Component({
  selector: 'app-game-round',
  templateUrl: './game-round.component.html',
  styleUrls: ['./game-round.component.css']
})
export class GameRoundComponent implements OnInit {

  public numericalQuestions$: Observable<any>;
  public randomizedNumericalQuestions$: Observable<any>;
  
  questionNumber = 0;
  hey:string ="hey";

  correctMulti = 0;
  correctNumerical = 0;

  earnedPoints = 0;

  public multiAnswerQuestions$: Observable<any>;
  public randomizedMultiAnswerQuestions$: Observable<any>;

  constructor(private router: Router, private questionService: QuestionService, private gameService: GameService) { 

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
        
        while(randomValues.length <= Question.classic_num_of_multi) {
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
    this.questionNumber = this.gameService.questionNumber;
  }

  submitAnswer(): any{
    if(this.questionNumber < Question.classic_num_of_multi) {

      if(this.gameService.selectedAnswer === this.gameService.answer){
        this.correctMulti += 1;
        this.gameService.correctMulti += 1;
      }
  
      this.questionNumber += 1;
      this.gameService.questionNumber += 1;
      this.ngOnInit();

    } else {

      this.earnedPoints = this.correctMulti * 0.3;
      this.updatePoints();
      this.gameService.questionNumber = 0;
      this.router.navigate(['/dashboard']);

    }
  }

  updatePoints(){
    const username = sessionStorage.getItem('username') as string;
    
    this.gameService.updatePoints(username, this.earnedPoints).subscribe(
      () => {
        console.log(3);
      },
      error => {
        console.log(error);
      }
    );
    }
  
}

