import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { DiceComponent } from './components/dice/dice.component';
import { RoomComponent } from './components/room/room.component';
import { AppRoutingModule } from './app-routing.module';
import { EndComponent } from './components/end/end.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent, 
    GameComponent, 
    GameInfoComponent, 
    DiceComponent, 
    RoomComponent, 
    EndComponent, 
    HomeComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
