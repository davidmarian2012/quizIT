import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [{author: 'yea', content: 'content'}];
  public messages$: Observable<any>;

  public username = sessionStorage.getItem('username') as string;
  public capitalizedUsername = this.username.charAt(0).toUpperCase() + this.username.slice(1);

  form = new FormGroup({
    content: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private chatService: ChatService, private authService: AuthenticationService) { 
    this.messages$ = this.chatService.getAllMessages();
  }

  ngOnInit(): void {
  }

  sendMessage(): any{
    if(this.form.get('content')!.value!)
    {
      const comm = {author: this.capitalizedUsername, content: this.form.get('content')!.value!};

      this.chatService.saveMessage(comm)
      .pipe(first()).subscribe(
        () => {
          this.ngOnInit();
        }
      );
      
      this.form.reset();
    }
  }

  collapse(): void{
    const chat = document.getElementById('chat-container') as HTMLElement;
    const writeSection = document.getElementById('write-section') as HTMLElement;
    const collapseBtn = document.getElementById('collapse-btn') as HTMLElement;

    if(chat.style.display == 'none'){
      chat.style.display = 'flex';
      writeSection.style.display = 'flex';
      collapseBtn.style.left = '15vw';
      collapseBtn.textContent = 'X';
    } else {
      chat.style.display = 'none';
      writeSection.style.display = 'none';
      collapseBtn.style.left = '0';
      collapseBtn.textContent = '>';
    }
  }
}
