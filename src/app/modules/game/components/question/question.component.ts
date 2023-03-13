import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectAnswer1(): any{
    document.getElementById('answer-1')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
    document.getElementById('answer-2')!.style.backgroundColor='transparent';
    document.getElementById('answer-3')!.style.backgroundColor='transparent';
    document.getElementById('answer-4')!.style.backgroundColor='transparent';
  }

  selectAnswer2(): any{
    document.getElementById('answer-1')!.style.backgroundColor='transparent';
    document.getElementById('answer-2')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
    document.getElementById('answer-3')!.style.backgroundColor='transparent';
    document.getElementById('answer-4')!.style.backgroundColor='transparent';
  }

  selectAnswer3(): any{
    document.getElementById('answer-1')!.style.backgroundColor='transparent';
    document.getElementById('answer-2')!.style.backgroundColor='transparent';
    document.getElementById('answer-3')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
    document.getElementById('answer-4')!.style.backgroundColor='transparent';
  }

  selectAnswer4(): any{
    document.getElementById('answer-1')!.style.backgroundColor='transparent';
    document.getElementById('answer-2')!.style.backgroundColor='transparent';
    document.getElementById('answer-3')!.style.backgroundColor='transparent';
    document.getElementById('answer-4')!.style.backgroundColor='rgba(131, 177, 130, 0.3)';
  }

}
