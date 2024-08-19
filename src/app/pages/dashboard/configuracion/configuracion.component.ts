import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { matchValues } from '../../../shared/MatchValues.directive';
import { UserConfigService } from './services/user-config.service';


@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      console.log('AHHH, ESTA MAL')
      return;
    }

    this.userClient.changeAccountSettings({
      email: this.user!.email,
      name: this.accountSettingsForm.value?.name || ''
    }).subscribe(
      () => console.log("Si")
    )
  }


  // Password settings form and submit method
  securitySettingsForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmationPassword: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(8), matchValues('password')]),
  });

  onSecuritySettingsFormSubmit() {
    if (!this.securitySettingsForm?.valid) {
      return;
    }

    this.authClient.changePassword(this.securitySettingsForm.value.password || '')
      .subscribe(() => console.log("Si"))
  }


  // Career settings form and submit method
  careerSettingsForm = new FormGroup({
    career_id: new FormControl(this.user?.career_id, [Validators.required]),
    admission: new FormControl(new Date().toISOString(), [Validators.required])
  })

  onCareerSettingsFormSubmit() {
    if (!this.careerSettingsForm?.valid) {
      return;
    } else if (this.initialCareer == this.careerSettingsForm.value.career_id) {
      console.log("Misma carrera")
      return;
    }

    const dateTime = new Date(Date.parse(this.careerSettingsForm.value.admission || '')).toISOString()

    this.userClient.changeCareerSettings({
      career_id: this.careerSettingsForm.value.career_id || 0,
      email: this.user?.email || '',
      signedUpAt: dateTime
    })
      .subscribe(() => console.log("Si"))
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
