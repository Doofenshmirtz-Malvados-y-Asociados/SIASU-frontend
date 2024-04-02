import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
    
    #background {
      background: url('/assets/musa.jpeg');
      background-position: center;
      background-size: cover;
    }
    `
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
