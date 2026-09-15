# LeadGen Platform — Free API Powered Business Growth

A master platform for **Google Maps Lead Gen**, **Competitor Price Monitoring**, **Social Media Content Pipeline**, **WhatsApp Automation**, and **Local SEO/GMB Optimization** — all built on **free APIs** that work globally. No API keys required. No monthly bills. Just results.

## 🚀 Features

### 5 Revenue Streams in One Platform

| Service | Target | Price | Free APIs Used |
|---------|--------|-------|----------------|
| **Google Maps Lead Gen** | Real estate, cafes, gyms, clinics, salons | ₹15-25K/mo | Nominatim (OSM), OpenStreetMap |
| **Competitor Price Monitoring** | E-commerce, hotels, tour operators | ₹20-30K/mo | Custom scrapers + ExchangeRate.host |
| **Social Media Content Pipeline** | Salons, restaurants, coaches | ₹15-20K/mo | Pollinations AI, Pexels, Unsplash |
| **WhatsApp Automation** | Salons, clinics, agents | ₹10K setup + ₹5K/mo | Meta Cloud API (free tier) |
| **Local SEO / GMB Optimization** | Any local business | ₹15K setup + ₹5K/mo | Google Places (free tier) + OSM |

### 🌍 Global by Default, Nepal-Optimized
- **Pre-configured for Nepal**: Thamel, Patan, Boudha, Lazimpat, Lakeside, Pokhara, Bhaktapur, Biratnagar, Birgunj, Dharan, Butwal, Hetauda, Janakpur
- **Bikram Sambat Calendar**: 47 holidays (2081-2085 BS) — Dashain, Tihar auto-handled
- **Nepali Payment Gateways**: eSewa + Khalti integration ready
- **6 Instagram Accounts Ready**: Via Composio integration
- **Multi-language**: Nepali (ne_NP) + English templates

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables (theming)
- **Database**: Prisma + SQLite (dev) → PostgreSQL (prod)
- **State**: TanStack Query + Zustand
- **UI**: Radix UI primitives + custom components
- **Charts**: Recharts (ready for integration)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js (ready)

## 📦 Quick Start

```bash
# 1. Clone & install
cd lead-gen-platform
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your keys (optional - most APIs work without keys)

# 3. Setup database
npx prisma db push
npx prisma db seed  # Optional: seed with sample data

# 4. Run dev server
npm run dev
# Open http://localhost:3000
```

## 🔑 Free APIs Used (No Keys Required)

| API | Purpose | Rate Limit | Key Required |
|-----|---------|------------|--------------|
| **Nominatim (OpenStreetMap)** | Places search, geocoding | 1 req/sec | ❌ |
| **Open-Meteo** | Weather forecasts | Unlimited | ❌ |
| **ExchangeRate.host** | Currency conversion | Unlimited | ❌ |
| **Pollinations AI** | AI image generation | Unlimited | ❌ |
| **Pexels** | Stock photos | 200/hr | Optional |
| **Unsplash Source** | Stock photos | Browser-limited | ❌ |
| **Meta Cloud API** | WhatsApp Business | 1000/day free | ✅ (App setup) |

## 📁 Project Structure

```
lead-gen-platform/
├── prisma/
│   └── schema.prisma          # Complete database schema
├── src/
│   ├── app/
│   │   ├── api/free/          # Free API endpoints
│   │   │   ├── places/        # Nominatim search
│   │   │   ├── weather/       # Open-Meteo
│   │   │   ├── currency/      # ExchangeRate.host
│   │   │   ├── images/        # Pexels + Pollinations
│   │   │   └── search/        # Unified search
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── lead-gen/      # Google Maps Lead Gen
│   │   │   ├── price-monitor/ # Competitor Price Monitoring
│   │   │   ├── content/       # Social Media Content Pipeline
│   │   │   ├── whatsapp/      # WhatsApp Automation
│   │   │   ├── seo/           # Local SEO/GMB
│   │   │   ├── leads/         # Leads Pipeline (Kanban)
│   │   │   ├── analytics/     # Analytics & Reports
│   │   │   └── settings/      # User Settings
│   │   ├── globals.css        # Design system (CSS variables)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── providers.tsx      # Providers (Theme, Query, Auth)
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Sidebar, DashboardLayout
│   │   └── dashboard/         # Dashboard-specific components
│   ├── lib/
│   │   ├── services/
│   │   │   └── free-apis.ts   # All free API integrations
│   │   ├── utils.ts           # Utility functions
│   │   └── validations/       # Zod schemas
│   └── hooks/                 # Custom React hooks
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎯 Dashboard Pages

| Route | Description |
|-------|-------------|
| `/` | Beautiful landing page with service cards |
| `/dashboard` | Overview with metrics, revenue breakdown, quick actions |
| `/dashboard/lead-gen` | Search businesses via OSM/Nominatim, export CSV/JSON |
| `/dashboard/price-monitor` | Track competitor prices, currency conversion, alerts |
| `/dashboard/content` | Content calendar, AI image generator, 6 IG accounts |
| `/dashboard/whatsapp` | Bot deployment, templates, salon management, webhook config |
| `/dashboard/seo` | GMB profiles, optimization audit, review management |
| `/dashboard/leads` | Kanban pipeline, list view, analytics |
| `/dashboard/analytics` | Revenue trends, ROI, service breakdown, exports |
| `/dashboard/settings` | Profile, theme, notifications, integrations, security |

## 🌐 API Endpoints

All free API endpoints under `/api/free/*`:

```
GET  /api/free/places?q=salon&city=kathmandu&category=salon
GET  /api/free/weather?lat=27.7172&lon=85.3240&days=7
GET  /api/free/currency?base=USD&target=NPR&amount=100
POST /api/free/currency { "amount": 100, "from": "USD", "to": "NPR" }
GET  /api/free/images?q=salon+interior&per_page=10
POST /api/free/images { "prompt": "salon interior", "width": 1024, "height": 1024 }
GET  /api/free/search?type=all&q=salon&city=thamel
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
# Add environment variables in Vercel dashboard
```

### Docker
```bash
docker build -t leadgen-platform .
docker run -p 3000:3000 leadgen-platform
```

### VPS (Production)
```bash
# On Ubuntu 22.04
git clone <repo>
cd lead-gen-platform
./deploy/deploy.sh  # Sets up PostgreSQL, Nginx, SSL, systemd
```

## 💰 Business Model

### Target: 10 Lakh/Month (₹1,000,000)

| Stream | Clients | Monthly | Setup | Total Month 1 |
|--------|---------|---------|-------|---------------|
| WhatsApp Bot | 15 | ₹75,000 | ₹150,000 | ₹225,000 |
| Lead Gen Service | 5 | ₹100,000 | ₹50,000 | ₹150,000 |
| Content Pipeline | 8 | ₹144,000 | ₹0 | ₹144,000 |
| Price Monitoring | 3 | ₹75,000 | ₹15,000 | ₹90,000 |
| Local SEO | 10 | ₹50,000 | ₹150,000 | ₹200,000 |
| **Total** | **41** | **₹444,000** | **₹365,000** | **₹809,000** |

Add referrals, upsells, affiliates → **₹10L+ achievable**

## 🔧 Development

```bash
# Run dev server
npm run dev

# Run tests
npm test

# Lint
npm run lint

# Database studio
npm run db:studio

# Build for production
npm run build
npm start
```

## 📚 Documentation

- [Free API Integration Guide](docs/free-apis.md)
- [WhatsApp Bot Setup](docs/whatsapp-bot.md)
- [Deployment Guide](docs/deployment.md)
- [Nepal Market Guide](docs/nepal-market.md)

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License — Free to use, modify, and distribute.

## 🙏 Acknowledgments

- **OpenStreetMap/Nominatim** — Free global places data
- **Open-Meteo** — Free weather forecasts
- **ExchangeRate.host** — Free currency conversion
- **Pollinations** — Free AI image generation
- **Pexels/Unsplash** — Free stock photos
- **Meta** — WhatsApp Business API free tier

---

**Built with ❤️ for Nepal • Scaled for the World**

*Your laptop + internet + free APIs = unlimited potential*