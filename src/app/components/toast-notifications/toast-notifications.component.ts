import { Component, inject } from '@angular/core';
import { ToastNotificationsService } from './services/toast-notifications.service';

@Component({
  selector: 'ToastNotifications',
  standalone: true,
  imports: [],
  templateUrl: './toast-notifications.component.html',
  styles: ''
})
export class ToastNotificationsComponent {
  toastService: ToastNotificationsService = inject(ToastNotificationsService)

  removeToast(index: number) {
    this.toastService.remove(index);
  }
}
