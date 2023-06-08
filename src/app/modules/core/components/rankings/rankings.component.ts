import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, take, toArray } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css'],
})
export class RankingsComponent implements OnInit {
  users$: Observable<any>;
  pages: any = 0;
  pagesArray: any[] = [];
  usersLength: number = 0;
  usersPerPage: number = 10;
  rankMultiply: any = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.users$ = this.authService
      .getAllUsersByPoints()
      .pipe(map((users) => users.slice(0, 10)));
  }

  ngOnInit(): void {
    this.authService
      .getAllUsersByPoints()
      .pipe(
        toArray(),
        map((users) => {
          this.usersLength = users[0].length;
        })
      )
      .subscribe(() => {
        this.pages = Math.ceil(this.usersLength / this.usersPerPage);

        for (let i = 1; i <= this.pages; i++) {
          this.pagesArray.push(i);
        }
      });

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

  onPageChange(page: any): void {
    this.users$ = this.authService
      .getAllUsersByPoints()
      .pipe(map((users) => users.slice(10 * (page - 1), 10 * page)));

    this.rankMultiply = page - 1;
  }

  formatNumber(num: any) {
    let roundedNum = num.toFixed(1);
    return num % 1 === 0 ? parseInt(roundedNum) : roundedNum;
  }

  logout(): any {
    sessionStorage.setItem('isLogged', 'false');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('hiddenChat');
    this.router.navigate(['/login']);
  }
}
