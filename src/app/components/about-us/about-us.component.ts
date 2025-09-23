import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  aboutUsArray = [
    {
      icon: 'assets/headset-outline.png',
      header: 'Personalized Care',
      description: 'Tailored strategies that align with your unique goals',
    },
    {
      icon: 'assets/shield-icon.png',
      header: 'Trusted Protection',
      description: `Backed by New York Life's 175+ year legacy`,
    },
    {
      icon: 'assets/arrow-icon.png',
      header: 'Long-Term Growth',
      description: `Strategies designed for sustainable financial success`,
    },
    {
      icon: 'assets/trust-icon.png',
      header: 'Lifetime Partner',
      description: `Ongoing support through every life stage`,
    },
  ];

  financialServiceArray = [
    {
      icon: 'assets/coin-icon.png',
      header: 'Financial Security',
      description: `Comprehensive protection strategies for your family's peace of mind.`,
    },
    {
      icon: 'assets/retirement-icon.png',
      header: 'Retirement Needs',
      description: `Personalized retirement planning to maintain your lifestyle.`,
    },
    {
      icon: 'assets/children-icon.png',
      header: `Children Education`,
      description: `Strategic saving plans for your children's educational goals.`,
    },
    {
      icon: 'assets/money-icon.png',
      header: 'Lifetime Income',
      description: `Create reliable income streams for financial independence.`,
    },

    {
      icon: 'assets/care-icon.png',
      header: 'Extended Care',
      description: `Plan for long-term care needs while protecting your legacy.`,
    },
    {
      icon: 'assets/house-icon.png',
      header: 'Estate Conservation',
      description: `Preserve and transfer your wealth efficiently to future generations.`,
    },
  ];

  protectionServiceArray = [
    {
      icon: 'assets/saving-icon.png',
      header: 'Emergency Saving',
      description: `Build a financial safety net for unexpected expenses and life events.`,
    },
    {
      icon: 'assets/bag-icon.png',
      header: 'Debt Management',
      description: `Strategic planning to eliminate debt and improve financial health.`,
    },
    {
      icon: 'assets/user-shield.png',
      header: `Life Insurance`,
      description: `Protect your family's financial future with comprehensive life coverage.`,
    },
    {
      icon: 'assets/disability-icon.png',
      header: 'Disability Insurance',
      description: `Safeguard your income against unexpected illness or injury.`,
    },

    {
      icon: 'assets/longterm-icon.png',
      header: 'Long Term Care',
      description: `Prepare for extended care needs while preserving your assets.`,
    },
    {
      icon: 'assets/home-icon.png',
      header: 'Home Insurance',
      description: `Comprehensive protection for your most valuable asset.`,
    },
  ];

  wealthServiceArray = [
    {
      icon: 'assets/rplanning-icon.png',
      header: 'Retirement Planning',
      description: `Build a secure retirement with diversified income strategies.`,
    },
    {
      icon: 'assets/education-icon.png',
      header: 'Education Funding',
      description: `Save strategically for your children's educational future.`,
    },
    {
      icon: 'assets/checklist-icon.png',
      header: 'Large Purchase/ Event',
      description: `Plan and save for major life purchases and milestones.`,
    },
  ];
}
