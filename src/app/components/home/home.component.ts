import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  roomForm = new FormGroup({
    board: new FormControl('Choose an option')
  });
  
  constructor(private themeService: ThemeService, private gameLogicService: GameLogicService, private router: Router) {
  }

  getAvailableBoards(): string[] {
    return this.gameLogicService.getAvailableBoards();
  }

  startRoom() {
    // console.log(this.roomForm.get('board')?.value);
    
    this.router.navigate(['/room'], {
      queryParams: { board: this.roomForm.get('board')?.value }
    });
  }

  swapTheme() {
    this.themeService.swapTheme();
  }

}
