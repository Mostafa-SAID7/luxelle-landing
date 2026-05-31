import { LucideAngularModule, Sparkles, Heart, Award, Calendar, Clock, Phone, Mail, User, FileText, X, ArrowDown, ArrowRight, Check, Scissors, Palette, Droplet, Eye, Hand, MapPin, Facebook, Instagram, Twitter, Linkedin, Moon, Sun, Menu, ZoomIn, CalendarCheck, Loader, Image, AlertCircle, Star, ChevronLeft, ChevronRight, ChevronDown, Trash2, AlertTriangle, Info, CheckCircle2, ShoppingBag, Minus, Plus, Package, Lock, ShieldCheck, BookOpen } from 'lucide-angular';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(LucideAngularModule.pick({ Sparkles, Heart, Award, Calendar, Clock, Phone, Mail, User, FileText, X, ArrowDown, ArrowRight, Check, Scissors, Palette, Droplet, Eye, Hand, MapPin, Facebook, Instagram, Twitter, Linkedin, Moon, Sun, Menu, ZoomIn, CalendarCheck, Loader, Image, AlertCircle, Star, ChevronLeft, ChevronRight, ChevronDown, Trash2, AlertTriangle, Info, CheckCircle2, ShoppingBag, Minus, Plus, Package, Lock, ShieldCheck, BookOpen })),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
};
