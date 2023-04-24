import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  wrongLogin: boolean = false;
  playerRank = '';
  userValue: any;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(3>5){
      this.playerRank = 'Magic Geek';
    }
    else{
      this.playerRank = 'Nerdy Wizard';
    }
    this.userValue = this.authService.userValue;
    console.log(this.userValue.user.username);
  }

  form = new FormGroup({
    oldpassword: new FormControl('', [
      Validators.required
    ]),
    newpassword: new FormControl('', [
      Validators.required
    ])
  })

  // loginUser(): void{
    
  //   this.authService.login(this.form.value)
  //     .pipe(first()).subscribe(
  //       user => {
  //         console.log("hello");
  //       },
  //       () => {
  //         this.wrongLogin = true;
  //         this.router.navigate(['/dashboard']);
  //       }
  //     );
  // }

}
