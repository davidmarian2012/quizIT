import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { DashboardComponent } from './modules/game/components/dashboard/dashboard.component';
import { ProfileComponent } from './modules/shared/components/profile/profile.component';
import { QuestionComponent } from './modules/game/components/question/question.component';
import { NumberQuestionComponent } from './modules/game/components/number-question/number-question.component';
import { AddQuestionComponent } from './modules/core/components/add-question/add-question.component';
import { NumericalQuestionComponent } from './modules/core/components/numerical-question/numerical-question.component';
import { MultiQuestionComponent } from './modules/core/components/multi-question/multi-question.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { GameRoundComponent } from './modules/game/components/game-round/game-round.component';
import { RankingsComponent } from './modules/core/components/rankings/rankings.component';
import { ForgotComponent } from './modules/auth/components/forgot/forgot.component';
import { WarGameRoundComponent } from './modules/game/components/war-game-round/war-game-round.component';
import { PracticeGameRoundComponent } from './modules/game/components/practice-game-round/practice-game-round.component';
import { NotfoundComponent } from './modules/core/components/notfound/notfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'add-question',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-numerical',
    component: NumericalQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-multi',
    component: MultiQuestionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'classic', component: GameRoundComponent, canActivate: [AuthGuard] },
  {
    path: 'extended-war',
    component: WarGameRoundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'training',
    component: PracticeGameRoundComponent,
    canActivate: [AuthGuard],
  },
  { path: 'rankings', component: RankingsComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ForgotComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
