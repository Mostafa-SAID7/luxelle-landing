import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ApiDataService } from '../../core/services/api-data.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, ButtonComponent, LucideAngularModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  private apiData = inject(ApiDataService);

  pricingTiers = this.apiData.pricingTiers;
  isLoading    = this.apiData.pricingLoading;
  hasError     = this.apiData.pricingError;
  skeletons    = Array(4).fill(0);

  scrollToBooking(): void {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }
}
