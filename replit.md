# Imoexo International - React & TypeScript Application

## Overview
Modern, fully-responsive React.js application with TypeScript for Imoexo International, an import-export business based in Pune. The application features sophisticated animations, smooth transitions, and an elegant user experience built with cutting-edge technologies.

## Project Structure
```
├── client/                 # React Frontend (TypeScript)
│   ├── src/
│   │   ├── components/    # Reusable components (Header, Footer, AnimatedCard) - .tsx
│   │   ├── pages/         # Page components (Home, Services, About, Contact, Estore) - .tsx
│   │   ├── contexts/      # React contexts (CartContext) - .tsx
│   │   ├── App.tsx        # Main app with routing
│   │   ├── main.tsx       # App entry point
│   │   └── index.css      # Global styles with Tailwind
│   ├── public/            # Static assets (images)
│   └── vite.config.js     # Vite configuration
├── server/                # Node.js Backend
│   └── index.js          # Express server
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for Node tooling
└── [legacy HTML files]   # Original static files (archived)
```

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript with gradual migration support
- **Vite** - Lightning-fast build tool with native TypeScript support
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **React Router** - Client-side routing

### Backend
- **Node.js 20** - JavaScript runtime
- **Express 5** - Web application framework
- **CORS** - Cross-origin resource sharing

## Animation Features Implemented

### 🪶 Hover Animations
- **Scale-up (zoom-in)** - Cards grow 1.05x on hover
- **Lift with shadow** - Cards move up with soft shadow
- **Border glow** - Gradient glow appears on hover

### 🚀 Entrance Animations (on scroll)
- **Fade-up** - Cards fade in from below
- **Slide-in** - Cards slide from left/right
- **Zoom-in** - Subtle zoom when entering viewport
- **Flip-in** - Smooth flip animation on first load

### 🌈 Continuous Background Animations
- **Gradient shift** - Animated background gradients
- **Shimmer effect** - Light sweep across elements

### ⚙️ Micro-interactions
- **Icon bounce** - Icons bounce on hover
- **Tilt (parallax)** - Cards tilt with mouse movement
- **Button effects** - Smooth hover and tap animations

## Development Setup

### Frontend (Port 5000)
```bash
cd client
npm install
npm run dev
```

### Backend (Port 3001)
```bash
cd server
npm install
npm start
```

### Both Servers
Workflows are configured to run both automatically:
- **Frontend**: Vite dev server on port 5000 (webview)
- **Backend**: Express server on port 3001 (console)

## Deployment Configuration
- **Type**: Autoscale (static site with backend)
- **Build**: `npm run build --prefix client`
- **Run**: Both frontend and backend servers

## Key Components

### AnimatedCard
Reusable component with all animation types:
- Configurable entrance animations
- Hover effects (scale, lift, glow)
- Optional tilt/parallax on mouse move
- Viewport detection for scroll animations

### Header
- Responsive navigation with mobile menu
- Animated logo hover effect
- Route highlighting
- Social media icons with bounce animations

### Pages
- **Home**: Hero section, services, products, mission/vision, contact form
- **Services**: Service cards with detailed features
- **About**: Company values and mission/vision
- **Contact**: Contact form with info cards
- **Estore**: Product catalog with cart functionality

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Hamburger menu for mobile devices
- Grid layouts adapt to screen sizes (1/2/3/4 columns)
- Touch-friendly interactions

## Admin Panel Features

### User Management & Access Control
- **Role-Based Access Control (RBAC)**: Complete permission system with three roles:
  - **Super Admin**: Full access to all features and modules
  - **Admin**: Customizable access based on assigned permissions
  - **User**: Limited access based on assigned permissions
- **Permission Modules**: Dashboard, Content, Comments, Inquiries, Gallery, Media Library, Settings
- **User Management UI**: Create, edit, delete users with real-time validation
- **Security Features**:
  - Built-in super admin (ID 1) cannot be modified or deleted
  - Only super admin cannot be demoted, disabled, or deleted
  - Self-deletion prevention
  - Role whitelist validation (super_admin, admin, user)
  - Permission validation against allowed modules
  - Email format validation
  - Password hashing with bcrypt
- **Database Schema**: admin_users table with roles, permissions (JSON), status, created_by, last_login tracking
- **Sidebar Filtering**: Dynamic sidebar showing only modules based on user permissions
- **Access Control**: Backend and frontend route protection with access denied messages

### Inquiries Management
- **Excel Export**: Download all inquiries with complete data including company info, contacts, and messages
- **Multi-source Support**: Handles inquiries from Contact, Services, and Solutions forms
- **Search & Filter**: Search by company/contact and filter by inquiry type

### Content Management
- **Blog Management**: Create, edit, delete blog posts with rich text editor
- **SEO Integration**: Meta tags, descriptions, keywords for all content
- **Table of Contents**: Auto-generated clickable TOC for blog articles
- **Author Profiles**: Display author information with fallback handling

## Recent Changes

### November 17, 2025
- **User Management System Complete**: Implemented comprehensive role-based access control
  - Created database migration schema (001_user_management_schema.sql)
  - Built secure backend API (server/users-admin.php) with full CRUD operations
  - Updated authentication system to support roles and permissions
  - Created UsersManagement page with create/edit/delete UI
  - Implemented permission-based sidebar filtering
  - Added Excel export to Inquiries page using xlsx library
  - Hardened security: role validation, permission validation, email validation, super admin protection
  - Architect-verified security implementation - production ready

### October 27, 2025
- **TypeScript Migration Complete**: Successfully migrated entire project from JSX to TypeScript
  - All 21 .jsx files renamed to .tsx
  - Added TypeScript type annotations to all components with props (SEO, AnimatedCard, GlassCard, GlitchText, FAQ, StatsCounter, CartContext)
  - Created tsconfig.json with gradual migration settings (allowJs: true, checkJs: true)
  - Configured strict typing for context providers (CartContext with proper TypeScript interfaces)
  - Added type safety for props, state, and event handlers
  - App compiles and runs successfully with no TypeScript errors
  - Maintained full functionality - all features work exactly as before
  - Ready for incremental type strictness improvements

### October 16, 2025
- **Import Migration Complete**: Successfully migrated project to Replit environment with all dependencies installed
- **Contact Form PHP Backend Integration**: Connected contact form to production PHP backend (https://www.t-imoexo.com/contact.php) with proper JSON payload and MySQL database integration
- **FAQ Sections**: Added comprehensive FAQ sections to all pages:
  - Home: 5 FAQs about T-ImoExo services and operations
  - Services: 5 FAQs about import-export services, shipping, customs, packaging, and compliance
  - Solutions: 5 FAQs about trade solutions, startup support, logistics, market insights, and documentation
  - About: 5 FAQs about founder, mission, location, industries, and reliability
  - Contact: 5 FAQs about contact methods, office location, working hours, response time, and consultations
- **SEO Meta Tags**: Implemented comprehensive SEO meta tags on all pages with proper titles, descriptions, keywords, and canonical URLs
- **Contact Information**: Added phone number (+91 82374 39036) to Footer component with click-to-call functionality
- **SEO Files**: Created sitemap.xml and robots.txt files for improved search engine indexing
- **New Components**: 
  - FAQ component: Reusable accordion-style FAQ component with animations
  - SEO component: Dynamic SEO meta tag manager for all pages

### October 13, 2025
- **Complete Color Theme Migration**: Successfully migrated from amber/orange palette to emerald green accent theme
  - All legacy colors eliminated from codebase (amber-*, orange-*, yellow-* utilities)
  - Updated Tailwind config with new color palette
  - Replaced all hardcoded rgba/hex values with theme colors
  - Removed 176 lines of commented legacy code from BackgroundEffects
  - Architect-validated production-ready implementation
- **New Color Scheme**: Professional navy blue and emerald green palette
  - Primary: Navy Blue (#0B1B4F) for headers, footers, and primary sections
  - Accent: Emerald Green (#2DAA60) for buttons, icons, and highlights
  - Neutral: Light Gray (#F3F4F6) for backgrounds and dividers
  - Text: Charcoal Gray (#1F1F1F) for body content
  - White (#FFFFFF) for clean backgrounds
- **Advanced Visual Effects**: Added moving background grid, floating particles, rotating geometric shapes, and parallax effects to all pages
- **Shopping Cart**: Implemented full cart functionality with add/remove items, cart icon in navbar, and persistent storage
- **Solutions Page**: Created product catalog with modal detail views and cart integration
- **Team Information**: Updated About page with contact details (Yash Bhalekar - Founder, Rohan Bhosale - Director) and office address
- **Glitch Text Effects**: Added animated glitch text effects to all page headings
- **Scroll Management**: Implemented scroll-to-top on navigation for better UX
- **Footer Update**: Reorganized Legal section to appear after Resources
- **Content Update**: Updated homepage headline to "Your Trusted Partner in Global Trade & Supply Chain Solutions"
- **Background Effects**: Enhanced visibility with animated parallax gradients and 3D floating elements
- Converted static HTML/CSS website to React.js SPA
- Implemented Node.js/Express backend server
- Added Tailwind CSS v4 with custom theme
- Integrated Framer Motion for advanced animations
- Created reusable animated components (BackgroundEffects, GlitchText)
- Set up responsive layouts for all screen sizes
- Configured Vite with host allowance for Replit
- Configured deployment for autoscale
- **Updated branding**: Integrated new T-IMOEXO logo
- **Contact form enhanced**: Added form state management, validation, and submission handling with success/error feedback

## Best Practices Implemented
- Component-based architecture
- Performance-optimized animations (GPU-accelerated)
- Viewport-based animation triggers (loads only when visible)
- Responsive design with mobile-first approach
- Clean separation of concerns
- Reusable animation utilities
- Professional, subtle animations (not flashy)

## User Preferences
- Clean white background design
- Emerald green accent colors (professional, trustworthy)
- Dark text with emerald green highlights on interactive elements
- Modern, professional design aesthetic
- Smooth, subtle animations
- Responsive across all devices
- Fast loading and performance

## Color Palette
- **Primary (Navy Blue)**: #0B1B4F - Headers, footers, primary sections
- **Accent (Emerald Green)**: #2DAA60 - Buttons, icons, highlights, interactive elements
- **Neutral (Light Gray)**: #F3F4F6 - Backgrounds, dividers, subtle elements
- **Text (Charcoal Gray)**: #1F1F1F - Body content, descriptions
- **White**: #FFFFFF - Clean backgrounds, cards
- **Error State**: Red (retained for UX standards)
- **Tailwind Utilities**: primary-*, accent-*, neutral-*, text-* for consistent theming
