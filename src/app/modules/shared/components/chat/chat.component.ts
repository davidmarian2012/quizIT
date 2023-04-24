import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  messages: any[] = [{author: 'yea', content: 'content'}];
  public messages$: Observable<any>;

  form = new FormGroup({
    content: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private chatService: ChatService) { this.messages$ = this.chatService.getAllMessages(); }

  ngOnInit(): void {
    const container = document.getElementById('chat-container') as HTMLDivElement;
    container.scrollTop = container.scrollHeight;

    this.messages$ = this.chatService.getAllMessages();
  }

  ngAfterViewInit(): void {
  }

  sendMessage(): any{
    if(this.form.get('content')!.value!)
    {
      const comm = {author: 'someone', content: this.form.get('content')!.value!};

      this.chatService.saveMessage(comm)
      .pipe(first()).subscribe(
        () => {
          this.ngOnInit();
        }
      );

      this.messages.push(comm);
      this.form.reset();

      const container = document.getElementById('chat-container') as HTMLDivElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
