import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastNotificationsComponent } from '../../components/toast-notifications/toast-notifications.component';

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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private authClient: AuthService = inject(AuthService)
  
  user = this.authClient.currentUser()

  onLogout() {
    this.authClient.logout()
  }
}
