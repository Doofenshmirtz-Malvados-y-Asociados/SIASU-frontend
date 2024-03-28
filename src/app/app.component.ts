import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SIASU';
}
