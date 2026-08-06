import { Injectable, inject, signal } from '@angular/core';
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
        // Fall back to static data so the page renders without a backend
        this.services.set(FALLBACK_SERVICES);
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
        // Fall back to static data so the page renders without a backend
        this.pricingTiers.set(FALLBACK_PRICING);
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

// ── Static fallback data (used when API is unreachable) ────────────────────
const FALLBACK_SERVICES: ApiService[] = [
  { id: 1, name: 'Luxury Skincare',       description: 'Premium facial treatments with organic products and advanced techniques',   category: 'Skincare', icon: 'sparkles', price: 150, durationMinutes: 60, isAvailable: true },
  { id: 2, name: 'Hair Styling',           description: 'Expert hair cutting, coloring, and styling for all hair types',              category: 'Hair',     icon: 'scissors', price: 120, durationMinutes: 90, isAvailable: true },
  { id: 3, name: 'Makeup Services',        description: 'Professional makeup application for events and everyday looks',              category: 'Makeup',   icon: 'palette',  price: 100, durationMinutes: 45, isAvailable: true },
  { id: 4, name: 'Spa Experiences',        description: 'Relaxing spa treatments including massages and body treatments',             category: 'Spa',      icon: 'droplet',  price: 180, durationMinutes: 90, isAvailable: true },
  { id: 5, name: 'Lashes & Extensions',    description: 'Eyelash extensions, lifts, and tints for stunning eyes',                    category: 'Lashes',   icon: 'eye',      price:  80, durationMinutes: 60, isAvailable: true },
  { id: 6, name: 'Nails & Manicure',       description: 'Gel nails, manicures, pedicures with premium finishes',                     category: 'Nails',    icon: 'hand',     price:  70, durationMinutes: 45, isAvailable: true },
  { id: 7, name: 'Facial Treatments',      description: 'Specialized facials targeting specific skin concerns',                       category: 'Facial',   icon: 'star',     price: 140, durationMinutes: 60, isAvailable: true },
  { id: 8, name: 'Wellness Consultations', description: 'Personalized beauty and wellness consultations',                             category: 'Wellness', icon: 'heart',    price:  60, durationMinutes: 30, isAvailable: true },
];

const FALLBACK_PRICING: ApiPricingTier[] = [
  { id: 1, name: 'Essential', description: 'Perfect for getting started with our services', price:  99, icon: 'star',     isPopular: false, displayOrder: 1, features: ['One service per month', 'Basic skincare consultation', 'Access to our facilities', 'Email support'] },
  { id: 2, name: 'Premium',   description: 'Our most popular choice for regular clients',   price: 249, icon: 'crown',    isPopular: true,  displayOrder: 2, features: ['Four services per month', 'Priority booking', 'Personalized beauty plan', 'Phone & email support', '10% discount on additional services'] },
  { id: 3, name: 'Luxury',    description: 'Complete luxury experience',                    price: 499, icon: 'gem',      isPopular: false, displayOrder: 3, features: ['Unlimited services', 'VIP priority booking', 'Dedicated beauty consultant', '24/7 concierge support', 'Complimentary products', 'Exclusive events access'] },
  { id: 4, name: 'VIP',       description: 'Ultimate exclusive experience',                 price: 999, icon: 'sparkles', isPopular: false, displayOrder: 4, features: ['Everything in Luxury', 'Private treatment rooms', 'Personal stylist', 'Customized wellness program', 'Complimentary luxury products', 'Priority access to new services', 'Quarterly spa retreats'] },
];
