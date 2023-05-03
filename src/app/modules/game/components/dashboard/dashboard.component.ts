import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gameMode = 1;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.selectGame1();
  }

  selectGame1(): any{
    this.gameMode = 1;
    document.getElementById('game-1')!.style.backgroundColor='rgb(240, 236, 13)';
    document.getElementById('game-2')!.style.backgroundColor='rgb(182, 179, 40)';
    document.getElementById('game-3')!.style.backgroundColor='rgb(182, 179, 40)';
  }

  selectGame2(): any{
    this.gameMode = 2;
    document.getElementById('game-1')!.style.backgroundColor='rgb(182, 179, 40)';
    document.getElementById('game-2')!.style.backgroundColor='rgb(240, 236, 13)';
    document.getElementById('game-3')!.style.backgroundColor='rgb(182, 179, 40)';
  }

  selectGame3(): any{
    this.gameMode = 3;
    document.getElementById('game-1')!.style.backgroundColor='rgb(182, 179, 40)';
    document.getElementById('game-2')!.style.backgroundColor='rgb(182, 179, 40)';
    document.getElementById('game-3')!.style.backgroundColor='rgb(240, 236, 13)';
  }

}
