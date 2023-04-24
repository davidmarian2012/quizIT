import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-multi-question',
  templateUrl: './multi-question.component.html',
  styleUrls: ['./multi-question.component.css']
})
export class MultiQuestionComponent implements OnInit {

  loading: boolean = false;
  success: boolean = false;

  constructor(private router: Router, private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    question: new FormControl('', [
      Validators.required
    ]),
    firstanswer: new FormControl('', [
      Validators.required
    ]),
    secondanswer: new FormControl('', [
      Validators.required
    ]),
    thirdanswer: new FormControl('', [
      Validators.required
    ]),
    fourthanswer: new FormControl('', [
      Validators.required
    ]),
    correctanswer: new FormControl('', [
      Validators.required
    ])
  })

  addQuestion(): void{
    if(this.form.valid) {
      this.loading = true;
      const question = {question: this.form.get('question')!.value!, answers: [this.form.get('firstanswer')!.value!, this.form.get('secondanswer')!.value!, this.form.get('thirdanswer')!.value!, this.form.get('fourthanswer')!.value!], correct: this.form.get('correctanswer')!.value! };

      this.questionService.saveMultiQuestion(question)
      .pipe(first()).subscribe(
        () => {
          this.success = true;
          this.loading = false;
          this.form.reset();
        }
      );
    }
  }
}
