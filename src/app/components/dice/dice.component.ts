import { Component, ElementRef, Renderer2 } from '@angular/core';

import { GameLogicService } from '../../services/game-logic.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {

  sides: number = 0;
  currentRoll: number = 1;

  constructor(private gameLogicService: GameLogicService,
    private themeService: ThemeService,
    private el: ElementRef, 
    private renderer: Renderer2
    ) {
    this.gameLogicService.json_data$.subscribe((data: any) => {
      this.sides = data.dice_sides;
    });
  }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe((theme: any) => {
      const host = this.el.nativeElement;

      // this.renderer.removeClass(host, 'light-spatial-bg');
      // this.renderer.removeClass(host, 'dark-spatial-bg');

      // // Add the new theme class
      // this.renderer.addClass(host, `${theme}-spatial-bg`);
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
