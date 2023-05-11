import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import * as $ from 'jquery';
import { MessageComponent } from './components/message/message.component';
@NgModule({
  declarations: [
    HeaderComponent,
    ChatComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    HeaderComponent,
    ChatComponent,
    ProfileComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
