import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  loading: boolean = false;
  success: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  sendRequest(): any {
    this.form.markAllAsTouched();

    const email = this.form.get('mail')?.value;

    if (this.form.valid && email) {
      this.loading = true;
      this.success = true;

      this.authService
        .forgotPassword(email)
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
