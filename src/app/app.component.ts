import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexPage } from './pages/index/index-page.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexPage, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SIASU';
}
