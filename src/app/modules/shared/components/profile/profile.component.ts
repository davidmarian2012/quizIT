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
  loading: boolean = false;

  public image: File | undefined;
  public username = sessionStorage.getItem('username') as string;
  public capitalizedUsername =
    this.username.charAt(0).toUpperCase() + this.username.slice(1);
  public user$: Observable<any>;

  form = new FormGroup({
    oldpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    newpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.user$ = this.authService.getUserByUsername(this.username);
  }

  ngOnInit(): void {
    sessionStorage.setItem('avatar', this.avatar);

    const uploadButton = document.getElementById(
      'upload-btn'
    ) as HTMLButtonElement;
    uploadButton.disabled = true;

    const removeButton = document.getElementById(
      'remove-btn'
    ) as HTMLButtonElement;
    removeButton.disabled = true;
    removeButton.style.cursor = 'unset';
    removeButton.style.backgroundColor = 'rgba(202, 199, 38, 0.219)';

    this.user$.subscribe((user) => {
      this.points = user.points;
      this.avatar = user.avatar;
      this.createdAt = user.createdAt.substring(0, 10);
      sessionStorage.setItem('avatar', user.avatar);

      if (sessionStorage.getItem('avatar') != 'avatar.png') {
        removeButton.disabled = false;
        removeButton.style.cursor = 'pointer';
        removeButton.style.backgroundColor = 'rgb(202, 199, 38)';
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
        const uploadButton = document.getElementById(
          'upload-btn'
        ) as HTMLButtonElement;

        uploadButton.disabled = true;
        uploadButton.style.cursor = 'unset';
        uploadButton.style.backgroundColor = 'rgba(202, 199, 38, 0.219)';
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

  formatNumber(num: any) {
    let roundedNum = num.toFixed(1);
    return num % 1 === 0 ? parseInt(roundedNum) : roundedNum;
  }

  changePassword(): any {
    this.form.markAllAsTouched();

    const username = sessionStorage.getItem('username') as string;
    const oldpassword = this.form.get('oldpassword')?.value;
    const newpassword = this.form.get('newpassword')?.value;

    if (this.form.valid) {
      this.loading = true;

      this.authService
        .resetPassword(username, oldpassword, newpassword)
        .pipe(first())
        .subscribe(
          () => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
    }
  }
}
