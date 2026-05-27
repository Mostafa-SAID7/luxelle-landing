import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../core/services/cart.service';
import { DatePickerComponent } from '../../shared/components/ui/date-picker/date-picker.component';
import { SelectComponent, SelectOption } from '../../shared/components/ui/select/select.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    DatePickerComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: './cart-drawer.component.html',
})
export class CartDrawerComponent {
  cart = inject(CartService);
  private fb = inject(FormBuilder);

  timeSlots: SelectOption[] = [
    '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
    '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM',
    '3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM',
    '6:00 PM','6:30 PM',
  ].map(t => ({ value: t, label: t }));

  form = this.fb.group({
    name:  ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    date:  [null as Date | null, Validators.required],
    time:  ['', Validators.required],
    notes: [''],
  });

  get f() { return this.form.controls; }

  isInvalid(ctrl: string): boolean {
    const c = this.form.get(ctrl);
    return !!(c?.invalid && c?.touched);
  }

  formatDate(d: Date | null | undefined): string {
    if (!d) return '—';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    }).format(new Date(d));
  }

  proceed(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.value;
    this.cart.confirm({
      name:  v.name!,
      email: v.email!,
      phone: v.phone!,
      date:  v.date ?? null,
      time:  v.time!,
      notes: v.notes ?? '',
    });
  }

  bookAnother(): void {
    this.form.reset();
    this.cart.bookAnother();
  }
}
