import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastNotificationsComponent } from '../../components/toast-notifications/toast-notifications.component';
import { ResponseService } from '../../services/respuestas.service';

@Component({
  selector: 'Dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToastNotificationsComponent
  ],
  providers: [
    ResponseService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private readonly responseClient: ResponseService
  ) {}
  private authClient: AuthService = inject(AuthService)
  
  user = this.authClient.currentUser()
  response = this.responseClient.getResponseByUser(this.user!.email)


  onLogout() {
    this.authClient.logout()
  }
}
