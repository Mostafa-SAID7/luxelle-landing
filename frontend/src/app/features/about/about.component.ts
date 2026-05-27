import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { LucideAngularModule, Sparkles, Heart, Award } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
