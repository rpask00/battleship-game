import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BatllefieldComponent } from './battlefield/battlefield.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
