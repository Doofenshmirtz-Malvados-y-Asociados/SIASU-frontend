import { Component } from '@angular/core';
import { NavbarIndexComponent } from './components/navbar-index/navbar-index.component';
import { HeaderComponent } from './components/header/header.component';
import { FunctionsSectionComponent } from './components/functions-section/functions-section.component';
import { EndComponent } from "./components/end/end.component";

@Component({
  selector: 'IndexPage',
  standalone: true,
  imports: [NavbarIndexComponent, HeaderComponent, FunctionsSectionComponent, EndComponent],
  templateUrl: './index-page.component.html',
  styles: ``
})
export class IndexPage {

}
