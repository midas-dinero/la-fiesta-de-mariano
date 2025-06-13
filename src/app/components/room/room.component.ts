import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private themeService: ThemeService, private gameLogicService: GameLogicService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const boardName = params.get('board');
      if (boardName) {
        this.loadBoard(boardName);
      }
    });
  }

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
    if (!this.gameLogicService.json_data || !this.gameLogicService.tokens || this.gameLogicService.tokens.length === 0) {
      return;
    }

    this.router.navigate(['/game']);
  }

  swapTheme() {
    this.themeService.swapTheme();
  }

  loadBoard(boardName: string) {
    this.gameLogicService.availableBoards$.subscribe((data: string[]) => {
      console.log(boardName, data, boardName in data);
      
      if (!data.includes(boardName)) this.router.navigate(['']);

      this.gameLogicService.loadBoard(boardName);
    });
  }

}
