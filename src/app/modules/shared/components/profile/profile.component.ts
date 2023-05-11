import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { User } from 'src/app/modules/auth/components/interfaces/user';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  wrongLogin: boolean = false;
  playerRank = '';
  points: number = 1;
  createdAt: any;
  avatar = 'avatar.png';

  public image: File | undefined;
  public username = sessionStorage.getItem('username') as string;
  public capitalizedUsername = this.username.charAt(0).toUpperCase() + this.username.slice(1);
  public user$: Observable<any>;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.user$ = this.authService.getUserByUsername(this.username);
   }

  ngOnInit(): void {
    const uploadButton = document.getElementById('upload-btn') as HTMLButtonElement;
    uploadButton.disabled = true;

    this.user$.subscribe(user => {
      this.points = user.points;
      this.avatar = user.avatar;
      this.createdAt = user.createdAt.substring(0,10);
    })

    if(this.points < 100){
      this.playerRank = 'Beginner';
    }
    else if (this.points >= 100 && this.points < 200) {
      this.playerRank = 'Nerdy Wizard';
    }
    else {
      this.playerRank = 'Great Master';
    }
  }

  fileChosen(event: any): void {
    if(event.target.value){
      this.image = <File>event.target.files[0];
    }
    const uploadButton = document.getElementById('upload-btn') as HTMLButtonElement;
    uploadButton.disabled = false;
    uploadButton.style.cursor = 'pointer';
    uploadButton.style.backgroundColor = 'rgb(202, 199, 38)';
  }
  
  upload(){
    const username = sessionStorage.getItem('username') as string;
    this.authService.upload(username, this.image).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  choose(){
    document.getElementById('avatarInput')?.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
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
