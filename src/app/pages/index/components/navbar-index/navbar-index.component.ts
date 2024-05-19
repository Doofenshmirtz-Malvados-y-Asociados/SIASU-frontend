import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-index',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar-index.component.html',
  styles: `
    :host {
      position: fixed;
      z-index: 20;
      width: 100vw;
    }
  `
})
export class NavbarIndexComponent {

}
