import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ChatComponent,
    ProfileComponent
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
    ProfileComponent
  ]
})
export class SharedModule { }
