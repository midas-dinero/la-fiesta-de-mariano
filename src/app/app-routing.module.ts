import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { RoomComponent } from './components/room/room.component';
import { EndComponent } from './components/end/end.component';
import { HomeComponent } from './components/home/home.component';



const appRoutes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'room', component: RoomComponent },
  { path: 'game/end', component: EndComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}