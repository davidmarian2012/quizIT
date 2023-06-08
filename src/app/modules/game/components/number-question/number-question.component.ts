import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-number-question',
  templateUrl: './number-question.component.html',
  styleUrls: ['./number-question.component.css'],
})
export class NumberQuestionComponent implements OnInit {
  @Input() title: string = '';
  @Input() answer: number = 0;

  selectedAnswer: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.answer = this.answer.toString();
  }

  submitAnswer(): void {
    let input = document.getElementById('numerical-answer') as HTMLInputElement;

    this.selectedAnswer = input.value;
    this.gameService.selectedAnswer = input.value;
  }

  preventEnterKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
