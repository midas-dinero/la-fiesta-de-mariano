import { Component, HostListener } from '@angular/core';

import { GameLogicService } from '../../services/game-logic.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  
  imageResizeRatio: number = 0;
  boardImagePath: string = '';

  constructor(private gameLogicService: GameLogicService, private router: Router) {
    this.gameLogicService.json_data$.subscribe((data: any) => {
      this.boardImagePath = `assets/images/${data.filename}`;
    });
  }

  ngOnInit() {
    if (!this.gameLogicService.json_data || !this.gameLogicService.tokens || this.gameLogicService.tokens.length === 0) {
      this.router.navigate(['/room']);
    }
  }
  

  onImageLoad() {
    const image = document.querySelector('.game-board img') as HTMLImageElement; // Get reference to image

    const viewportHeight: number = window.innerHeight;

    this.imageResizeRatio = viewportHeight / image.naturalHeight;
  }    

  calculateTop(originalTop: number): number {
    if (!this.imageResizeRatio) return 0;

    return originalTop * this.imageResizeRatio;
  }

  calculateLeft(originalLeft: number): number {
    if (!this.imageResizeRatio) return 0;

    return originalLeft * this.imageResizeRatio;
  }

  @HostListener('window:resize')
  onResize() {
    this.onImageLoad();
  }

  getTokens() {
    return this.gameLogicService.tokens;
  }

}
