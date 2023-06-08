import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestionService } from 'src/app/modules/core/services/question.service';
import { Question } from '../../enums/question.enum';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-practice-game-round',
  templateUrl: './practice-game-round.component.html',
  styleUrls: ['./practice-game-round.component.css']
})
export class PracticeGameRoundComponent implements OnInit {

  public numericalQuestions$: Observable<any>;
  public randomizedNumericalQuestions$: Observable<any>;
  
  questionNumber = 0;

  correctMulti = 0;
  correctNumerical = 0;

  earnedPoints = 0;

  multiQuestions: any[] = [];
  numQuestions: any[] = [];

  multiAnswers: any[] = [];
  numAnswers: any[] = [];

  totalNumerical = 0;
  totalMulti = 0;

  seenMulti = 0;
  seenNumerical = 0;

  public multiAnswerQuestions$: Observable<any>;
  public randomizedMultiAnswerQuestions$: Observable<any>;

  constructor(private router: Router, private questionService: QuestionService, private gameService: GameService) { 

    this.multiQuestions = [];
    this.numQuestions = [];

    this.multiAnswers = [];
    this.numAnswers = [];

    this.numericalQuestions$ = this.questionService.getAllNumericalQuestions();
    this.multiAnswerQuestions$ = this.questionService.getAllMultiQuestions();

    this.randomizedNumericalQuestions$ = this.numericalQuestions$.pipe(
      map(numericalQuestions => {
        const randomValues: any[] = [];
        this.totalNumerical = numericalQuestions.length;

        while(randomValues.length < numericalQuestions.length) {
            const randomIndex = Math.floor(Math.random() * numericalQuestions.length);
            if(!randomValues.includes(numericalQuestions[randomIndex])) {
              randomValues.push(numericalQuestions[randomIndex]);
              this.numQuestions.push(numericalQuestions[randomIndex]);
            }
        }
        return randomValues;
      })
    );

    this.randomizedMultiAnswerQuestions$ = this.multiAnswerQuestions$.pipe(
      map(mutltiAnswerQuestions => {
        const randomValues: any[] = [];
        this.totalMulti = mutltiAnswerQuestions.length;

        while(randomValues.length < mutltiAnswerQuestions.length) {
            const randomIndex = Math.floor(Math.random() * mutltiAnswerQuestions.length);
            if(!randomValues.includes(mutltiAnswerQuestions[randomIndex])) {
              randomValues.push(mutltiAnswerQuestions[randomIndex]);
              this.multiQuestions.push(mutltiAnswerQuestions[randomIndex]);
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
    if(this.questionNumber < this.totalMulti) {
      if(this.gameService.selectedAnswer === this.gameService.answer){
        this.correctMulti += 1;
        this.gameService.correctMulti += 1;
      }
  
      this.seenMulti += 1;
      this.multiAnswers.push(this.gameService.selectedAnswer);
      this.questionNumber += 1;
      this.gameService.questionNumber += 1;
      this.ngOnInit();

    } else if (this.questionNumber < this.totalNumerical+this.totalMulti && this.questionNumber >= this.totalMulti) {

      let input = document.getElementById('numerical-answer') as HTMLInputElement;

      if(this.gameService.answer === input.value.toString()){
        this.correctNumerical += 1;
        this.gameService.correctNumerical += 1;
      }

      this.seenNumerical += 1;
      this.numAnswers.push(input.value.toString());
      this.questionNumber += 1;
      this.gameService.questionNumber += 1;
      this.ngOnInit();

    } else {

      this.gameService.questionNumber = 0;
      this.router.navigate(['/dashboard']);

    }
    this.gameService.selectedAnswer = '';
  }

    getRange(count: number): number[] {
      return Array(count).fill(0).map((_, index) => index);
    }

    toResults(): void {
      this.questionNumber = this.totalMulti + this.totalNumerical + 1;
    }

}
