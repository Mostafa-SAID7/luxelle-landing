# Luxelle Landing Page - Installation & First Run Guide

## ✅ Already Installed & Configured

Your project already has the following properly configured:

- ✅ **Angular 21/22** with Standalone Components
- ✅ **Tailwind CSS** with custom color palette (dark/light modes)
- ✅ **PostCSC & Autoprefixer** configured
- ✅ **Angular Animations** module
- ✅ **ngx-toastr** for notifications
- ✅ **globals.css** with glassmorphism, glow effects, and utilities
- ✅ **tailwind.config.ts** with custom colors, animations, and shadows
- ✅ **app.config.ts** with providers configured

## 📦 Missing Dependencies to Install

You need to install these additional packages:

```bash
npm install ngx-particles tsparticles-engine tsparticles-slim lucide-angular
```

### What Each Package Does:
- **ngx-particles**: Angular wrapper for ts-particles (hero section particle effects)
- **tsparticles-engine**: Core particle engine
- **tsparticles-slim**: Lightweight particle preset
- **lucide-angular**: Icon library for service cards and UI elements

## 🚀 First Run Steps

### Step 1: Install Missing Dependencies
```bash
npm install ngx-particles tsparticles-engine tsparticles-slim lucide-angular
```

### Step 2: Verify Installation
```bash
npm list ngx-particles lucide-angular
```

### Step 3: Start Development Server
```bash
ng serve
```

Or if you prefer npm:
```bash
npm start
```

### Step 4: Open in Browser
Navigate to: `http://localhost:4200`

## 📋 What's Already Done (No Action Needed)

### Configuration Files
- ✅ `tailwind.config.ts` - Custom colors, animations, shadows
- ✅ `postcss.config.js` - PostCSS pipeline
- ✅ `src/styles/globals.css` - Global styles, utilities, theme variables
- ✅ `src/styles/tailwind.css` - Tailwind directives
- ✅ `src/app/app.config.ts` - Angular providers (Router, Animations, Toastr)

### Styling System
- ✅ Dark mode colors: `#0F0F0F` background, `#E8B4BC` rose gold accent
- ✅ Light mode colors: `#FAF8F5` background with appropriate accents
- ✅ Glassmorphism utilities: `.glass-card` class
- ✅ Glow effects: `.luxelle-glow`, `.luxelle-glow-gold`
- ✅ Button styles: `.luxelle-button`, `.luxelle-button-outline`
- ✅ Animations: `fade-in-up`, `shimmer`, `glow-pulse`, etc.
- ✅ CSS Variables for theme switching

### Services Already Exist
- ✅ `src/app/core/services/theme.service.ts` - Theme management
- ✅ `src/app/core/services/booking.service.ts` - Booking logic
- ✅ `src/app/core/services/notification.service.ts` - Toast notifications

### Components Already Exist
- ✅ `src/app/features/hero/hero.component.ts`
- ✅ `src/app/features/about/about.component.ts`
- ✅ `src/app/features/services/services.component.ts`
- ✅ `src/app/features/pricing/pricing.component.ts`
- ✅ `src/app/features/gallery/gallery.component.ts`
- ✅ `src/app/features/booking/booking.component.ts`
- ✅ `src/app/shared/components/ui/button/button.component.ts`
- ✅ `src/app/shared/components/ui/card/card.component.ts`
- ✅ `src/app/shared/components/ui/input/input.component.ts`

## 🎯 Next Steps After Installation

1. **Install dependencies** (see Step 1 above)
2. **Start dev server** with `ng serve`
3. **Open tasks.md** in the spec folder
4. **Begin Phase 1 tasks** - Most setup is already done, focus on:
   - Configuring ngx-particles
   - Creating remaining UI components
   - Implementing feature components

## 📝 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   ├── models/
│   │   └── services/
│   ├── shared/
│   │   ├── animations/
│   │   ├── components/
│   │   ├── directives/
│   │   └── particles/
│   ├── features/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── services/
│   │   ├── pricing/
│   │   ├── gallery/
│   │   └── booking/
│   ├── layout/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles/
│   ├── globals.css ✅
│   └── tailwind.css ✅
├── tailwind.config.ts ✅
├── postcss.config.js ✅
└── main.ts
```

## ⚠️ Important Notes

### No Duplicates
- Do NOT reinstall Tailwind CSS (already configured)
- Do NOT reconfigure PostCSC (already done)
- Do NOT recreate globals.css (already complete)
- Do NOT reinstall Angular Animations (already in app.config.ts)
- Do NOT reinstall ngx-toastr (already configured)

### Only Install
- `ngx-particles` (for hero section particles)
- `tsparticles-engine` (particle engine)
- `tsparticles-slim` (lightweight presets)
- `lucide-angular` (icons for services)

## 🔧 Troubleshooting

### If `ng serve` fails:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
ng serve
```

### If particles don't work:
```bash
# Verify ngx-particles is installed
npm list ngx-particles

# If missing, install it
npm install ngx-particles tsparticles-engine tsparticles-slim
```

### If icons don't show:
```bash
# Verify lucide-angular is installed
npm list lucide-angular

# If missing, install it
npm install lucide-angular
```

## 📚 Documentation References

- **Requirements**: `.kiro/specs/luxelle-landing-page/requirements.md`
- **Design**: `.kiro/specs/luxelle-landing-page/design.md`
- **Tasks**: `.kiro/specs/luxelle-landing-page/tasks.md`

## ✨ Ready to Start?

1. Run: `npm install ngx-particles tsparticles-engine tsparticles-slim lucide-angular`
2. Run: `ng serve`
3. Open: `http://localhost:4200`
4. Start implementing tasks from `tasks.md`

Happy coding! 🚀
