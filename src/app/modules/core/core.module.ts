import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NumericalQuestionComponent } from './components/numerical-question/numerical-question.component';
import { MultiQuestionComponent } from './components/multi-question/multi-question.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RankingsComponent } from './components/rankings/rankings.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AddQuestionComponent,
    NumericalQuestionComponent,
    MultiQuestionComponent,
    RankingsComponent,
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AddQuestionComponent,
    NumericalQuestionComponent,
    MultiQuestionComponent,
    RankingsComponent,
    NotfoundComponent,
  ],
})
export class CoreModule {}
