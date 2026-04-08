import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { GALLERY_IMAGES } from '../../core/constants/app.constants';
import { X } from 'lucide-angular';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, X],
  template: `
    <section id="gallery" class="section-padding bg-luxelle-card/50">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appScrollReveal>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Our <span class="text-gradient">Gallery</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-rose-gold to-warm-gold mx-auto rounded-full"></div>
          <p class="text-luxelle-tertiary mt-4 max-w-2xl mx-auto">
            Explore the beauty and elegance of our premium facilities and treatments
          </p>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let image of galleryImages"
            [appScrollReveal]="'fadeInUp'"
            class="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            (click)="openLightbox(image)"
          >
            <!-- Image Placeholder -->
            <div class="w-full h-full bg-gradient-to-br from-rose-gold/20 to-warm-gold/20 flex items-center justify-center group-hover:from-rose-gold/30 group-hover:to-warm-gold/30 transition-all duration-300">
              <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-gold/30 transition-all">
                  <span class="text-3xl">📸</span>
                </div>
                <p class="text-luxelle-secondary font-medium">{{ image.title }}</p>
              </div>
            </div>

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div class="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p class="text-sm font-medium">View Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div
      *ngIf="selectedImage()"
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      (click)="closeLightbox()"
    >
      <div class="relative max-w-4xl w-full" (click)="$event.stopPropagation()">
        <!-- Close Button -->
        <button
          (click)="closeLightbox()"
          class="absolute -top-12 right-0 text-white hover:text-rose-gold transition-colors"
          aria-label="Close lightbox"
        >
          <X class="w-8 h-8" />
        </button>

        <!-- Image -->
        <div class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-rose-gold/20 to-warm-gold/20 flex items-center justify-center">
          <div class="text-center">
            <div class="w-24 h-24 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto mb-4">
              <span class="text-6xl">📸</span>
            </div>
            <p class="text-luxelle-secondary font-medium text-lg">{{ selectedImage()?.title }}</p>
          </div>
        </div>

        <!-- Image Info -->
        <div class="mt-4 text-center">
          <p class="text-luxelle-secondary">{{ selectedImage()?.category }}</p>
        </div>
      </div>
    </div>
  `,
})
export class GalleryComponent {
  galleryImages = GALLERY_IMAGES;
  selectedImage = signal<(typeof GALLERY_IMAGES)[0] | null>(null);

  openLightbox(image: (typeof GALLERY_IMAGES)[0]): void {
    this.selectedImage.set(image);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }
}
