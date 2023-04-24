import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestionService } from 'src/app/modules/core/services/question.service';

@Component({
  selector: 'app-number-question',
  templateUrl: './number-question.component.html',
  styleUrls: ['./number-question.component.css']
})
export class NumberQuestionComponent implements OnInit {

  public numericalQuestions$: Observable<any>;
  public randomizedNumericalQuestions$: Observable<any>;

  constructor(private router: Router, private questionService: QuestionService) { 

    this.numericalQuestions$ = this.questionService.getAllNumericalQuestions();

    this.randomizedNumericalQuestions$ = this.numericalQuestions$.pipe(
      map(numericalQuestions => {
        const randomValues: any[] = [];
        while(randomValues.length < 2) {
          const randomIndex = Math.floor(Math.random() * numericalQuestions.length);
          if(!randomValues.includes(numericalQuestions[randomIndex])) {
            randomValues.push(numericalQuestions[randomIndex]);
          }
        }

        return randomValues;
        
      })
    );

  }

  ngOnInit(): void {
  }

  submitAnswer(): void{
    this.router.navigate(['/q']);
  }

}
