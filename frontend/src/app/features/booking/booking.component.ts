import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { BookingService } from '../../core/services/booking.service';
import { NotificationService } from '../../core/services/notification.service';
import { SERVICES } from '../../core/constants/app.constants';
import { LucideAngularModule, Calendar, Clock, Phone, Mail, User, FileText } from 'lucide-angular';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollRevealDirective,
    CardComponent,
    ButtonComponent, LucideAngularModule],
  templateUrl: './booking.component.html',
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
