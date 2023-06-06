import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gameMode = 1;

  constructor(private authService: AuthenticationService, private gameService: GameService) { }

  ngOnInit(): void {
    this.selectGame1();
  }

  selectGame1(): any{
    this.gameMode = 1;
    this.gameService.gameMode = 1;
    document.getElementById('game-1')!.style.backgroundColor='rgba(214, 201, 25, 0.403)';
    document.getElementById('game-2')!.style.backgroundColor='rgba(214, 201, 25, 0.103)';
    document.getElementById('game-3')!.style.backgroundColor='rgba(214, 201, 25, 0.103)';
  }

  selectGame2(): any{
    this.gameMode = 2;
    this.gameService.gameMode = 2;
    document.getElementById('game-1')!.style.backgroundColor='rgba(214, 201, 25, 0.103)';
    document.getElementById('game-2')!.style.backgroundColor='rgba(214, 201, 25, 0.403)';
    document.getElementById('game-3')!.style.backgroundColor='rgba(214, 201, 25, 0.103)';
  }

  selectGame3(): any{
    this.gameMode = 3;
    this.gameService.gameMode = 3;
    document.getElementById('game-1')!.style.backgroundColor='rgba(214, 201, 25, 0.103)';
    document.getElementById('game-2')!.style.backgroundColor='rgba(214, 201, 25, 0.103)';
    document.getElementById('game-3')!.style.backgroundColor='rgba(214, 201, 25, 0.403)';
  }

}
