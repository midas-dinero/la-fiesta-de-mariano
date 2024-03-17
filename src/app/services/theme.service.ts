import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = new BehaviorSubject<string>('light');
  currentTheme = this.theme.asObservable();

  setTheme(theme: string): void {
    this.theme.next(theme);
  }

  swapTheme(): void {
    if (this.theme.getValue() === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

}