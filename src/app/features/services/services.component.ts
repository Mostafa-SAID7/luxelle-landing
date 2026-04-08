import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { SERVICES } from '../../core/constants/app.constants';
import * as LucideIcons from 'lucide-angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    ScrollRevealDirective,
    CardComponent,
    ButtonComponent,
    LucideIcons.Sparkles,
    LucideIcons.Scissors,
    LucideIcons.Palette,
    LucideIcons.Droplet,
    LucideIcons.Eye,
    LucideIcons.Hand,
    LucideIcons.Heart,
  ],
  template: `
    <section id="services" class="section-padding bg-luxelle-card/50">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appScrollReveal>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Our <span class="text-gradient">Services</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-rose-gold to-warm-gold mx-auto rounded-full"></div>
          <p class="text-luxelle-tertiary mt-4 max-w-2xl mx-auto">
            Discover our comprehensive range of luxury beauty and wellness treatments
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-card
            *ngFor="let service of services; let i = index"
            [appScrollReveal]="'fadeInUp'"
            class="group cursor-pointer"
          >
            <div class="space-y-4">
              <!-- Icon -->
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-gold/20 to-warm-gold/20 flex items-center justify-center group-hover:from-rose-gold/30 group-hover:to-warm-gold/30 transition-all">
                <ng-container [ngSwitch]="service.icon">
                  <lucide-sparkles *ngSwitchCase="'sparkles'" class="w-6 h-6 text-rose-gold" />
                  <lucide-scissors *ngSwitchCase="'scissors'" class="w-6 h-6 text-rose-gold" />
                  <lucide-palette *ngSwitchCase="'palette'" class="w-6 h-6 text-rose-gold" />
                  <lucide-droplet *ngSwitchCase="'droplet'" class="w-6 h-6 text-rose-gold" />
                  <lucide-eye *ngSwitchCase="'eye'" class="w-6 h-6 text-rose-gold" />
                  <lucide-hand *ngSwitchCase="'hand'" class="w-6 h-6 text-rose-gold" />
                  <lucide-heart *ngSwitchCase="'heart'" class="w-6 h-6 text-rose-gold" />
                </ng-container>
              </div>

              <!-- Service Name -->
              <h3 class="text-xl font-semibold text-luxelle">{{ service.name }}</h3>

              <!-- Description -->
              <p class="text-luxelle-tertiary text-sm leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Price & Duration -->
              <div class="flex justify-between items-center pt-4 border-t border-rose-gold/10">
                <div>
                  <p class="text-sm text-luxelle-tertiary">From</p>
                  <p class="text-lg font-semibold text-rose-gold">${{ service.price }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-luxelle-tertiary">Duration</p>
                  <p class="text-lg font-semibold text-warm-gold">{{ service.duration }}m</p>
                </div>
              </div>

              <!-- Learn More Link -->
              <a href="#booking" class="text-rose-gold hover:text-warm-gold text-sm font-medium transition-colors">
                Learn More →
              </a>
            </div>
          </app-card>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  services = SERVICES;
}
