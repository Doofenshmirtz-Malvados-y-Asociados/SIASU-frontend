import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [],
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
  user = this.authClient.currentUser()

  isModified = false;
}
