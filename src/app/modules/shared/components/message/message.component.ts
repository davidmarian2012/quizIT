import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  @Input() author: any;

  @Output() refreshPage = new EventEmitter<boolean>();

  public user$: Observable<any> = of(null);
  showDelete: boolean = false;
  avatar = 'avatar.png';

  constructor(
    private authService: AuthenticationService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const name =
      this.message.author.charAt(0).toLowerCase() +
      this.message.author.slice(1);
    this.user$ = this.authService.getUserByUsername(name);

    this.user$.subscribe((user) => {
      this.avatar = user?.avatar ?? 'avatar.png';
    });

    if (
      sessionStorage.getItem('username') == name ||
      sessionStorage.getItem('username') == 'admin'
    ) {
      this.showDelete = true;
    }
  }

  deleteMessage(): void {
    this.chatService.deleteMessage(this.message._id).subscribe((res) => {
      console.log('');
    });
    this.refreshPage.emit(true);
  }
}
