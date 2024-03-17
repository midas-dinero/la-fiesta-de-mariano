import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  playerForm = new FormGroup({
    playerName: new FormControl(''),
    tokenColor: new FormControl('#000000')
  });
  tokens: any[] = [];

  constructor(private themeService: ThemeService, private gameLogicService: GameLogicService, private router: Router) { }

  addPlayer(): void {
    const playerName = this.playerForm.get('playerName')?.value;
    const tokenColor = this.playerForm.get('tokenColor')?.value;    

    if (!playerName || !tokenColor) return;

    this.gameLogicService.addToken(playerName, tokenColor);
  }

  getTokens(): any[] {
    return this.gameLogicService.tokens;
  }

  removePlayer(i: number) {
    this.gameLogicService.removePlayer(i);
  }

  startBoard() {
    this.router.navigate(['/game']);
  }

  swapTheme() {
    this.themeService.swapTheme();
  }

}
