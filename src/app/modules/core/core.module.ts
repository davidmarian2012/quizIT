import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NumericalQuestionComponent } from './components/numerical-question/numerical-question.component';
import { MultiQuestionComponent } from './components/multi-question/multi-question.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    AddQuestionComponent,
    NumericalQuestionComponent,
    MultiQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AddQuestionComponent,
    NumericalQuestionComponent,
    MultiQuestionComponent
  ]
})
export class CoreModule { }
