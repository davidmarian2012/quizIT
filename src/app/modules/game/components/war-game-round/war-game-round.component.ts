import { Component, OnInit } from '@angular/core';
import { Question } from '../../enums/question.enum';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/modules/core/services/question.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-war-game-round',
  templateUrl: './war-game-round.component.html',
  styleUrls: ['./war-game-round.component.css'],
})
export class WarGameRoundComponent implements OnInit {
  questionNumber = 0;
  correctMulti = 0;
  earnedPoints = 0;

  public multiAnswerQuestions$: Observable<any>;
  public randomizedMultiAnswerQuestions$: Observable<any>;

  questions: any[] = [];
  answers: any[] = [];

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private gameService: GameService
  ) {
    this.answers = [];
    this.questions = [];

    this.multiAnswerQuestions$ = this.questionService.getAllMultiQuestions();

    this.randomizedMultiAnswerQuestions$ = this.multiAnswerQuestions$.pipe(
      map((mutltiAnswerQuestions) => {
        const randomValues: any[] = [];

        while (randomValues.length <= Question.war_num_of_multi) {
          const randomIndex = Math.floor(
            Math.random() * mutltiAnswerQuestions.length
          );
          if (!randomValues.includes(mutltiAnswerQuestions[randomIndex])) {
            randomValues.push(mutltiAnswerQuestions[randomIndex]);
            this.questions.push(mutltiAnswerQuestions[randomIndex]);
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
    if (this.questionNumber < Question.war_num_of_multi) {
      if (this.gameService.selectedAnswer === this.gameService.answer) {
        this.correctMulti += 1;
        this.gameService.correctMulti += 1;
      }

      this.answers.push(this.gameService.selectedAnswer);
      this.questionNumber += 1;
      this.gameService.questionNumber += 1;
      this.ngOnInit();
    } else {
      this.earnedPoints = this.correctMulti * 0.3;
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
