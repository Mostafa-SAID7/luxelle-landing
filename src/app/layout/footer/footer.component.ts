import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAVIGATION_LINKS, SOCIAL_LINKS } from '../../core/constants/app.constants';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
  ],
  template: `
    <footer class="bg-luxelle-card/50 border-t border-rose-gold/10">
      <div class="section-container section-padding">
        <!-- Main Footer Content -->
        <div class="grid md:grid-cols-4 gap-8 mb-12">
          <!-- Brand -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-gold to-warm-gold flex-center">
                <span class="text-luxelle-dark font-bold text-lg">L</span>
              </div>
              <span class="text-2xl font-bold text-gradient">Luxelle</span>
            </div>
            <p class="text-luxelle-tertiary text-sm leading-relaxed">
              Premium beauty and wellness center dedicated to elegance and sophistication.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-semibold text-luxelle">Quick Links</h3>
            <ul class="space-y-2">
              <li *ngFor="let link of navigationLinks">
                <a
                  [href]="link.href"
                  class="text-luxelle-tertiary hover:text-rose-gold transition-colors text-sm"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h3 class="font-semibold text-luxelle">Contact</h3>
            <ul class="space-y-3">
              <li class="flex gap-3 items-start">
                <Phone class="w-4 h-4 text-rose-gold flex-shrink-0 mt-1" />
                <a href="tel:+1234567890" class="text-luxelle-tertiary hover:text-rose-gold transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </li>
              <li class="flex gap-3 items-start">
                <Mail class="w-4 h-4 text-rose-gold flex-shrink-0 mt-1" />
                <a href="mailto:info@luxelle.com" class="text-luxelle-tertiary hover:text-rose-gold transition-colors text-sm">
                  info@luxelle.com
                </a>
              </li>
              <li class="flex gap-3 items-start">
                <MapPin class="w-4 h-4 text-rose-gold flex-shrink-0 mt-1" />
                <span class="text-luxelle-tertiary text-sm">
                  123 Beauty Lane<br />
                  Elegance City, EC 12345
                </span>
              </li>
            </ul>
          </div>

          <!-- Social Links -->
          <div class="space-y-4">
            <h3 class="font-semibold text-luxelle">Follow Us</h3>
            <div class="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-rose-gold/10 flex-center hover:bg-rose-gold/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook class="w-5 h-5 text-rose-gold" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-rose-gold/10 flex-center hover:bg-rose-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram class="w-5 h-5 text-rose-gold" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-rose-gold/10 flex-center hover:bg-rose-gold/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter class="w-5 h-5 text-rose-gold" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-rose-gold/10 flex-center hover:bg-rose-gold/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin class="w-5 h-5 text-rose-gold" />
              </a>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-rose-gold/10 pt-8">
          <!-- Bottom Footer -->
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-luxelle-tertiary text-sm">
              &copy; 2024 Luxelle. All rights reserved.
            </p>
            <div class="flex gap-6">
              <a href="#" class="text-luxelle-tertiary hover:text-rose-gold transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" class="text-luxelle-tertiary hover:text-rose-gold transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  navigationLinks = NAVIGATION_LINKS;
  socialLinks = SOCIAL_LINKS;
}
