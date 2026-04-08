import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getCardClasses()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  hoverable = input(true);
  glass = input(false);

  getCardClasses(): string {
    const baseClasses = 'rounded-xl p-6 transition-all duration-300';
    const hoverClasses = this.hoverable() ? 'hover:shadow-lg hover:shadow-rose-gold/20 hover:-translate-y-1' : '';
    const glassClasses = this.glass() ? 'glass-card' : 'luxelle-card';

    return `${baseClasses} ${glassClasses} ${hoverClasses}`;
  }
}
