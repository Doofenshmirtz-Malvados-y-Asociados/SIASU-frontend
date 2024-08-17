import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { matchValues } from '../../../shared/MatchValues.directive';
import { UserConfigService } from './services/user-config.service';
import { UserConfiguration } from './dto/UserConfigurationUpdate.interface';


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
export class ConfiguracionComponent {
  private authClient: AuthService = inject(AuthService)
  private userClient: UserConfigService = inject(UserConfigService)

  user = this.authClient.currentUser()

  sendObject: UserConfiguration = {
    email: this.user?.email
  }

  configForm = new FormGroup({
    email: new FormControl(this.user?.email, [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmationPassword: new FormControl('', [Validators.minLength(8), matchValues('password')]),
  });

  ngOnInit() {
    this.onCreateGroupFormValueChange();
  }

  onCreateGroupFormValueChange() {
    const initialValue = this.configForm.value
    this.configForm.valueChanges.subscribe(value => {
      if ((value.email != initialValue.email)) {
        this.sendObject.email = value.email || this.user?.email
      }
      if (value.password !== initialValue.password && value.confirmationPassword !== initialValue.confirmationPassword) {
        this.sendObject.password = value.password || undefined
      }
    });
  }

  onSubmit() {
    // if (!this.configForm.valid) {
    //   console.log("Webos pendejo")
    //   return;
    // }

    this.userClient.updateConfiguration(this.sendObject).subscribe(
      () => console.log("Suscribe")
    )
  }
}
