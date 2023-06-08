import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestionService } from 'src/app/modules/core/services/question.service';
import { GameService } from '../../services/game.service';
import { Question } from '../../enums/question.enum';

@Component({
  selector: 'app-game-round',
  templateUrl: './game-round.component.html',
  styleUrls: ['./game-round.component.css'],
})
export class GameRoundComponent implements OnInit {
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

  public multiAnswerQuestions$: Observable<any>;
  public randomizedMultiAnswerQuestions$: Observable<any>;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private gameService: GameService
  ) {
    this.multiQuestions = [];
    this.numQuestions = [];

    this.multiAnswers = [];
    this.numAnswers = [];

    this.numericalQuestions$ = this.questionService.getAllNumericalQuestions();
    this.multiAnswerQuestions$ = this.questionService.getAllMultiQuestions();

    this.randomizedNumericalQuestions$ = this.numericalQuestions$.pipe(
      map((numericalQuestions) => {
        const randomValues: any[] = [];

        while (randomValues.length < Question.classic_num_of_numerical) {
          const randomIndex = Math.floor(
            Math.random() * numericalQuestions.length
          );
          if (!randomValues.includes(numericalQuestions[randomIndex])) {
            randomValues.push(numericalQuestions[randomIndex]);
            this.numQuestions.push(numericalQuestions[randomIndex]);
          }
        }
        return randomValues;
      })
    );

    this.randomizedMultiAnswerQuestions$ = this.multiAnswerQuestions$.pipe(
      map((mutltiAnswerQuestions) => {
        const randomValues: any[] = [];

        while (randomValues.length < Question.classic_num_of_multi) {
          const randomIndex = Math.floor(
            Math.random() * mutltiAnswerQuestions.length
          );
          if (!randomValues.includes(mutltiAnswerQuestions[randomIndex])) {
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

  submitAnswer(): any {
    if (this.questionNumber < Question.classic_num_of_multi) {
      if (this.gameService.selectedAnswer === this.gameService.answer) {
        this.correctMulti += 1;
        this.gameService.correctMulti += 1;
      }

      this.multiAnswers.push(this.gameService.selectedAnswer);
      this.questionNumber += 1;
      this.gameService.questionNumber += 1;
      this.ngOnInit();
    } else if (
      this.questionNumber <
        Question.classic_num_of_multi + Question.classic_num_of_numerical &&
      this.questionNumber >= Question.classic_num_of_multi
    ) {
      let input = document.getElementById(
        'numerical-answer'
      ) as HTMLInputElement;

      if (this.gameService.answer === input.value.toString()) {
        this.correctNumerical += 1;
        this.gameService.correctNumerical += 1;
      }

      this.numAnswers.push(input.value.toString());
      this.questionNumber += 1;
      this.gameService.questionNumber += 1;
      this.ngOnInit();
    } else {
      this.earnedPoints = this.correctMulti * 0.3 + this.correctNumerical * 0.8;
      this.updatePoints();
      this.gameService.questionNumber = 0;
      this.router.navigate(['/dashboard']);
    }
    this.gameService.selectedAnswer = '';
  }

  updatePoints() {
    const username = sessionStorage.getItem('username') as string;

    this.gameService.updatePoints(username, this.earnedPoints).subscribe(
      () => {
        console.log(3);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRange(count: number): number[] {
    return Array(count)
      .fill(0)
      .map((_, index) => index);
  }
}
