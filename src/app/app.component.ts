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
    });
  }
  
}
