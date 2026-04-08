import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { PRICING_TIERS } from '../../core/constants/app.constants';
import { Check } from 'lucide-angular';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, ButtonComponent, Check],
  template: `
    <section id="pricing" class="section-padding bg-luxelle">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appScrollReveal>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Flexible <span class="text-gradient">Pricing Plans</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-rose-gold to-warm-gold mx-auto rounded-full"></div>
          <p class="text-luxelle-tertiary mt-4 max-w-2xl mx-auto">
            Choose the perfect plan for your beauty and wellness needs
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-card
            *ngFor="let tier of pricingTiers"
            [appScrollReveal]="'scaleIn'"
            [class.ring-2]="tier.isPopular"
            [class.ring-rose-gold]="tier.isPopular"
            [class.scale-105]="tier.isPopular"
          >
            <div class="space-y-6">
              <!-- Popular Badge -->
              <div *ngIf="tier.isPopular" class="inline-block">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-gold to-warm-gold text-luxelle-dark">
                  Most Popular
                </span>
              </div>

              <!-- Tier Name -->
              <div>
                <h3 class="text-2xl font-bold text-luxelle mb-2">{{ tier.name }}</h3>
                <p class="text-luxelle-tertiary text-sm">{{ tier.description }}</p>
              </div>

              <!-- Price -->
              <div>
                <span class="text-4xl font-bold text-rose-gold">${{ tier.price }}</span>
                <span class="text-luxelle-tertiary">/month</span>
              </div>

              <!-- Features -->
              <ul class="space-y-3">
                <li *ngFor="let feature of tier.features" class="flex gap-3 items-start">
                  <Check class="w-5 h-5 text-warm-gold flex-shrink-0 mt-0.5" />
                  <span class="text-luxelle-secondary text-sm">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <app-button
                [variant]="tier.isPopular ? 'primary' : 'outline'"
                size="md"
                class="w-full"
                (onClick)="scrollToBooking()"
              >
                Get Started
              </app-button>
            </div>
          </app-card>
        </div>
      </div>
    </section>
  `,
})
export class PricingComponent {
  pricingTiers = PRICING_TIERS;

  scrollToBooking(): void {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
