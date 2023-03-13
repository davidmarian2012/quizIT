import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    DashboardComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    DashboardComponent,
    QuestionComponent
  ]
})
export class GameModule { }
