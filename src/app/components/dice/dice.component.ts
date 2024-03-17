import { Component } from '@angular/core';

import { GameLogicService } from '../../services/game-logic.service';


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {

  sides: number = 0;
  currentRoll: number = 1;

  constructor(private gameLogicService: GameLogicService) {
    this.gameLogicService.json_data$.subscribe((data: any) => {
      this.sides = data.dice_sides;
    });
  }

  rollDiceWithDelay() {
    if (this.isEnded()) return;
    
    const rolls = Math.floor(Math.random() * 5) + 5; // Number of rolls
    const delay = 75; // Delay in milliseconds between rolls

    let rollCount = 0;
    const rollInterval = setInterval(() => {
      this.currentRoll = Math.floor(Math.random() * 6) + 1;
      rollCount++;

      if (rollCount === rolls) {
        this.gameLogicService.updateTokenSquares(this.currentRoll);
        clearInterval(rollInterval);
      }
    }, delay);
  }

  rollDice() {
    if (this.isEnded()) return;
    
    this.currentRoll = Math.floor(Math.random() * 6) + 1;

    this.gameLogicService.updateTokenSquares(this.currentRoll);
  }

  isEnded(): boolean {
    return this.gameLogicService.isEnded();
  }

}
