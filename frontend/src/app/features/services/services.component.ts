import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { SERVICES } from '../../core/constants/app.constants';
import { CartService } from '../../core/services/cart.service';
import * as LucideIcons from 'lucide-angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    ScrollRevealDirective,
    CardComponent,
    ButtonComponent,
    LucideIcons.LucideAngularModule,
  ],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services   = SERVICES;
  cartService = inject(CartService);

  addedIds = signal<string[]>([]);

  isAdded(id: string): boolean {
    return this.addedIds().includes(id);
  }

  addToCart(service: typeof SERVICES[0]): void {
    this.cartService.addItem({
      id:       service.id,
      name:     service.name,
      icon:     service.icon,
      price:    service.price    ?? 0,
      duration: service.duration ?? 0,
    });
    this.addedIds.update(ids => [...ids, service.id]);
    setTimeout(() => {
      this.addedIds.update(ids => ids.filter(i => i !== service.id));
    }, 1600);
  }
}
