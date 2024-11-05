import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-in-progress',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './in-progress.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class InProgressComponent {

}
