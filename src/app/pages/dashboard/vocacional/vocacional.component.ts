import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ResponseService } from '../../../services/respuestas.service';
import { AuthService } from '../../../auth/auth.service';
import { InfoPopupComponent } from '../../../components/info-popup/info-popup.component';

@Component({
  selector: 'app-vocacional',
  standalone: true,
  imports: [
    RouterLink,
    InfoPopupComponent
  ],
  providers: [
    ResponseService
  ],
  templateUrl: './vocacional.component.html',
  styleUrl: './vocacional.component.css'
})
export class VocacionalComponent {
  constructor(
    private readonly responseClient: ResponseService,
    private readonly router: Router
  ) {}
  private readonly authClient: AuthService = inject(AuthService)
  
  user = this.authClient.currentUser()
  popUpActive = signal<boolean>(false);

  ngOnInit(): void {
    this.responseClient.getResponseByUser(this.user!.email).subscribe({
      next: (data) => {
        if(data !== null) this.redirectToResults()
      },
      error: (e) => console.error(e)
    })
  }

  redirectToResults() {
    this.router.navigateByUrl('/dashboard/vocacional/contestado')
  }

  help() {
    this.popUpActive.set(true)
  }
}
