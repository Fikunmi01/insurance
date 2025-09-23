import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent implements OnInit {
  @ViewChild('statsSection', { static: false }) statsSection!: ElementRef;

  testimonialArray = [
    {
      review: `Worziyan helped us secure our family's future with a comprehensive life insurance plan. His patience in explaining all our options and genuine care for our situation made all the difference. We feel confident and protected.`,
      author: 'Sarah Johnson',
      authorImg: 'assets/test-1.png',
      authorLocation: 'Edison, NJ',
      authorPlan: 'Life Insurance & Family Protection',
    },
    {
      review: `As a small business owner, I needed someone who understood both personal and business financial planning. Worziyan's expertise with New York Life's solutions helped me protect my business and plan for retirement simultaneously.`,
      author: 'Michael Chen',
      authorImg: 'assets/test-2.png',
      authorLocation: 'New Brunswick, NJ',
      authorPlan: 'Business & Retirement Planning',
    },
    {
      review: `After my husband's passing, Worziyan guided me through the insurance process with such compassion and professionalism. He helped me understand my options for long-term care and securing my children's education fund.`,
      author: 'Lisa Rodriguez',
      authorImg: 'assets/test-3.png',
      authorLocation: 'Piscataway, NJ',
      authorPlan: 'Estate Planning & Education Funding',
    },
  ];

  // Counter animation properties
  familiesProtected = 0;
  coverageProvided = 0;
  yearsExperience = 0;
  clientSatisfaction = 0;
  hasAnimated = false;

  private observer!: IntersectionObserver;

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.startCounterAnimations();
            this.hasAnimated = true;
          }
        });
      },
      { threshold: 0.3 }
    );
  }

  ngAfterViewInit() {
    if (this.statsSection) {
      this.observer.observe(this.statsSection.nativeElement);
    }
  }

  private startCounterAnimations() {
    // Animate Families Protected (0 to 100)
    this.animateCounter(0, 100, 2500, (value) => {
      this.familiesProtected = Math.floor(value);
    });

    // Animate Coverage Provided (0 to 50)
    this.animateCounter(0, 50, 2800, (value) => {
      this.coverageProvided = Math.floor(value);
    });

    // Animate Years Experience (0 to 5)
    this.animateCounter(0, 5, 2200, (value) => {
      this.yearsExperience = Math.floor(value);
    });

    // Animate Client Satisfaction (0 to 98)
    this.animateCounter(0, 98, 2600, (value) => {
      this.clientSatisfaction = Math.floor(value);
    });
  }

  private animateCounter(
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) {
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (end - start) * easeOutCubic;
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}