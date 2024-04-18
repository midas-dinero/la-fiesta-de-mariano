import { Component } from '@angular/core';

import { GameLogicService } from '../../services/game-logic.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent {

  description: { text: string, color: string } = { text: '', color: '' };
  square$: BehaviorSubject<number> = this.gameLogicService.square$;
  
  constructor(private gameLogicService: GameLogicService) {
    this.gameLogicService.square$.subscribe((square: number) => {
      console.log('Received square:', square);
      
      this.description.text = this.getDescription();
      this.description.color = this.getDescriptionColor();
    });
  }

  moveCurrentToken(squares: number) {
    this.gameLogicService.updateTokenSquares(squares);
  }

  getDescription(): string {
    return this.gameLogicService.getDescriptionCurrentSquare(this.square$.value);
  }

  getBoardName(): string {
    return this.gameLogicService.json_data.name.toUpperCase();
  }

  getBoardColor(): string {
    return this.gameLogicService.json_data.color_hex;
  }

  getDescriptionColor(): string {
    return this.gameLogicService.getDescriptionColorCurrentSquare(this.square$.value);
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
