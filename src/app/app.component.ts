import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'la-fiesta-de-mariano';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(theme => {
      document.body.dataset['bsTheme'] = theme;
      document.body.classList.remove('light-spatial-bg', 'dark-spatial-bg')
      document.body.classList.add(`${theme}-spatial-bg`)
    });
  }
  
}
