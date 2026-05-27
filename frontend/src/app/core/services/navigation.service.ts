import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  mobileMenuOpen = signal(false);
  scrollPosition = signal(0);
  navbarScrolled = computed(() => this.scrollPosition() > 50);

  constructor() {
    this.setupScrollListener();
  }

  private setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.scrollPosition.set(window.scrollY);
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openMobileMenu(): void {
    this.mobileMenuOpen.set(true);
  }

  updateScrollPosition(): void {
    this.scrollPosition.set(window.scrollY);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMobileMenu();
    }
  }
}
