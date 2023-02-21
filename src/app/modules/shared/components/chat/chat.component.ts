import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: any[] = [{author: 'yea', 'content': 'content'}];

  form = new FormGroup({
    content: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private chatService: ChatService) { 
  }

  ngOnInit(): void {
  }

  sendMessage(): any{
    if(this.form.get('content')!.value!)
    {
      const comm = {author: 'someone', content: this.form.get('content')!.value!};

      this.chatService.saveMessage(comm)
      .pipe(first()).subscribe(
        () => {
          console.log('hey');
        }
      );

      this.messages.push(comm);
      this.form.reset();
    }

    this.chatService.getAllMessages().subscribe(
      {
        next(val){
          console.log(val.messages);
        },
        error(msg){
          console.log(msg);
        }
      }
    )
  }

}
