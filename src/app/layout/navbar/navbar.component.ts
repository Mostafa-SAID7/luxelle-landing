import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { NAVIGATION_LINKS } from '../../core/constants/app.constants';
import { LucideAngularModule, Moon, Sun, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, LucideAngularModule],
  templateUrl: './navbar.component.html',
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
