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
    this.authService.login(this.form.value)
      .pipe(first()).subscribe(
        user => {
          console.log("hello");
        },
        () => {
          this.wrongLogin = true;
          this.router.navigate(['/dashboard']);
        }
      );
  }

}
