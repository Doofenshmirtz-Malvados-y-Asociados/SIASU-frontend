import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vocacional',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './vocacional.component.html',
  styleUrl: './vocacional.component.css'
})
export class VocacionalComponent {
  
}
