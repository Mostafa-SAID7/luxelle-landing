import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAVIGATION_LINKS } from '../../core/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';
import { LegalModalComponent, LegalSection } from '../../shared/components/ui/modal/legal-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, LegalModalComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @ViewChild('legalModal') legalModal!: LegalModalComponent;

  navigationLinks = NAVIGATION_LINKS;

  openLegal(page: LegalSection) {
    this.legalModal.open(page);
  }
}
