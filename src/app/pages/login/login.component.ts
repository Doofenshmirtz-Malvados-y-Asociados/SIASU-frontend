import { NgClass } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [NgClass],
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
  typeForm = false;

  changeToRegister() {
    this.typeForm = true;
  }

  changeToLogIn() {
    this.typeForm = false;
  }
}
