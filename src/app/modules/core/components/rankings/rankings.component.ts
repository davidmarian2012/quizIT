import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { Paginator } from './Paginator'

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  paginator: Paginator = new Paginator();
  public users$: Observable<any>;

  constructor(private authService: AuthenticationService) { this.users$ = this.authService.getAllUsersByPoints(); }

  ngOnInit(): void {
  }

}
