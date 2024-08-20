import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SuccessPopupComponent } from "../../components/success-popup/success-popup.component";
import { ErrorPopupComponent } from '../../components/error-popup/error-popup.component';

type fetchType = 'notSend' | 'completed' | 'error';

@Component({
    selector: 'RegisterPage',
    standalone: true,
    templateUrl: './register.component.html',
    styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  `,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, SuccessPopupComponent, ErrorPopupComponent]
})
export class RegisterPage {
  constructor(
    private authClient: AuthService,
  ) {}
  
  fetchStatus = signal<fetchType>('notSend');
  errorMessage = '';
  registerFormPage = 0;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    isStudent: new FormControl(false),
    career: new FormControl(''),
    admission: new FormControl(''),
  });

  resetFetchStatus() {
    this.fetchStatus.set('notSend')
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
      success => {
        if (success) this.fetchStatus.set('completed')
        else {
          this.fetchStatus.set('error')
        }
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

  increaseFormPage(n : number) {
    this.registerFormPage += n;
  }
}
