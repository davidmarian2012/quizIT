import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.selectGame1();
  }

  selectGame1(): any{
    document.getElementById('middle-space')!.style.background="url('../../../../../assets/b.png')";
    document.getElementById('game-1')!.style.backgroundColor='rgb(65, 106, 121)';
    document.getElementById('game-2')!.style.backgroundColor='rgb(38, 58, 65)';
    document.getElementById('game-3')!.style.backgroundColor='rgb(38, 58, 65)';
  }

  selectGame2(): any{
    document.getElementById('middle-space')!.style.background="url('../../../../../assets/b.png')";
    document.getElementById('game-1')!.style.backgroundColor='rgb(38, 58, 65)';
    document.getElementById('game-2')!.style.backgroundColor='rgb(65, 106, 121)';
    document.getElementById('game-3')!.style.backgroundColor='rgb(38, 58, 65)';
  }

  selectGame3(): any{
    document.getElementById('middle-space')!.style.background="url('../../../../../assets/logo.png')";
    document.getElementById('game-1')!.style.backgroundColor='rgb(38, 58, 65)';
    document.getElementById('game-2')!.style.backgroundColor='rgb(38, 58, 65)';
    document.getElementById('game-3')!.style.backgroundColor='rgb(65, 106, 121)';
  }

}
