import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  logout(): any{
    this.router.navigate(['/login']);
  }

}
