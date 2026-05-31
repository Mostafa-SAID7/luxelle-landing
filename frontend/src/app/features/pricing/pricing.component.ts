import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { PRICING_TIERS } from '../../core/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  pricingTiers = PRICING_TIERS;
  isLoading    = signal(true);
  skeletons    = Array(4).fill(0);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 600);
  }

  scrollToBooking(): void {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }
}
