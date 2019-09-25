import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BatllefieldComponent } from './batllefield/batllefield.component';
import { SingleFieldComponent } from './batllefield/single-field/single-field.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    BatllefieldComponent,
    SingleFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
