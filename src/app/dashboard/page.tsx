'use client'

import * as React from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'
import {
  MapPin,
  ShoppingCart,
  Image,
  MessageSquare,
  Search,
  Users,
  BarChart2,
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  ArrowRight,
  Plus,
  Activity,
  Zap,
  Globe,
  CheckCircle,
} from 'lucide-react'

const SERVICES = [
  {
    id: 'lead-gen',
    name: 'Google Maps Lead Gen',
    description: 'Find businesses via OpenStreetMap/Nominatim. Unlimited searches, zero cost.',
    icon: MapPin,
    color: 'brand',
    gradient: 'from-brand-500 to-brand-600',
    stats: { leads: 1247, contacted: 342, converted: 28, revenue: 840000 },
    status: 'active',
    href: '/dashboard/lead-gen',
  },
  {
    id: 'price-monitor',
    name: 'Competitor Price Monitoring',
    description: 'Track pricing across e-commerce, hotels, travel. Daily automated checks.',
    icon: ShoppingCart,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    stats: { products: 847, competitors: 23, alerts: 12, revenue: 320000 },
    status: 'active',
    href: '/dashboard/price-monitor',
  },
  {
    id: 'content',
    name: 'Social Media Content Pipeline',
    description: 'AI content creation, scheduling, multi-platform publishing via Composio.',
    icon: Image,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    stats: { posts: 486, accounts: 6, engagement: '4.2%', revenue: 540000 },
    status: 'active',
    href: '/dashboard/content',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Automation',
    description: 'Booking bots, reminders, payments, templates. Meta Cloud API integration.',
    icon: MessageSquare,
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    stats: { salons: 12, bookings: 347, reminders: 1200, revenue: 280000 },
    status: 'active',
    href: '/dashboard/whatsapp',
  },
  {
    id: 'seo',
    name: 'Local SEO / GMB Optimization',
    description: 'Profile optimization, review generation, posts, competitor analysis.',
    icon: Search,
    color: 'red',
    gradient: 'from-red-500 to-rose-600',
    stats: { profiles: 34, reviews: 187, visibility: '92%', revenue: 190000 },
    status: 'pending',
    href: '/dashboard/seo',
  },
]

const QUICK_ACTIONS = [
  { name: 'Find New Leads', href: '/dashboard/lead-gen/search', icon: MapPin, color: 'brand' },
  { name: 'Add Competitor', href: '/dashboard/price-monitor/add', icon: Plus, color: 'orange' },
  { name: 'Create Content', href: '/dashboard/content/create', icon: Image, color: 'purple' },
  { name: 'Deploy Bot', href: '/dashboard/whatsapp/deploy', icon: MessageSquare, color: 'green' },
  { name: 'Audit GMB', href: '/dashboard/seo/audit', icon: Search, color: 'red' },
  { name: 'View All Leads', href: '/dashboard/leads', icon: Users, color: 'blue' },
]

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const Icon = service.icon
  const { stats, status } = service
  
  const statItems = Object.entries(stats).map(([key, value]) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: typeof value === 'number' ? formatNumber(value) : value,
  }))

  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: service.gradient }} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', `bg-gradient-to-br ${service.gradient}`)}>
            <Icon className="h-5.5 w-5.5 text-white" />
          </div>
          <Badge variant={status === 'active' ? 'success' : 'warning'}>
            {status === 'active' ? 'Active' : 'Setup Needed'}
          </Badge>
        </div>
        <CardTitle className="mt-3">{service.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {statItems.map((stat) => (
            <div key={stat.key} className="text-center p-3 rounded-xl bg-muted/50">
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Est. Monthly Revenue</span>
            <span className="font-semibold text-lg">{formatCurrency(stats.revenue)}</span>
          </div>
        </div>

        <Button 
          variant={status === 'active' ? 'outline' : 'gradient'} 
          className="w-full justify-center gap-2"
          asChild
        >
          <Link href={service.href}>
            {status === 'active' ? 'Open Dashboard' : 'Set Up Service'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function StatCard({ title, value, change, icon: Icon, color }: { 
  title: string
  value: string | number
  change?: string
  icon: React.ElementType
  color: string
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {change && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                {change}
              </p>
            )}
          </div>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const totalRevenue = SERVICES.reduce((sum, s) => sum + s.stats.revenue, 0)
  const totalLeads = SERVICES[0].stats.leads

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of all your revenue streams</p>
          </div>
          <Button variant="gradient" asChild>
            <Link href="/dashboard/lead-gen/search">
              <Plus className="h-4 w-4 mr-2" />
              Find Leads Now
            </Link>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Monthly Revenue"
            value={formatCurrency(totalRevenue)}
            change="+23% vs last month"
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Active Leads"
            value={formatNumber(totalLeads)}
            change="+47 this week"
            icon={Target}
            color="brand"
          />
          <StatCard
            title="Conversion Rate"
            value="2.2%"
            change="+0.3%"
            icon={Activity}
            color="purple"
          />
          <StatCard
            title="Active Services"
            value={`${SERVICES.filter(s => s.status === 'active').length} / ${SERVICES.length}`}
            icon={Zap}
            color="orange"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">Your Services</h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/services/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.name}
                    variant="outline"
                    className="w-full justify-start gap-3 hover:bg-muted/50"
                    asChild
                  >
                    <Link href={action.href}>
                      <Icon className={cn('h-5 w-5', `text-${action.color}-500`)} />
                      <span>{action.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-green-500" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {SERVICES.map((service) => {
                const percentage = ((service.stats.revenue / totalRevenue) * 100).toFixed(1)
                return (
                  <div key={service.id} className="flex items-center gap-4">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', `bg-gradient-to-br ${service.gradient}`)}>
                      <service.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{service.name}</span>
                        <span className="font-semibold text-brand-600">{formatCurrency(service.stats.revenue)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full bg-gradient-to-r"
                          style={{ 
                            background: service.gradient,
                            width: `${percentage}%` 
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Reach Note */}
      <Card className="mt-8 glass border-brand-200/50 dark:border-brand-800/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Powered by Free APIs — Global by Default</h3>
                <p className="text-sm text-muted-foreground">
                  Nominatim (OSM), Open-Meteo, ExchangeRate.host, Pollinations, Pexels, Unsplash — 
                  zero monthly cost, works in 195+ countries. Your Nepal advantage: pre-configured for Thamel, Patan, Boudha, Lakeside.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/lead-gen/search">
                Try Free Lead Search
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}