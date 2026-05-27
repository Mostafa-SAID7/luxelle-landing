import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAVIGATION_LINKS, SOCIAL_LINKS } from '../../core/constants/app.constants';
import { LucideAngularModule, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, LucideAngularModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  navigationLinks = NAVIGATION_LINKS;
  socialLinks = SOCIAL_LINKS;
}
