import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() title: string = "";
  @Input() answers: string[] = [];
  @Input() answer: string = "";

  selectedAnswer: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectAnswer1(): any{
    this.selectedAnswer = this.answers[0];

    document.getElementById('answer-1')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
    document.getElementById('answer-2')!.style.backgroundColor='transparent';
    document.getElementById('answer-3')!.style.backgroundColor='transparent';
    document.getElementById('answer-4')!.style.backgroundColor='transparent';
  }

  selectAnswer2(): any{
    this.selectedAnswer = this.answers[1];
    
    document.getElementById('answer-1')!.style.backgroundColor='transparent';
    document.getElementById('answer-2')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
    document.getElementById('answer-3')!.style.backgroundColor='transparent';
    document.getElementById('answer-4')!.style.backgroundColor='transparent';
  }

  selectAnswer3(): any{
    this.selectedAnswer = this.answers[2];
    
    document.getElementById('answer-1')!.style.backgroundColor='transparent';
    document.getElementById('answer-2')!.style.backgroundColor='transparent';
    document.getElementById('answer-3')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
    document.getElementById('answer-4')!.style.backgroundColor='transparent';
  }

  selectAnswer4(): any{
    this.selectedAnswer = this.answers[3];
    
    document.getElementById('answer-1')!.style.backgroundColor='transparent';
    document.getElementById('answer-2')!.style.backgroundColor='transparent';
    document.getElementById('answer-3')!.style.backgroundColor='transparent';
    document.getElementById('answer-4')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
  }

  submitAnswer(): any{
    if(this.selectedAnswer === this.answer){
      console.log("Correct!");
    }
    else{
      console.log("Wrong!");
    }
    // this.router.navigate(['/q2']);
  }

}
