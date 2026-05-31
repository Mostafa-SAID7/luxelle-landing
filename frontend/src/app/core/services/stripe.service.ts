import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

export interface CreatePaymentIntentRequest {
  bookingId: number;
  serviceId: number;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
}

export interface PaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;

  constructor(private http: HttpClient) {
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublishableKey);
  }

  async initializeCardElement(): Promise<void> {
    if (!this.stripe) {
      await this.initializeStripe();
    }

    if (!this.elements) {
      this.elements = this.stripe!.elements();
    }

    if (!this.cardElement) {
      this.cardElement = this.elements.create('card', {
        style: {
          base: {
            fontSize: '14px',
            color: '#e5e7eb',
            '::placeholder': {
              color: '#9ca3af'
            }
          },
          invalid: {
            color: '#f87171'
          }
        }
      });

      const cardElementDiv = document.getElementById('card-element');
      if (cardElementDiv) {
        this.cardElement.mount(cardElementDiv);
      }
    }
  }

  async createPaymentIntent(request: CreatePaymentIntentRequest): Promise<PaymentResponse> {
    return this.http.post<PaymentResponse>(
      `${environment.apiUrl}/payments/create-payment-intent`,
      request
    ).toPromise() as Promise<PaymentResponse>;
  }

  async confirmPayment(clientSecret: string): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    if (!this.cardElement) {
      throw new Error('Card element not initialized');
    }

    return this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.cardElement,
        billing_details: {
          name: 'Customer'
        }
      }
    });
  }

  async confirmPaymentStatus(paymentIntentId: string): Promise<{ success: boolean; paymentIntentId: string }> {
    return this.http.get<{ success: boolean; paymentIntentId: string }>(
      `${environment.apiUrl}/payments/confirm-payment/${paymentIntentId}`
    ).toPromise() as Promise<{ success: boolean; paymentIntentId: string }>;
  }

  getPublishableKey(): Promise<{ publishableKey: string }> {
    return this.http.get<{ publishableKey: string }>(
      `${environment.apiUrl}/payments/publishable-key`
    ).toPromise() as Promise<{ publishableKey: string }>;
  }

  destroyCardElement(): void {
    if (this.cardElement) {
      this.cardElement.destroy();
      this.cardElement = null;
    }
  }
}
