import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2">
      <label *ngIf="label()" [for]="id()" class="text-sm font-medium text-luxelle-secondary">
        {{ label() }}
        <span *ngIf="required()" class="text-rose-gold">*</span>
      </label>
      <input
        [id]="id()"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [disabled]="disabled()"
        [required]="required()"
        class="px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
      />
      <span *ngIf="error()" class="text-sm text-red-400">{{ error() }}</span>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'time'>('text');
  placeholder = input('');
  label = input('');
  id = input('');
  error = input('');
  required = input(false);
  disabled = input(false);
  value = input('');

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: string): void {
    // Handled by input signal
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled by disabled input
  }
}
