import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { BookingService } from '../../core/services/booking.service';
import { NotificationService } from '../../core/services/notification.service';
import { SERVICES } from '../../core/constants/app.constants';
import { Calendar, Clock, Phone, Mail, User, FileText } from 'lucide-angular';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollRevealDirective,
    CardComponent,
    ButtonComponent,
    Calendar,
    Clock,
    Phone,
    Mail,
    User,
    FileText,
  ],
  template: `
    <section id="booking" class="section-padding bg-luxelle">
      <div class="section-container">
        <!-- Section Title -->
        <div class="text-center mb-16" appScrollReveal>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Book Your <span class="text-gradient">Appointment</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-rose-gold to-warm-gold mx-auto rounded-full"></div>
          <p class="text-luxelle-tertiary mt-4 max-w-2xl mx-auto">
            Reserve your spot for a luxurious beauty and wellness experience
          </p>
        </div>

        <!-- Booking Form -->
        <div class="max-w-2xl mx-auto" appScrollReveal>
          <app-card class="!p-8">
            <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Name Field -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <User class="w-4 h-4 text-rose-gold" />
                  Full Name
                  <span class="text-rose-gold">*</span>
                </label>
                <input
                  type="text"
                  formControlName="fullName"
                  placeholder="Enter your full name"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
                />
                <span
                  *ngIf="bookingForm.get('fullName')?.invalid && bookingForm.get('fullName')?.touched"
                  class="text-sm text-red-400"
                >
                  Full name is required
                </span>
              </div>

              <!-- Email Field -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <Mail class="w-4 h-4 text-rose-gold" />
                  Email
                  <span class="text-rose-gold">*</span>
                </label>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="Enter your email"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
                />
                <span
                  *ngIf="bookingForm.get('email')?.invalid && bookingForm.get('email')?.touched"
                  class="text-sm text-red-400"
                >
                  Valid email is required
                </span>
              </div>

              <!-- Phone Field -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <Phone class="w-4 h-4 text-rose-gold" />
                  Phone Number
                  <span class="text-rose-gold">*</span>
                </label>
                <input
                  type="tel"
                  formControlName="phone"
                  placeholder="Enter your phone number"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
                />
                <span
                  *ngIf="bookingForm.get('phone')?.invalid && bookingForm.get('phone')?.touched"
                  class="text-sm text-red-400"
                >
                  Phone number is required
                </span>
              </div>

              <!-- Service Type -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <span class="text-rose-gold">✨</span>
                  Service Type
                  <span class="text-rose-gold">*</span>
                </label>
                <select
                  formControlName="serviceType"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
                >
                  <option value="">Select a service</option>
                  <option *ngFor="let service of services" [value]="service.id">
                    {{ service.name }} - ${{ service.price }}
                  </option>
                </select>
                <span
                  *ngIf="bookingForm.get('serviceType')?.invalid && bookingForm.get('serviceType')?.touched"
                  class="text-sm text-red-400"
                >
                  Service type is required
                </span>
              </div>

              <!-- Date Field -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <Calendar class="w-4 h-4 text-rose-gold" />
                  Preferred Date
                  <span class="text-rose-gold">*</span>
                </label>
                <input
                  type="date"
                  formControlName="preferredDate"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
                />
                <span
                  *ngIf="bookingForm.get('preferredDate')?.invalid && bookingForm.get('preferredDate')?.touched"
                  class="text-sm text-red-400"
                >
                  Date is required
                </span>
              </div>

              <!-- Time Field -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <Clock class="w-4 h-4 text-rose-gold" />
                  Preferred Time
                  <span class="text-rose-gold">*</span>
                </label>
                <input
                  type="time"
                  formControlName="preferredTime"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all"
                />
                <span
                  *ngIf="bookingForm.get('preferredTime')?.invalid && bookingForm.get('preferredTime')?.touched"
                  class="text-sm text-red-400"
                >
                  Time is required
                </span>
              </div>

              <!-- Notes Field -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-luxelle-secondary">
                  <FileText class="w-4 h-4 text-rose-gold" />
                  Additional Notes
                </label>
                <textarea
                  formControlName="notes"
                  placeholder="Any special requests or notes?"
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg bg-luxelle-card text-luxelle border border-rose-gold/20 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <app-button
                variant="primary"
                size="lg"
                type="submit"
                class="w-full"
                [disabled]="isSubmitting()"
              >
                {{ isSubmitting() ? 'Booking...' : 'Book Appointment' }}
              </app-button>

              <!-- Terms -->
              <p class="text-xs text-luxelle-tertiary text-center">
                By booking, you agree to our terms and conditions
              </p>
            </form>
          </app-card>
        </div>
      </div>
    </section>
  `,
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private notificationService = inject(NotificationService);

  bookingForm!: FormGroup;
  services = SERVICES;
  isSubmitting = signal(false);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      serviceType: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      notes: [''],
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.notificationService.error('Please fill in all required fields correctly');
      return;
    }

    this.isSubmitting.set(true);

    const bookingData = {
      ...this.bookingForm.value,
      preferredDate: new Date(this.bookingForm.value.preferredDate),
    };

    const response = this.bookingService.submitBooking(bookingData);

    if (response.success) {
      this.notificationService.success('Booking submitted successfully! We will confirm shortly.');
      this.bookingForm.reset();
    } else {
      this.notificationService.error(response.message);
    }

    this.isSubmitting.set(false);
  }
}
