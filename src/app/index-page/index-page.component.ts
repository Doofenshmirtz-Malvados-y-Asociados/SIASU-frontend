import { Component } from '@angular/core';
import { NavbarIndexComponent } from './components/navbar-index/navbar-index.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [NavbarIndexComponent, HeaderComponent],
  templateUrl: './index-page.component.html',
  styles: ``
})
export class IndexPageComponent {

}
