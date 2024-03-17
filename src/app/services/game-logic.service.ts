import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Token } from '../models/Token';
import { Observable } from 'rxjs';
import { BoardData } from '../models/BoardData';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  tokens: Token[] = [];
  currentToken: number = 0;
  availableBoards: string[] = [];
  json_data!: BoardData;
  json_data$: Observable<BoardData> = of();

  constructor(private http: HttpClient, private router: Router) {
    // Load default board
    this.loadBoard('board_1.json');

    // Load available boards
    this.http.get<string[]>('assets/boards/available_boards.json').subscribe((data: string[]) => {
      this.availableBoards = data;
    });
  }

  addToken(name: string, color_hex: string) {
    const square = this.json_data.squares[0];
    const point = this.getRandomCoordinates(square.center_coord[0], square.center_coord[1], 25);
    
    this.tokens.push({
      square: 0,
      top: point.y,
      left: point.x,
      
      name,
      color_hex
    });
  }

  removePlayer(i: number) {
    this.tokens.splice(i, 1);
  }

  clearTokens() {
    this.tokens = [];
  }

  loadBoard(board: string) {
    this.json_data$ = this.http.get<BoardData>(`assets/boards/${board}`);
    this.json_data$.subscribe((data: BoardData) => {
      this.json_data = data;
    });
  }
  
  updateTokenSquares(squares: number) {    
    if (!this.tokens[this.currentToken]) return;
    
    let newPosition = this.tokens[this.currentToken].square + squares;
    let squaresLength = this.json_data.squares.length;
    let over = newPosition + 1 - squaresLength;
    

    while (over > 0) {
      newPosition = squaresLength - over - 1;
      over = newPosition + 1 - squaresLength;
    }

    this.tokens[this.currentToken].square = newPosition;

    const square = this.json_data.squares[this.tokens[this.currentToken].square];

    const point = this.getRandomCoordinates(square.center_coord[0], square.center_coord[1], 25);
    this.tokens[this.currentToken].left = point.x;
    this.tokens[this.currentToken].top = point.y;

    if (!square.special) {
      // Update current token
      this.currentToken++;
      this.currentToken %= this.tokens.length;
      console.log('currentToken', this.currentToken);
    } else if (square.special === 'END') {
      // Show winner
      setTimeout(() => {
        this.router.navigate(['/game/end']);
      }, 3000);
    } else if (square.special === 'EXTRA_ROLL') {
      // Do nothing
    }
    
  }

  private getRandomCoordinates(x: number, y: number, radius: number): {x: number, y: number} {
    const angle = Math.random() * 2 * Math.PI;
    const randomRadius = Math.random() * radius;
    const randomX = x + randomRadius * Math.cos(angle);
    const randomY = y + randomRadius * Math.sin(angle);
    return {x: randomX, y: randomY};
  }

  getDescriptionCurrentSquare(): string {
    if (!this.tokens[this.currentToken]) return '';
    return this.json_data.squares[this.tokens[this.currentToken].square].description;
  }

  getDescriptionColorCurrentSquare(): string {
    if (!this.tokens[this.currentToken]) return '';
    return this.json_data.squares[this.tokens[this.currentToken].square].color_hex;
  }

  getCurrentToken(): Token {
    return this.tokens[this.currentToken];
  }

  isEnded(): boolean {
    return this.json_data.squares[this.tokens[this.currentToken].square].special === 'END';
  }

}