# Luxelle Landing Page - Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm start
```

Visit `http://localhost:4200` in your browser.

## What Was Done

✅ **Component Splitting**: All 11 components split into separate `.ts` and `.html` files
- Features: About, Booking, Gallery, Hero, Pricing, Services
- Layout: Navbar, Footer
- UI Components: Button, Card, Input

✅ **Phase 1 - Project Setup**: Complete
- Angular 18 with Standalone Components
- Tailwind CSS with custom design system
- PostCSS and Autoprefixer configured
- Global styling with CSS variables
- Angular animations module
- ngx-particles configuration
- ngx-toastr notifications

✅ **Phase 2 - Core Services**: Complete
- ThemeService (dark/light mode with localStorage)
- BookingService (form validation and submission)
- NotificationService (toast notifications)
- NavigationService (menu and scroll state)
- GalleryService (lightbox state management)

✅ **Phase 3-8 - Components**: Complete
- Navbar with theme toggle and mobile menu
- Hero section with particles
- About section with responsive layout
- Services with 8 service cards
- Pricing with 4 tiers
- Gallery with lightbox
- Booking form with validation
- Footer with links and social media

## Required Packages

All packages are listed in `package.json`. Key dependencies:

**Angular Core**
- @angular/animations
- @angular/common
- @angular/compiler
- @angular/core
- @angular/forms
- @angular/platform-browser
- @angular/platform-browser-dynamic
- @angular/router

**UI & Styling**
- lucide-angular (icons)
- ngx-toastr (notifications)
- tailwindcss (styling)
- autoprefixer
- postcss

**Utilities**
- rxjs
- tslib
- zone.js

## Installation Troubleshooting

### If npm install fails:

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and package-lock.json**
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. **Install with legacy peer deps**
   ```bash
   npm install --legacy-peer-deps
   ```

### If you see module errors:

The project uses Angular 18 with lucide-angular which has peer dependencies for Angular 13-16. This is handled by the `--legacy-peer-deps` flag and is safe.

## Next Steps

1. Run `npm install --legacy-peer-deps`
2. Run `npm start`
3. Open browser to `http://localhost:4200`
4. Start developing!

## Build for Production

```bash
npm run build:prod
```

Output will be in the `dist/` directory.

## Testing

```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
```

## Linting

```bash
npm run lint
```

## Project Structure

- `src/app/` - Application code
  - `core/` - Services, models, constants
  - `features/` - Feature components (Hero, About, Services, etc.)
  - `layout/` - Layout components (Navbar, Footer)
  - `shared/` - Shared components, directives, animations
- `src/styles/` - Global styles and Tailwind configuration
- `.kiro/specs/` - Specification documents

## Documentation

- `.kiro/INSTALLATION_GUIDE.md` - Detailed installation guide
- `.kiro/specs/luxelle-landing-page/requirements.md` - Requirements
- `.kiro/specs/luxelle-landing-page/design.md` - Design document
- `.kiro/specs/luxelle-landing-page/tasks.md` - Implementation tasks
