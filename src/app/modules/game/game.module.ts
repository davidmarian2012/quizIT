import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { NumberQuestionComponent } from './components/number-question/number-question.component';
import { GameRoundComponent } from './components/game-round/game-round.component';
import { WarGameRoundComponent } from './components/war-game-round/war-game-round.component';
import { PracticeGameRoundComponent } from './components/practice-game-round/practice-game-round.component';

@NgModule({
  declarations: [
    DashboardComponent,
    QuestionComponent,
    NumberQuestionComponent,
    GameRoundComponent,
    WarGameRoundComponent,
    PracticeGameRoundComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [
    DashboardComponent,
    QuestionComponent,
    NumberQuestionComponent,
    GameRoundComponent,
    PracticeGameRoundComponent,
    WarGameRoundComponent,
  ],
})
export class GameModule {}
