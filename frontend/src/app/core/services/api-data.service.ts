import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ApiService {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  price: number;
  durationMinutes: number;
  isAvailable: boolean;
}

export interface ApiPricingTier {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  isPopular: boolean;
  features: string[];
  displayOrder: number;
}

@Injectable({ providedIn: 'root' })
export class ApiDataService {
  private http = inject(HttpClient);

  // ── Services ──────────────────────────────────────────────────────────────
  services        = signal<ApiService[]>([]);
  servicesLoading = signal(true);
  servicesError   = signal<string | null>(null);

  // ── Pricing ───────────────────────────────────────────────────────────────
  pricingTiers        = signal<ApiPricingTier[]>([]);
  pricingLoading      = signal(true);
  pricingError        = signal<string | null>(null);

  constructor() {
    this.loadServices();
    this.loadPricingTiers();
  }

  private loadServices(): void {
    this.http.get<ApiService[]>(`${environment.apiUrl}/services/available`).subscribe({
      next: data => {
        this.services.set(data);
        this.servicesLoading.set(false);
      },
      error: () => {
        this.servicesError.set('Could not load services');
        this.servicesLoading.set(false);
      },
    });
  }

  private loadPricingTiers(): void {
    this.http.get<ApiPricingTier[]>(`${environment.apiUrl}/pricing`).subscribe({
      next: data => {
        this.pricingTiers.set(data);
        this.pricingLoading.set(false);
      },
      error: () => {
        this.pricingError.set('Could not load pricing');
        this.pricingLoading.set(false);
      },
    });
  }

  reload(): void {
    this.servicesLoading.set(true);
    this.pricingLoading.set(true);
    this.loadServices();
    this.loadPricingTiers();
  }
}
