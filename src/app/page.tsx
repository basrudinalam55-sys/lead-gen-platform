'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  ShoppingCart,
  Image,
  MessageSquare,
  Search,
  ArrowRight,
  Zap,
  Globe,
  Shield,
  BarChart2,
  Users,
  Target,
  TrendingUp,
  Crown,
  Sparkles,
  Rocket,
  CheckCircle,
} from 'lucide-react'

const SERVICES = [
  {
    id: 'google-maps-lead-gen',
    name: 'Google Maps Lead Gen',
    description: 'Find high-intent local businesses using free OpenStreetMap/Nominatim APIs. Zero cost, unlimited searches, global coverage.',
    icon: MapPin,
    color: 'brand',
    price: { setup: 0, monthly: 20000 },
    target: ['Real Estate', 'Cafes', 'Gyms', 'Clinics', 'Salons', 'Restaurants'],
    features: ['Unlimited searches', 'Global coverage', 'Phone/email extraction', 'Instagram detection', 'CSV export'],
    api: 'Nominatim (OSM)',
    gradient: 'from-brand-500 to-brand-600',
  },
  {
    id: 'competitor-price-monitoring',
    name: 'Competitor Price Monitoring',
    description: 'Track competitor pricing, availability & promotions across e-commerce, hotels & travel. Automated alerts via free APIs.',
    icon: ShoppingCart,
    color: 'orange',
    price: { setup: 5000, monthly: 25000 },
    target: ['E-commerce', 'Hotels', 'Tour Operators', 'Airlines', 'Marketplaces'],
    features: ['Daily price checks', 'Stock alerts', 'Currency conversion', 'Historical trends', 'Webhook notifications'],
    api: 'Custom scrapers + ExchangeRate.host',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    id: 'social-media-content-pipeline',
    name: 'Social Media Content Pipeline',
    description: 'End-to-end content creation: AI images (Pollinations), scheduling, multi-platform publishing. Your 6 IG accounts ready.',
    icon: Image,
    color: 'purple',
    price: { setup: 0, monthly: 18000 },
    target: ['Salons', 'Restaurants', 'Coaches', 'Boutiques', 'Influencers', 'Agencies'],
    features: ['AI image generation', '8-slide carousels', 'Reel scripts', 'Hashtag research', 'Auto-publish via Composio'],
    api: 'Pollinations + Pexels + Unsplash',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'whatsapp-automation',
    name: 'WhatsApp Automation',
    description: 'Full Meta Cloud API integration: booking bots, reminders, payments, templates. Your existing bot codebase included.',
    icon: MessageSquare,
    color: 'green',
    price: { setup: 10000, monthly: 5000 },
    target: ['Salons', 'Clinics', 'Agents', 'Restaurants', 'Gyms', 'Service biz'],
    features: ['Booking flows', 'Auto-reminders', 'eSewa/Khalti payments', 'Template management', 'Multi-salon support'],
    api: 'Meta Cloud API (free tier)',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'local-seo-gmb',
    name: 'Local SEO / GMB Optimization',
    description: 'Dominate Google Maps: profile optimization, review generation, posts, Q&A, photos. Free Places API + Nominatim.',
    icon: Search,
    color: 'red',
    price: { setup: 15000, monthly: 5000 },
    target: ['Any local business', 'Multi-location brands', 'Franchises', 'Service area businesses'],
    features: ['Profile audit', 'Review QR codes', 'Auto-post updates', 'Keyword tracking', 'Competitor analysis'],
    api: 'Google Places (free tier) + OSM',
    gradient: 'from-red-500 to-rose-600',
  },
]

const STATS = [
  { label: 'API Calls/Month', value: '100K+', icon: Zap, color: 'text-yellow-500' },
  { label: 'Countries Covered', value: '195', icon: Globe, color: 'text-blue-500' },
  { label: 'Uptime', value: '99.9%', icon: Shield, color: 'text-green-500' },
  { label: 'Active Users', value: '1,247', icon: Users, color: 'text-purple-500' },
]

const FEATURES = [
  { icon: Sparkles, title: 'Zero API Costs', desc: 'All powered by free tiers — no monthly API bills ever' },
  { icon: Globe, title: 'Global by Default', desc: 'Works in Kathmandu, New York, Tokyo — same codebase' },
  { icon: Zap, title: 'Real-time Data', desc: 'Live prices, weather, places — always fresh' },
  { icon: Shield, title: 'Privacy First', desc: 'No data sold, self-hosted option, GDPR ready' },
  { icon: BarChart2, title: 'Built-in Analytics', desc: 'Track ROI, conversion funnels, team performance' },
  { icon: Rocket, title: 'Deploy in Minutes', desc: 'Vercel, Docker, VPS — one-click deployments' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 xl:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-purple-50/50 dark:from-brand-900/20 dark:via-transparent dark:to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,transparent)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50/80 dark:bg-brand-900/30 border border-brand-200/50 dark:border-brand-800/50 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Now with 5 Free-API-Powered Services</span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl mx-auto text-center mb-12 animate-slide-up">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="gradient-text">Free APIs</span>{' '}
              <span className="text-foreground">.</span>{' '}
              <span className="gradient-text">Unlimited Leads</span>{' '}
              <span className="text-foreground">.</span>{' '}
              <span className="gradient-text">Zero Cost.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Master platform for Google Maps Lead Gen, Competitor Price Monitoring, Social Media Content Pipeline, 
              WhatsApp Automation & Local SEO — all built on free APIs that work globally. No API keys. No monthly bills. 
              Just results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animate-delay-200">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/dashboard/lead-gen">
                Start Finding Leads Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#services">Explore All Services</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in animate-delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Self-hostable</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Open source core</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Nepal-optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center animate-fade-in animate-delay-100">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} aria-hidden="true" />
                <div className="text-3xl lg:text-4xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="info" className="mb-4">5 Services • One Platform</Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Everything You Need to <span className="gradient-text">Grow Local Businesses</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each service is a complete revenue stream. Pick one, master it, stack them. 
              All powered by free APIs — your only cost is effort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Why <span className="gradient-text">LeadGen Platform</span> Wins
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for global scale, optimized for Nepal. Every feature designed to put money in your pocket.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <Card key={feature.title} className="animate-fade-in animate-delay-100 glass hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nepal Context */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <Badge variant="success" className="mb-4">Built for Nepal • Works Globally</Badge>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Local Intelligence, <span className="gradient-text">Global Architecture</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pre-loaded with 47 Nepali holidays (2081-2085 BS), Bikram Sambat calendar, 
                Thamel/Patan/Lazimpat/Boudha/Lakeside geo-centroids, eSewa/Khalti payment flows, 
                and Nepali language support. Deploy anywhere — the free APIs work everywhere.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Bikram Sambat Calendar',
                  '47 Holidays (2081-2085)',
                  'Nepali Payment Gateways',
                  '6 IG Accounts Ready',
                  'Thamel/Patan Geo-Targeting',
                  'WhatsApp Templates (ne_NP)',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in animate-delay-200">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500 p-1">
                <div className="aspect-square rounded-2xl bg-background p-8 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-brand-500" />
                    <p className="text-2xl font-bold">Global Coverage</p>
                    <p className="text-muted-foreground">OpenStreetMap + Free APIs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <Crown className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Ready to Build Your <span className="text-yellow-300">10 Lakh/Month</span> Agency?
          </h2>
          <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Clone this repo. Deploy to Vercel. Start finding leads in Thamel today. 
            Your laptop + internet + free APIs = unlimited potential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50" asChild>
              <Link href="https://github.com/yourusername/lead-gen-platform">
                <Rocket className="h-5 w-5 mr-2" />
                Star on GitHub
              </Link>
            </Button>
            <Button size="xl" variant="ghost" className="text-white hover:bg-white/10 border-white/20" asChild>
              <Link href="/dashboard/lead-gen">
                <Target className="h-5 w-5 mr-2" />
                Try Lead Gen Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-brand-500" />
                <span className="font-display font-bold text-xl gradient-text">LeadGen</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                Free API powered business growth platform. Built for Nepal, scaled for the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {SERVICES.map(s => (
                  <li key={s.id}><Link href={`/dashboard/${s.id}`} className="hover:text-foreground">{s.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="/api-docs" className="hover:text-foreground">API Reference</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/changelog" className="hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com" target="_blank" rel="noopener" className="hover:text-foreground">GitHub</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener" className="hover:text-foreground">Twitter</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-foreground">LinkedIn</a></li>
                <li><a href="mailto:hello@leadgen.com" className="hover:text-foreground">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 LeadGen Platform. Built with free APIs.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-foreground">Privacy</a>
              <a href="/terms" className="hover:text-foreground">Terms</a>
              <a href="/license" className="hover:text-foreground">MIT License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const Icon = service.icon
  
  return (
    <Card className="relative overflow-hidden group animate-fade-in animate-delay-100 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: service.gradient }} />
      
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-gradient-to-br ${service.gradient}`)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge variant="outline" className="whitespace-nowrap">
            {service.price.setup > 0 ? `₹${service.price.setup.toLocaleString()} setup` : 'Free setup'}
            {service.price.monthly > 0 && ` + ₹${service.price.monthly.toLocaleString()}/mo`}
          </Badge>
        </div>
        <CardTitle className="mt-4">{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Target Industries */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Target Industries</h4>
          <div className="flex flex-wrap gap-1.5">
            {service.target.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Features</h4>
          <ul className="space-y-1.5">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* API Source */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Primary API:</span>
            <span className="font-medium text-foreground">{service.api}</span>
          </div>
        </div>

        {/* CTA */}
        <Button 
          variant="outline" 
          className="w-full justify-center gap-2 group-hover:bg-primary/5"
          asChild
        >
          <Link href={`/dashboard/${service.id}`}>
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}