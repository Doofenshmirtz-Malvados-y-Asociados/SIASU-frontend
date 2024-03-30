import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-index',
  standalone: true,
  imports: [],
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
