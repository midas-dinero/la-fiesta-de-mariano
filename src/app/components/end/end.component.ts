import { Component } from '@angular/core';
import { GameLogicService } from 'src/app/services/game-logic.service';
import { Token } from '../../models/Token'; // Import the 'Token' type from the correct package
import { Router } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent {

  boardName!: string;
  token!: Token;

  constructor(private gameLogicService: GameLogicService, private router: Router) { }

  ngOnInit() {
    if (!this.gameLogicService.json_data || !this.gameLogicService.tokens || this.gameLogicService.tokens.length === 0) {
      this.router.navigate(['/room']);
    }

    this.boardName = this.getBoardName();
    this.token = this.getToken();
  }

  getToken(): Token {
    return this.gameLogicService.getCurrentToken();
  }

  getBoardName(): string {
    return this.gameLogicService.json_data.name.toUpperCase();
  }

}
