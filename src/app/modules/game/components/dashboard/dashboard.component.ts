import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  gameMode = 1;

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.selectGame1();

    const modal = document.querySelector('.modal') as HTMLDialogElement;
    const openModal = document.querySelector('.logout-header-btn');
    const closeModal = document.querySelector('.back-btn');

    openModal?.addEventListener('click', () => {
      modal?.showModal();
    });

    closeModal?.addEventListener('click', () => {
      modal?.close();
    });
  }

  selectGame1(): any {
    this.gameMode = 1;
    this.gameService.gameMode = 1;
    document.getElementById('game-1')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.403)';
    document.getElementById('game-2')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.103)';
    document.getElementById('game-3')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.103)';
  }

  selectGame2(): any {
    this.gameMode = 2;
    this.gameService.gameMode = 2;
    document.getElementById('game-1')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.103)';
    document.getElementById('game-2')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.403)';
    document.getElementById('game-3')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.103)';
  }

  selectGame3(): any {
    this.gameMode = 3;
    this.gameService.gameMode = 3;
    document.getElementById('game-1')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.103)';
    document.getElementById('game-2')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.103)';
    document.getElementById('game-3')!.style.backgroundColor =
      'rgba(214, 201, 25, 0.403)';
  }

  logout(): any {
    sessionStorage.setItem('isLogged', 'false');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('hiddenChat');
    this.router.navigate(['/login']);
  }
}
