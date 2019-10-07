import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BatllefieldComponent } from './battlefield/battlefield.component';
import { GameOverPopupComponent } from './game-over-popup/game-over-popup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: SplashScreenComponent,
    pathMatch: 'full'
  },
  {
    path: 'play',
    component: BatllefieldComponent,
    pathMatch: 'full'
  },
  {
    path: 'play/:end',
    component: BatllefieldComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'gameover',
  //   component: GameOverPopupComponent,
  //   outlet: 'popup'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
