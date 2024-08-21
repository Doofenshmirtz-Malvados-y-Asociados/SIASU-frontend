import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SuccessPopupComponent } from '../../components/success-popup/success-popup.component';
import { ErrorPopupComponent } from '../../components/error-popup/error-popup.component';
import { HttpErrorResponse } from '@angular/common/http';


enum fetchType {
  notSend,
  completed, 
  error,
  unauthorized,
}


@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, SuccessPopupComponent, ErrorPopupComponent],
  templateUrl: './login.component.html',
  styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  `
})
export class LoginPage {
  constructor(
    private authClient: AuthService,
    private router: Router
  ) {}

  enum: typeof fetchType = fetchType;

  errorMessage = '';
  fetchStatus = signal<fetchType>(fetchType.notSend);


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  onSubmit() {
    const isValid = this.validation();
    
    if (!isValid) 
      return
    
    this.authClient.login(
      this.loginForm.value.email ?? '', 
      this.loginForm.value.password ?? ''
    )
    .subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e: HttpErrorResponse ) => {
        if (e.status === 401) this.fetchStatus.set(fetchType.unauthorized)
        else this.fetchStatus.set(fetchType.error)
      }
    })
    
  }

  validation(): boolean {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.errorMessage = 'Email requerido';
      return false;
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.errorMessage = 'Email invalido';
      return false;
    } else if (this.loginForm.get('password')?.hasError('required')) {
      this.errorMessage = 'Contraseña requerida';
      return false;
    } else if (this.loginForm.get('password')?.hasError('minlength')) {
      this.errorMessage = 'La contraseña debe de 8 caracteres minimo';
      return false;
    }
    
    this.errorMessage = '';
    return true
  }
}
