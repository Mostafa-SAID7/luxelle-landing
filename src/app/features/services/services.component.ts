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
    LucideIcons.LucideAngularModule,
  ],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = SERVICES;
}
