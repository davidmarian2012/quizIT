import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  takenUsername: boolean = false;
  takenEmail: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  registerUser() {
    this.form.markAllAsTouched();

    if (this.form.get('username')) {
      const usernameControl = this.form.get('username');
      if (usernameControl?.value) {
        const trimmedValue = usernameControl.value.trim();
        usernameControl.setValue(trimmedValue);
      }
    }

    if (this.form.get('email')) {
      const emailControl = this.form.get('email');
      if (emailControl?.value) {
        const trimmedValue = emailControl.value.trim();
        emailControl.setValue(trimmedValue);
      }
    }

    if (this.form.valid) {
      this.takenEmail = false;
      this.takenUsername = false;
      this.loading = true;

      this.authService
        .register(this.form.value)
        .pipe(first())
        .subscribe(
          (user) => {
            console.log(user);
            this.router.navigate(['/login']);
          },
          (error) => {
            this.loading = false;
            if (error.errors[0].username) {
              this.takenUsername = true;
            } else if (error.errors[0].email) {
              this.takenEmail = true;
            }
          }
        );
    }
  }
}
