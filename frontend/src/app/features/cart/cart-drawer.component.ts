import { Component, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../core/services/cart.service';
import { StripeService } from '../../core/services/stripe.service';
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
export class CartDrawerComponent implements OnInit, OnDestroy {
  cart = inject(CartService);
  private fb = inject(FormBuilder);
  private stripeService = inject(StripeService);

  isProcessing = false;
  paymentError: string | null = null;
  cardElementInitialized = false;

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

  ngOnInit(): void {
    // Use effect to watch for step changes
    effect(() => {
      if (this.cart.step() === 2 && !this.cardElementInitialized) {
        // Wait longer for DOM to be fully rendered before initializing card element
        // Increased from 200ms to 500ms to ensure all animations complete
        setTimeout(() => {
          this.initializeCardElement().catch(err => {
            console.error('Card element initialization failed:', err);
            this.paymentError = 'Failed to load payment form. Please try again.';
          });
        }, 500);
      }
    });
  }

  ngOnDestroy(): void {
    this.stripeService.destroyCardElement();
  }

  private async initializeCardElement(): Promise<void> {
    try {
      await this.stripeService.initializeCardElement();
      this.cardElementInitialized = true;
    } catch (err) {
      console.error('Failed to initialize card element:', err);
      this.paymentError = 'Failed to load payment form. Please refresh and try again.';
    }
  }

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

  async proceed(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    // Ensure card element is initialized before proceeding
    if (!this.cardElementInitialized) {
      try {
        await this.initializeCardElement();
      } catch (err) {
        console.error('Failed to initialize card element before payment:', err);
        this.paymentError = 'Payment form not ready. Please refresh and try again.';
        return;
      }
    }

    this.isProcessing = true;
    this.paymentError = null;

    try {
      const v = this.form.value;
      const bookingData = {
        name:  v.name!,
        email: v.email!,
        phone: v.phone!,
        date:  v.date ?? null,
        time:  v.time!,
        notes: v.notes ?? '',
      };

      // Create payment intent
      const paymentRequest = {
        bookingId: 0,
        serviceId: this.cart.items()[0]?.serviceId ? parseInt(this.cart.items()[0].serviceId) : 1,
        amount: this.cart.subtotal(),
        currency: 'usd',
        customerEmail: bookingData.email,
        customerName: bookingData.name
      };

      console.log('Creating payment intent with:', paymentRequest);
      const paymentResponse = await this.stripeService.createPaymentIntent(paymentRequest);
      console.log('Payment intent created:', paymentResponse);

      // Confirm payment with Stripe
      console.log('Confirming payment with client secret:', paymentResponse.clientSecret);
      const confirmResult = await this.stripeService.confirmPayment(paymentResponse.clientSecret);
      console.log('Payment confirmation result:', confirmResult);

      if (confirmResult.error) {
        this.paymentError = confirmResult.error.message || 'Payment failed';
        this.isProcessing = false;
        return;
      }

      // Verify payment status
      if (paymentResponse.paymentIntentId) {
        const statusResult = await this.stripeService.confirmPaymentStatus(paymentResponse.paymentIntentId);
        if (statusResult.success) {
          this.cart.confirm(bookingData);
        } else {
          this.paymentError = 'Payment verification failed';
          this.isProcessing = false;
        }
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      this.paymentError = err.message || 'An error occurred during payment';
      this.isProcessing = false;
    }
  }

  bookAnother(): void {
    this.form.reset();
    this.paymentError = null;
    this.cart.bookAnother();
  }
}
