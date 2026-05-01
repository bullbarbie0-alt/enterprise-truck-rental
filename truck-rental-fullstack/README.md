# 🚛 Enterprise Truck Rental - Full-Stack Application

A complete truck rental platform with customer tracking, admin dashboard, and real-time order management.

## Features

### Customer Portal
- 🏠 **Home** - Browse fleet, make reservations, view features
- 🚛 **Fleet** - Detailed vehicle listings with specs and pricing
- 📍 **Locations** - Search rental branches across USA/Canada
- ✉️ **Contact** - FAQ accordion, contact form
- 🔍 **Track Order** - Enter order number to see real-time reservation status and tracking history

### Admin Dashboard (`/admin`)
- 📊 **Dashboard** - Revenue, reservation stats, status breakdown, quick actions
- 📋 **Reservations** - Full CRUD: create, edit, delete, search, filter by status
- 🚛 **Vehicles** - Toggle availability, edit pricing
- 📍 **Locations** - View all branches

### Key Features
- **Order Tracking System** - Customers enter `TRK-XXXXXX` to see live updates
- **Real-time Status Updates** - Admin changes reflect in customer tracking
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Auth System** - JWT-based admin authentication
- **Toast Notifications** - Success/error feedback
- **Modal System** - Clean overlays for forms

## Tech Stack

- **Framework**: Next.js 14 (App Router ready)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React hooks + localStorage
- **API**: Next.js API Routes (REST)
- **Database**: In-memory (replace with PostgreSQL + Prisma in production)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@truckrental.com | admin123 |
| Manager | manager@truckrental.com | manager123 |

## Demo Order Numbers (for tracking)

- `TRK-A1B2C3` - Confirmed reservation
- `TRK-X9Y8Z7` - Active rental
- `TRK-M4N5O6` - Completed rental
- `TRK-P7Q8R9` - Pending reservation

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com).

## Project Structure

```
truck-rental-app/
├── components/          # Shared components
│   ├── Layout.tsx       # Header, nav, footer
│   ├── Modal.tsx        # Reusable modal
│   └── Toast.tsx        # Toast notifications
├── lib/
│   └── data.ts          # Database + seed data
├── pages/
│   ├── index.tsx        # Home page
│   ├── fleet.tsx        # Vehicle fleet
│   ├── locations.tsx    # Branch locations
│   ├── contact.tsx      # Contact + FAQ
│   ├── track.tsx        # 🔍 Order tracking
│   ├── reserve.tsx      # Booking redirect
│   └── admin/
│       ├── login.tsx    # Admin auth
│       ├── index.tsx     # Dashboard
│       ├── reservations.tsx  # CRUD
│       ├── vehicles.tsx  # Fleet mgmt
│       └── locations.tsx # Branches
├── pages/api/           # API routes
│   ├── auth/login.ts
│   ├── reservations.ts
│   ├── vehicles.ts
│   ├── locations.ts
│   └── stats.ts
├── styles/
│   └── globals.css      # Tailwind + custom
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Production Checklist

- [ ] Replace in-memory DB with PostgreSQL + Prisma
- [ ] Add JWT secret environment variable
- [ ] Set up email service (SendGrid/Resend) for order confirmations
- [ ] Add payment processing (Stripe)
- [ ] Implement rate limiting on API routes
- [ ] Add input validation (Zod)
- [ ] Set up error monitoring (Sentry)
- [ ] Configure CDN for images
- [ ] Add SEO meta tags
- [ ] Implement server-side auth checks

## License

MIT
