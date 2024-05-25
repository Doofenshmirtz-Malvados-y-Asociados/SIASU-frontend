import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'Dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>dashboard works!</p>`,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent { }
