import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BatllefieldComponent } from './battlefield/battlefield.component';
import { SingleFieldComponent } from './battlefield/single-field/single-field.component';
import { PlayerAreaComponent } from './battlefield/player-area/player-area.component';
import { EnemyAreaComponent } from './battlefield/enemy-area/enemy-area.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    BatllefieldComponent,
    SingleFieldComponent,
    PlayerAreaComponent,
    EnemyAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
