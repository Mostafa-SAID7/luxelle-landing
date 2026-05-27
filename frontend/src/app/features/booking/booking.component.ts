import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { DatePickerComponent } from '../../shared/components/ui/date-picker/date-picker.component';
import { SelectComponent, SelectOption } from '../../shared/components/ui/select/select.component';
import { BookingService } from '../../core/services/booking.service';
import { NotificationService } from '../../core/services/notification.service';
import { ConfirmationModalService } from '../../shared/services/confirmation-modal.service';
import { SERVICES } from '../../core/constants/app.constants';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollRevealDirective,
    CardComponent,
    ButtonComponent,
    DatePickerComponent,
    SelectComponent,
    LucideAngularModule,
  ],
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  private fb            = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private notificationService = inject(NotificationService);
  private confirmModal  = inject(ConfirmationModalService);

  bookingForm!: FormGroup;
  isSubmitting = signal(false);

  serviceOptions = computed<SelectOption[]>(() =>
    SERVICES.map(s => ({ value: s.id, label: `${s.name} — $${s.price}` }))
  );

  timeOptions: SelectOption[] = [
    { value: '09:00', label: '9:00 AM' },
    { value: '09:30', label: '9:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '13:30', label: '1:30 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '14:30', label: '2:30 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '15:30', label: '3:30 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
    { value: '17:00', label: '5:00 PM' },
  ];

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      fullName:      ['', [Validators.required, Validators.minLength(2)]],
      email:         ['', [Validators.required, Validators.email]],
      phone:         ['', [Validators.required, Validators.pattern(/^\d{7,}$/)]],
      serviceType:   ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      notes:         [''],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.notificationService.error('Please fill in all required fields');
      return;
    }

    const confirmed = await this.confirmModal.confirm({
      title:       'Confirm Appointment',
      message:     'Ready to book your appointment? We will reach out shortly to confirm the details.',
      confirmText: 'Book Now',
      cancelText:  'Review',
      variant:     'info',
    });

    if (!confirmed) return;

    this.isSubmitting.set(true);

    const bookingData = {
      ...this.bookingForm.value,
      preferredDate: new Date(this.bookingForm.value.preferredDate),
    };

    const response = this.bookingService.submitBooking(bookingData);

    if (response.success) {
      this.notificationService.success('Appointment booked! We will confirm shortly. ✨');
      this.bookingForm.reset();
    } else {
      this.notificationService.error(response.message);
    }

    this.isSubmitting.set(false);
  }
}
