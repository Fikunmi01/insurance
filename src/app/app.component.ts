import { Component, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroComponent,
    AboutUsComponent,
    TestimonialComponent,
    ContactComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'worziyanmavolo';
  privacyOpen: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onPrivacyToggled() {
    this.privacyOpen = !this.privacyOpen;
    
    // Control body scroll
    if (this.privacyOpen) {
      this.document.body.style.overflow = 'hidden';
    } else {
      this.document.body.style.overflow = '';
    }
  }

  closePrivacy() {
    this.privacyOpen = false;
    this.document.body.style.overflow = '';
  }
}