import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { PRICING_TIERS } from '../../core/constants/app.constants';
import { LucideAngularModule, Check } from 'lucide-angular';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './pricing.component.html',
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
