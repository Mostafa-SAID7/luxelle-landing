import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getButtonClasses()"
      [disabled]="disabled()"
      (click)="onClick.emit()"
      [type]="type()"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  onClick = output<void>();

  getButtonClasses(): string {
    const baseClasses = 'font-medium rounded-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-gold disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
      primary: 'bg-rose-gold text-luxelle-dark hover:scale-105 hover:shadow-luxelle-glow active:scale-95',
      outline: 'border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:bg-opacity-10 active:scale-95',
      ghost: 'text-rose-gold hover:bg-rose-gold hover:bg-opacity-10 active:scale-95',
    };

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  }
}
