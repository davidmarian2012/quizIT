import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { User } from 'src/app/modules/auth/components/interfaces/user';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  wrongLogin: boolean = false;
  points: number = 1;
  createdAt: any;
  avatar = 'avatar.png';

  public image: File | undefined;
  public username = sessionStorage.getItem('username') as string;
  public capitalizedUsername =
    this.username.charAt(0).toUpperCase() + this.username.slice(1);
  public user$: Observable<any>;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.user$ = this.authService.getUserByUsername(this.username);
  }

  ngOnInit(): void {
    const uploadButton = document.getElementById(
      'upload-btn'
    ) as HTMLButtonElement;
    uploadButton.disabled = true;

    this.user$.subscribe((user) => {
      this.points = user.points;
      this.avatar = user.avatar;
      this.createdAt = user.createdAt.substring(0, 10);
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

  fileChosen(event: any): void {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
    }
    const uploadButton = document.getElementById(
      'upload-btn'
    ) as HTMLButtonElement;
    uploadButton.disabled = false;
    uploadButton.style.cursor = 'pointer';
    uploadButton.style.backgroundColor = 'rgb(202, 199, 38)';
  }

  upload() {
    const username = sessionStorage.getItem('username') as string;
    this.authService.upload(username, this.image).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeAvatar() {
    if (this.avatar !== 'avatar.png') {
      const username = sessionStorage.getItem('username') as string;

      this.authService.removeAvatar(username).subscribe(
        () => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  logout(): any {
    sessionStorage.setItem('isLogged', 'false');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('hiddenChat');
    this.router.navigate(['/login']);
  }

  choose() {
    document.getElementById('avatarInput')?.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
  }

  form = new FormGroup({
    oldpassword: new FormControl('', [Validators.required]),
    newpassword: new FormControl('', [Validators.required]),
  });

  formatNumber(num: any) {
    let roundedNum = num.toFixed(1);
    return num % 1 === 0 ? parseInt(roundedNum) : roundedNum;
  }
}
