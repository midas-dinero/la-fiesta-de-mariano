import { Routes, RouterModule } from '@angular/router';

import { RoomComponent } from './room/room.component';
import { GameComponent } from './components/game/game.component';


const appRoutes = [
  { path: '', redirectTo: '/room'},
  { path: 'room', component: RoomComponent },
  { path: 'game', component: GameComponent },
]

export const routing = RouterModule.forRoot(appRoutes);
