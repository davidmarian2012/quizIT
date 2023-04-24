import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  wrongLogin: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  loginUser(): void{
    this.form.markAllAsTouched();

    let username = this.form.get('username')?.value;
    let password = this.form.get('password')?.value;

    if(this.form.valid){
      this.loading = true;

      this.authService.login(username, password)
      .pipe(first()).subscribe(
        user => {
          console.log(user.username);
          this.router.navigate(['/dashboard']);
          sessionStorage.setItem("isLogged", "true");
        },
        () => {
          this.wrongLogin = true;
          this.loading = false;
        }
      );
    }
  }
}
