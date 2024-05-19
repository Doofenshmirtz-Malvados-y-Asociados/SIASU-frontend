import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

type fetchType = 'notSend' | 'completed' | 'error';

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
  constructor(
    private authClient: AuthService,
  ) {}
  
  fetchStatus: fetchType = 'notSend';
  errorMessage = '';

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isStudent: new FormControl(false),
    career: new FormControl(''),
    admission: new FormControl(''),
  });

  resetFetchStatus() {
    this.fetchStatus = 'notSend'
  }

  onSubmit() {
    const isValid = this.validation();
    
    if (!isValid) 
      return
    
    let dateTime = ''

    if (this.registerForm.value.admission) {
      dateTime = new Date(Date.parse(this.registerForm.value.admission || '')).toISOString()
    }

    this.authClient.register({
      user: {
        name: this.registerForm.value.name || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        admission: dateTime || undefined
      },
      career: this.registerForm.value.career || ''
    })
    .subscribe(
      data => {
        if (data) this.fetchStatus = 'completed'
        else this.fetchStatus = 'error'
      }
    )

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
    } else if (this.registerForm.value.isStudent && this.registerForm.value.career === '') {
      this.errorMessage = 'Selecciona una carrera';
      return false;
    } else if (this.registerForm.value.isStudent && this.registerForm.value.admission === '') {
      this.errorMessage = 'Selecciona una fecha de admisión';
      return false;
    } else if (this.registerForm.value.isStudent && this.registerForm.value.admission && (new Date(Date.parse(this.registerForm.value.admission)) > new Date())) {
      this.errorMessage = 'Selecciona una fecha de admisión valida';
      return false;
    }
    
    this.errorMessage = '';
    return true
  }
}
