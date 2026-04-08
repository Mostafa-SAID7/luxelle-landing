import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { NAVIGATION_LINKS } from '../../core/constants/app.constants';
import { Moon, Sun, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, Moon, Sun, Menu, X],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.glass-card]="isScrolled()"
      [class.bg-luxelle]="!isScrolled()"
    >
      <div class="section-container flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-gold to-warm-gold flex-center">
            <span class="text-luxelle-dark font-bold text-lg">L</span>
          </div>
          <span class="text-2xl font-bold text-gradient">Luxelle</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <a
            *ngFor="let link of navigationLinks"
            [href]="link.href"
            class="text-luxelle-secondary hover:text-rose-gold transition-colors"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button
            (click)="toggleTheme()"
            class="p-2 rounded-lg hover:bg-rose-gold/10 transition-colors"
            [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun *ngIf="isDark()" class="w-5 h-5 text-warm-gold" />
            <Moon *ngIf="!isDark()" class="w-5 h-5 text-rose-gold" />
          </button>

          <!-- Book Appointment Button -->
          <app-button
            variant="primary"
            size="md"
            class="hidden sm:block"
            (onClick)="scrollToBooking()"
          >
            Book Appointment
          </app-button>

          <!-- Mobile Menu Toggle -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg hover:bg-rose-gold/10 transition-colors"
            [attr.aria-label]="isMobileMenuOpen() ? 'Close menu' : 'Open menu'"
          >
            <Menu *ngIf="!isMobileMenuOpen()" class="w-6 h-6" />
            <X *ngIf="isMobileMenuOpen()" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        *ngIf="isMobileMenuOpen()"
        class="md:hidden border-t border-rose-gold/10 bg-luxelle-card"
      >
        <div class="section-container py-4 flex flex-col gap-4">
          <a
            *ngFor="let link of navigationLinks"
            [href]="link.href"
            class="text-luxelle-secondary hover:text-rose-gold transition-colors py-2"
            (click)="isMobileMenuOpen.set(false)"
          >
            {{ link.label }}
          </a>
          <app-button
            variant="primary"
            size="md"
            class="w-full"
            (onClick)="scrollToBooking()"
          >
            Book Appointment
          </app-button>
        </div>
      </div>
    </nav>

    <!-- Spacer for fixed navbar -->
    <div class="h-20"></div>
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);

  navigationLinks = NAVIGATION_LINKS;
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isDark = signal(true);

  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    this.isDark.set(this.themeService.isDarkMode());
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupScrollListener(): void {
    this.scrollListener = () => {
      this.isScrolled.set(window.scrollY > 50);
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDark.set(this.themeService.isDarkMode());
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((value) => !value);
  }

  scrollToBooking(): void {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      this.isMobileMenuOpen.set(false);
    }
  }
}
