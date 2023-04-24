import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-numerical-question',
  templateUrl: './numerical-question.component.html',
  styleUrls: ['./numerical-question.component.css']
})
export class NumericalQuestionComponent implements OnInit {

  loading: boolean = false;
  success: boolean = false;
  public questions$: Observable<any>;

  constructor(private router: Router, private questionService: QuestionService) { this.questions$ = this.questionService.getAllNumericalQuestions(); }

  ngOnInit(): void {
    this.questions$ = this.questionService.getAllNumericalQuestions();
  }

  form = new FormGroup({
    question: new FormControl('', [
      Validators.required
    ]),
    answer: new FormControl('', [
      Validators.required
    ])
  })

  addQuestion(): void{
    if(this.form.valid) {
      this.loading = true;
      const question = {question: this.form.get('question')!.value!, answer: this.form.get('answer')!.value!};

      this.questionService.saveNumericalQuestion(question)
      .pipe(first()).subscribe(
        () => {
          this.success = true;
          this.loading = false;
          this.form.reset();
          console.log(this.questions$);
        }
      );
    }
  }

}
