import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { ServicesComponent } from './features/services/services.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { BookingComponent } from './features/booking/booking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    PricingComponent,
    GalleryComponent,
    BookingComponent,
  ],
  template: `
    <div class="min-h-screen bg-luxelle text-luxelle">
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-about></app-about>
        <app-services></app-services>
        <app-pricing></app-pricing>
        <app-gallery></app-gallery>
        <app-booking></app-booking>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class AppComponent {}
