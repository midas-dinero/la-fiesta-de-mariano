import { Component, HostListener } from '@angular/core';

import { GameLogicService } from '../../services/game-logic.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  
  boardImagePath: string = '';

  imageWidthRatio: number = 0;
  imageHeightRatio: number = 0;

  // Store the top/left offset of the image relative to its parent container
  imageOffsetX: number = 0;
  imageOffsetY: number = 0;

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
    const image = document.querySelector('.game-board img') as HTMLImageElement;
    if (!image) {
      console.warn('Game board image not found. Token positioning may be incorrect.');
      return;
    }

    // Get the actual rendered (displayed) dimensions of the image
    const renderedWidth = image.clientWidth;
    const renderedHeight = image.clientHeight;

    // Get the image's natural (original) dimensions
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    // Calculate separate ratios for width and height
    this.imageWidthRatio = renderedWidth / naturalWidth;
    this.imageHeightRatio = renderedHeight / naturalHeight;

    // Calculate the offset of the image relative to its parent (.game-board)
    const imageRect = image.getBoundingClientRect();
    const parentRect = image.parentElement?.getBoundingClientRect();

    if (parentRect) {
      this.imageOffsetX = imageRect.left - parentRect.left;
      this.imageOffsetY = imageRect.top - parentRect.top;
    } else {
      this.imageOffsetX = 0;
      this.imageOffsetY = 0;
      console.warn('.game-board parent not found for image offset calculation.');
    }

    console.log(`Image Ratios: Width=${this.imageWidthRatio}, Height=${this.imageHeightRatio}`);
    console.log(`Image Offsets: X=${this.imageOffsetX}, Y=${this.imageOffsetY}`);
  }

  calculateTop(originalTop: number): number {
    if (!this.imageHeightRatio) return 0;
    // Apply ratio and then add the vertical offset of the image within its parent
    return originalTop * this.imageHeightRatio + this.imageOffsetY;
  }

  calculateLeft(originalLeft: number): number {
    if (!this.imageWidthRatio) return 0;
    // Apply ratio and then add the horizontal offset of the image within its parent
    return originalLeft * this.imageWidthRatio + this.imageOffsetX;
  }
  
  @HostListener('window:resize')
  onResize() {
    this.onImageLoad();
  }

  getTokens() {
    return this.gameLogicService.tokens;
  }

}
