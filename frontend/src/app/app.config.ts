import { LucideAngularModule, Sparkles, Heart, Award, Calendar, Clock, Phone, Mail, User, FileText, X, ArrowDown, Check, Scissors, Palette, Droplet, Eye, Hand, MapPin, Facebook, Instagram, Twitter, Linkedin, Moon, Sun, Menu } from 'lucide-angular';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(LucideAngularModule.pick({ Sparkles, Heart, Award, Calendar, Clock, Phone, Mail, User, FileText, X, ArrowDown, Check, Scissors, Palette, Droplet, Eye, Hand, MapPin, Facebook, Instagram, Twitter, Linkedin, Moon, Sun, Menu })),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
};
