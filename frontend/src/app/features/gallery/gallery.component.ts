import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { GALLERY_IMAGES } from '../../core/constants/app.constants';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, LucideAngularModule],
  templateUrl: './gallery.component.html',
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
