import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarHomepageComponent } from './components/navbar-homepage/navbar-homepage.component';
import { IndexComponent } from './pages/index/index.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexComponent, NavbarHomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SIASU';
}
