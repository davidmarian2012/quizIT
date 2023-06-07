import { Component, OnInit } from '@angular/core';
import { Question } from '../../enums/question.enum';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/modules/core/services/question.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-war-game-round',
  templateUrl: './war-game-round.component.html',
  styleUrls: ['./war-game-round.component.css']
})
export class WarGameRoundComponent implements OnInit {
  
  questionNumber = 0;
  correctMulti = 0;
  earnedPoints = 0;

  public multiAnswerQuestions$: Observable<any>;
  public randomizedMultiAnswerQuestions$: Observable<any>;

  constructor(private router: Router, private questionService: QuestionService, private gameService: GameService) { 

    this.multiAnswerQuestions$ = this.questionService.getAllMultiQuestions();

    this.randomizedMultiAnswerQuestions$ = this.multiAnswerQuestions$.pipe(
      map(mutltiAnswerQuestions => {
        const randomValues: any[] = [];
        
        while(randomValues.length <= Question.war_num_of_multi) {
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
    if(this.questionNumber < Question.war_num_of_multi) {

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
