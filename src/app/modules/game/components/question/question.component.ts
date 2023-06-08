import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input() title: string = '';
  @Input() answers: string[] = [];
  @Input() answer: string = '';

  selectedAnswer: string = '';

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.answer = this.answer;
  }

  selectAnswer1(): any {
    this.selectedAnswer = this.answers[0];
    this.gameService.selectedAnswer = this.answers[0];

    document.getElementById('answer-1')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.500)';
    document.getElementById('answer-2')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-3')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-4')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
  }

  selectAnswer2(): any {
    this.selectedAnswer = this.answers[1];
    this.gameService.selectedAnswer = this.answers[1];

    document.getElementById('answer-1')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-2')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.500)';
    document.getElementById('answer-3')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-4')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
  }

  selectAnswer3(): any {
    this.selectedAnswer = this.answers[2];
    this.gameService.selectedAnswer = this.answers[2];

    document.getElementById('answer-1')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-2')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-3')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.500)';
    document.getElementById('answer-4')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
  }

  selectAnswer4(): any {
    this.selectedAnswer = this.answers[3];
    this.gameService.selectedAnswer = this.answers[3];

    document.getElementById('answer-1')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-2')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-3')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.082)';
    document.getElementById('answer-4')!.style.backgroundColor =
      'rgba(223, 236, 34, 0.500)';
  }

  submitAnswer(): any {
    if (this.selectedAnswer === this.answer) {
      console.log('Correct!');
    } else {
      console.log('Wrong!');
    }

    this.gameService.questionNumber += 1;
    this.ngOnInit();
  }
}
