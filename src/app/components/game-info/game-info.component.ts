import { Component } from '@angular/core';

import { GameLogicService } from '../../services/game-logic.service';
import { BehaviorSubject } from 'rxjs';
import { Token } from 'src/app/models/Token';


@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent {

  description: { text: string, color: string } = { text: '', color: '' };
  player: { name: string, color: string } = { name: '', color: '' };
  moveInfo$: BehaviorSubject<{ token: Token | undefined, square: number }> = this.gameLogicService.lastMove$;
  
  constructor(private gameLogicService: GameLogicService) {
    this.moveInfo$.subscribe((moveInfo: { token: Token | undefined, square: number }) => {
      console.log('Received info:', moveInfo);
      
      this.description.text = this.gameLogicService.getDescriptionCurrentSquare(moveInfo.square);
      this.description.color = this.gameLogicService.getDescriptionColorCurrentSquare(moveInfo.square);
      if (moveInfo.token === undefined) {
        this.player.name = '';
        this.player.color = '';
      } else {
        this.player.name = moveInfo.token.name;
        this.player.color = moveInfo.token.color_hex;
      }
    });
  }

  moveCurrentToken(squares: number) {
    this.gameLogicService.updateTokenSquares(squares);
  }

  getBoardName(): string {
    return this.gameLogicService.json_data.name.toUpperCase();
  }

  getBoardColor(): string {
    return this.gameLogicService.json_data.color_hex;
  }

  private isDark(color: string): boolean {
    const c = color.substring(1);  // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >>  8) & 0xff;  // extract green
    const b = (rgb >>  0) & 0xff;  // extract blue
  
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  
    return luma < 128;
  }

  getTextColorFromBackground(bgColor: string): string {
    if (this.isDark(bgColor)) return 'text-white';
    else return 'text-dark';
  }

}
