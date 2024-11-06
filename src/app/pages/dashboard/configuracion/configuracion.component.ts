import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { matchValues } from '../../../shared/MatchValues.directive';
import { UserConfigService } from './services/user-config.service';
import { ToastNotificationsService } from '../../../components/toast-notifications/services/toast-notifications.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './configuracion.component.html',
  styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  `
})
export class ConfiguracionComponent implements OnInit {
  private authClient: AuthService = inject(AuthService)
  private userClient: UserConfigService = inject(UserConfigService)
  private notificationService: ToastNotificationsService = inject(ToastNotificationsService)
  
  user = this.authClient.currentUser()
  initialCareer = this.user?.career_id;


  // Tab value and value handler
  currentTab = 0;
  changeTabValue(value: number) {
    this.currentTab = value;
  }

  // Account settings form and submit method
  accountSettingsForm = new FormGroup({
    name: new FormControl(this.user?.name, [Validators.required, Validators.minLength(6)])
  })
  
  onAccountSettingsFormSubmit() {
    if (!this.accountSettingsForm.valid) {
      this.notificationService.add("Nombre no valido", "Ingresa un nombre valido", 'error')
      return;
    }

    this.userClient.changeAccountSettings({
      email: this.user!.email,
      name: this.accountSettingsForm.value?.name || ''
    }).subscribe(
      () => this.notificationService.add("Nombre modificado", "Para reflejar los cambios debes de ingresar de nuevo")
    )
  }


  // Password settings form and submit method
  securitySettingsForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmationPassword: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(8), matchValues('password')]),
  });

  onSecuritySettingsFormSubmit() {
    if (!this.securitySettingsForm?.valid) {
      this.notificationService.add("Contraseña no valida", "Verifica que ingresaste la misma contraseña en ambos campos", 'error')
      return;
    }

    this.authClient.changePassword(this.securitySettingsForm.value.password || '')
      .subscribe(
        () => this.notificationService.add("Contraseña modificada", "Utiliza tu nueva contraseña cuando ingreses de nuevo")
      )
  }


  // Career settings form and submit method
  careerSettingsForm = new FormGroup({
    career_id: new FormControl(this.user?.career_id, [Validators.required]),
    admission: new FormControl(new Date().toISOString(), [Validators.required])
  })

  onCareerSettingsFormSubmit() {
    if (!this.careerSettingsForm?.valid) {
      this.notificationService.add("Carrera invalida", "Revisa que los datos que ingresaste sean correctos", 'error')
      return;
    } else if (this.initialCareer == this.careerSettingsForm.value.career_id) {
      this.notificationService.add("Misma carrera", "Cambia de carrera para guardar los cambios", 'error')
      return;
    }

    const dateTime = new Date(Date.parse(this.careerSettingsForm.value.admission || '')).toISOString()

    this.userClient.changeCareerSettings({
      career_id: this.careerSettingsForm.value.career_id || 0,
      email: this.user?.email || '',
      signedUpAt: dateTime
    })
      .subscribe(
        () => this.notificationService.add("Carrera modificada", "Para reflejar los cambios debes de ingresar de nuevo")
      )
  }


  // Init method to listen to changes of the password field
  ngOnInit() {
    this.securitySettingsForm.get('password')?.statusChanges.subscribe((status: string) => {
      if (status === 'VALID') {
        this.securitySettingsForm.get('confirmationPassword')?.enable();
      } else {
        this.securitySettingsForm.get('confirmationPassword')?.disable();
      }
    });
  }
}
