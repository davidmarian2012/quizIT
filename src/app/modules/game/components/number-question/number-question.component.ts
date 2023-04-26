import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-question',
  templateUrl: './number-question.component.html',
  styleUrls: ['./number-question.component.css']
})
export class NumberQuestionComponent implements OnInit {

  @Input() title: string = "";
  @Input() answer: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  submitAnswer(): void{
    let input = document.getElementById('numerical-answer') as HTMLInputElement;
    let user_input = Number(input.value);
    if(user_input === this.answer){
      console.log("Correct!");
    }
    else{
      console.log("Wrong!");
    }
    // this.router.navigate(['/q']);
  }

}
