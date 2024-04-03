import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'RegisterPage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  `
})
export class RegisterPage {
  errorMessage = '';

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    const isValid = this.validation();
  }

  validation(): boolean {
    if (this.registerForm.get('name')?.hasError('required')) {
      this.errorMessage = 'Nombre requerido';
      return false;
    } else if (this.registerForm.get('email')?.hasError('required')) {
      this.errorMessage = 'Email requerido';
      return false;
    } else if (this.registerForm.get('email')?.hasError('email')) {
      this.errorMessage = 'Email invalido';
      return false;
    } else if (this.registerForm.get('password')?.hasError('required')) {
      this.errorMessage = 'Contraseña requerida';
      return false;
    } else if (this.registerForm.get('password')?.hasError('minlength')) {
      this.errorMessage = 'La contraseña debe de 8 caracteres minimo';
      return false;
    }
    
    this.errorMessage = '';
    return true
  }
}
