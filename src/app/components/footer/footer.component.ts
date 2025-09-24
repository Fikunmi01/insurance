import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  date = new Date();
  year = this.date.getFullYear();
  
  @Output() privacyToggled = new EventEmitter<void>();
  
  onPrivacyClick() {
    this.privacyToggled.emit();
  }
}