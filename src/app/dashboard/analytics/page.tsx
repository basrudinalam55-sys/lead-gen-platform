'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Activity,
  Zap,
  Globe,
  MapPin,
  ShoppingCart,
  Image,
  MessageSquare,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
  Filter,
} from 'lucide-react'

const SERVICES = [
  { id: 'lead-gen', name: 'Google Maps Lead Gen', icon: MapPin, color: 'brand', revenue: 840000, leads: 1247, conversion: 2.2, cost: 0 },
  { id: 'price-monitor', name: 'Competitor Price Monitoring', icon: ShoppingCart, color: 'orange', revenue: 320000, leads: 89, conversion: 12.4, cost: 5000 },
  { id: 'content', name: 'Social Media Content Pipeline', icon: Image, color: 'purple', revenue: 540000, leads: 234, conversion: 5.6, cost: 0 },
  { id: 'whatsapp', name: 'WhatsApp Automation', icon: MessageSquare, color: 'green', revenue: 280000, leads: 67, conversion: 8.9, cost: 10000 },
  { id: 'seo', name: 'Local SEO / GMB', icon: Search, color: 'red', revenue: 190000, leads: 45, conversion: 15.6, cost: 15000 },
]

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 450000, leads: 120, cost: 15000 },
  { month: 'Feb', revenue: 520000, leads: 145, cost: 18000 },
  { month: 'Mar', revenue: 680000, leads: 180, cost: 22000 },
  { month: 'Apr', revenue: 750000, leads: 210, cost: 25000 },
  { month: 'May', revenue: 890000, leads: 267, cost: 28000 },
  { month: 'Jun', revenue: 1020000, leads: 312, cost: 30000 },
  { month: 'Jul', revenue: 1180000, leads: 356, cost: 32000 },
  { month: 'Aug', revenue: 1350000, leads: 401, cost: 35000 },
  { month: 'Sep', revenue: 1520000, leads: 445, cost: 38000 },
  { month: 'Oct', revenue: 1680000, leads: 489, cost: 40000 },
  { month: 'Nov', revenue: 1850000, leads: 532, cost: 42000 },
  { month: 'Dec', revenue: 2100000, leads: 587, cost: 45000 },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'revenue' | 'leads' | 'services' | 'roi' | 'export'>('overview')
  const [dateRange, setDateRange] = React.useState('12m')

  const totalRevenue = SERVICES.reduce((a, b) => a + b.revenue, 0)
  const totalCost = SERVICES.reduce((a, b) => a + b.cost, 0)
  const totalLeads = SERVICES.reduce((a, b) => a + b.leads, 0)
  const avgConversion = SERVICES.reduce((a, b) => a + b.conversion, 0) / SERVICES.length
  const profit = totalRevenue - totalCost
  const roi = ((profit / totalCost) * 100).toFixed(1)

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground mt-1">Track performance across all revenue streams. Free APIs = zero data cost.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange} className="w-[160px]">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="12m">Last 12 Months</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="gradient">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +23.4% vs last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(profit)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1">Margin: {(profit/totalRevenue*100).toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-3xl font-bold text-purple-600">{roi}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Cost: {formatCurrency(totalCost)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold">{formatNumber(totalLeads)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +156 this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Conversion</p>
                  <p className="text-3xl font-bold">{avgConversion.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Best: SEO {Math.max(...SERVICES.map(s => s.conversion)).toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">API Calls/Month</p>
                  <p className="text-3xl font-bold">127K</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center text-gray-600 dark:text-gray-400">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Zero Cost (Free APIs)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">
              <BarChart2 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue">
              <DollarSign className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="leads">
              <Users className="h-4 w-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="services">
              <Zap className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="roi">
              <Target className="h-4 w-4 mr-2" />
              ROI
            </TabsTrigger>
            <TabsTrigger value="export">
              <Download className="h-4 w-4 mr-2" />
              Export
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Revenue Trend (12 Months)
                </CardTitle>
                <CardDescription>Monthly recurring revenue growth across all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 relative">
                  {/* Simple SVG Chart */}
                  <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M40,260 C100,200 160,140 220,100 C280,60 340,80 400,120 C460,160 520,180 580,140 C640,100 700,80 760,60"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40,260 C100,200 160,140 220,100 C280,60 340,80 400,120 C460,160 520,180 580,140 C640,100 700,80 760,60 L760,300 L40,300 Z"
                      fill="url(#revenueGradient)"
                    />
                    {/* Dots */}
                    {MONTHLY_DATA.map((d, i) => (
                      <circle
                        key={d.month}
                        cx={40 + i * 65.5}
                        cy={260 - (d.revenue / 2100000) * 200}
                        r="5"
                        fill="hsl(var(--primary))"
                        stroke="white"
                        strokeWidth="2"
                      />
                    ))}
                    {/* X-axis labels */}
                    {MONTHLY_DATA.map((d, i) => (
                      <text
                        key={`label-${d.month}`}
                        x={40 + i * 65.5}
                        y={285}
                        textAnchor="middle"
                        fontSize="11"
                        fill="hsl(var(--muted-foreground))"
                      >
                        {d.month}
                      </text>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Service Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {SERVICES.map(service => {
                    const Icon = service.icon
                    const percentage = ((service.revenue / totalRevenue) * 100).toFixed(1)
                    return (
                      <div key={service.id} className="flex items-center gap-4">
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', `bg-gradient-to-br from-${service.color}-500 to-${service.color}-600`)}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{service.name}</span>
                            <span className="font-semibold text-brand-600">{formatCurrency(service.revenue)}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full rounded-full bg-gradient-to-r"
                              style={{ 
                                background: `linear-gradient(90deg, hsl(var(--${service.color}-500)), hsl(var(--${service.color}-600)))`,
                                width: `${percentage}%` 
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground w-10 text-right">{percentage}%</span>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { stage: 'Leads Found', count: 12470, rate: 100 },
                    { stage: 'Contacted', count: 3420, rate: 27.4 },
                    { stage: 'Qualified', count: 1890, rate: 15.2 },
                    { stage: 'Demo Scheduled', count: 678, rate: 5.4 },
                    { stage: 'Demo Completed', count: 512, rate: 4.1 },
                    { stage: 'Proposal Sent', count: 389, rate: 3.1 },
                    { stage: 'Negotiating', count: 156, rate: 1.3 },
                    { stage: 'Closed Won', count: 87, rate: 0.7 },
                  ].map((funnel, i) => (
                    <div key={funnel.stage} className="flex items-center gap-4">
                      <div className="w-36 text-sm font-medium text-right">{funnel.stage}</div>
                      <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden relative">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
                          style={{ width: `${funnel.rate}%` }}
                        />
                        {funnel.rate >= 5 && (
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
                            {formatNumber(funnel.count)}
                          </span>
                        )}
                      </div>
                      <div className="w-20 text-right text-sm text-muted-foreground">{funnel.rate}%</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Revenue Detail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground border-b border-border">
                          <th className="pb-3 pr-4">Month</th>
                          <th className="pb-3 pr-4">Revenue</th>
                          <th className="pb-3 pr-4">Cost</th>
                          <th className="pb-3 pr-4">Profit</th>
                          <th className="pb-3 pr-4">Margin</th>
                          <th className="pb-3 pr-4">Leads</th>
                          <th className="pb-3">Cost/Lead</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MONTHLY_DATA.map((month, i) => {
                          const profit = month.revenue - month.cost
                          const margin = ((profit / month.revenue) * 100).toFixed(1)
                          const cpl = month.leads > 0 ? Math.round(month.cost / month.leads) : 0
                          const prevRevenue = i > 0 ? MONTHLY_DATA[i-1].revenue : month.revenue
                          const growth = ((month.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                          return (
                            <tr key={month.month} className="border-b border-border/50 hover:bg-muted/50">
                              <td className="py-3 pr-4 font-medium">{month.month}</td>
                              <td className="py-3 pr-4 font-semibold">{formatCurrency(month.revenue)}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(month.cost)}</td>
                              <td className="py-3 pr-4 font-semibold text-green-600">{formatCurrency(profit)}</td>
                              <td className="py-3 pr-4">{margin}%</td>
                              <td className="py-3 pr-4">{formatNumber(month.leads)}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{formatCurrency(cpl)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-300">YTD Revenue</p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                      {formatCurrency(MONTHLY_DATA.reduce((a, b) => a + b.revenue, 0))}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">YTD Profit</p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      {formatCurrency(MONTHLY_DATA.reduce((a, b) => a + (b.revenue - b.cost), 0))}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <p className="text-sm text-purple-700 dark:text-purple-300">Avg Monthly Growth</p>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">18.7%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                    <p className="text-sm text-orange-700 dark:text-orange-300">API Cost Savings</p>
                    <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                      {formatCurrency(127000 * 12 * 0.001)} <span className="text-lg">vs paid APIs</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leads by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: 'Google Maps Lead Gen', leads: 1247, cost: 0, cpl: 0 },
                      { source: 'Social Media Content', leads: 234, cost: 0, cpl: 0 },
                      { source: 'WhatsApp Automation', leads: 67, cost: 10000, cpl: 149 },
                      { source: 'Competitor Price Monitor', leads: 89, cost: 5000, cpl: 56 },
                      { source: 'Local SEO/GMB', leads: 45, cost: 15000, cpl: 333 },
                      { source: 'Referrals', leads: 156, cost: 0, cpl: 0 },
                      { source: 'Direct/Organic', leads: 89, cost: 0, cpl: 0 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                            <Target className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                          </div>
                          <div>
                            <p className="font-medium">{item.source}</p>
                            <p className="text-xs text-muted-foreground">Cost/Lead: {item.cpl === 0 ? 'Free' : formatCurrency(item.cpl)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatNumber(item.leads)}</p>
                          <p className="text-xs text-muted-foreground">{(item.leads/totalLeads*100).toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Quality Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { range: '80-100 (Hot)', count: 234, color: 'green' },
                      { range: '60-79 (Warm)', count: 567, color: 'yellow' },
                      { range: '40-59 (Cool)', count: 1234, color: 'orange' },
                      { range: '0-39 (Cold)', count: 345, color: 'red' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-28 text-sm font-medium">{item.range}</div>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ 
                              background: item.color === 'green' ? 'linear-gradient(90deg, #22c55e, #16a34a)' :
                                item.color === 'yellow' ? 'linear-gradient(90deg, #f59e0b, #eab308)' :
                                item.color === 'orange' ? 'linear-gradient(90deg, #f97316, #fb923c)' :
                                'linear-gradient(90deg, #ef4444, #dc2626)',
                              width: `${(item.count/totalLeads*100).toFixed(1)}%` 
                            }}
                          />
                        </div>
                        <div className="w-16 text-right font-medium">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(service => {
                const Icon = service.icon
                const profit = service.revenue - service.cost
                const roi = service.cost > 0 ? ((profit / service.cost) * 100).toFixed(1) : '∞'
                return (
                  <Card key={service.id} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ 
                      background: `linear-gradient(90deg, hsl(var(--${service.color}-500)), hsl(var(--${service.color}-600)))` 
                    }} />
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-gradient-to-br from-${service.color}-500 to-${service.color}-600`)}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline">{service.name.replace(/ /g, '\n')}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50 text-center">
                          <p className="text-2xl font-bold">{formatCurrency(service.revenue)}</p>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50 text-center">
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(profit)}</p>
                          <p className="text-xs text-muted-foreground">Profit</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50 text-center">
                          <p className="text-2xl font-bold">{formatNumber(service.leads)}</p>
                          <p className="text-xs text-muted-foreground">Leads</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50 text-center">
                          <p className="text-2xl font-bold">{service.conversion}%</p>
                          <p className="text-xs text-muted-foreground">Conversion</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Setup Cost</span>
                          <span>{service.cost === 0 ? 'Free' : formatCurrency(service.cost)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">ROI</span>
                          <span className="font-bold text-purple-600">{roi}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">API Cost</span>
                          <span className="font-bold text-green-600">Zero</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full justify-center gap-2" asChild>
                        <a href={`/dashboard/${service.id}`}>
                          <ArrowRight className="h-4 w-4" />
                          View Details
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* ROI Tab */}
          <TabsContent value="roi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Return on Investment Analysis
                </CardTitle>
                <CardDescription>Free APIs mean near-infinite ROI. Track time investment vs revenue.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Investment', value: formatCurrency(totalCost), desc: 'Setup + tools (mostly time)', icon: DollarSign, color: 'orange' },
                    { label: 'Total Return', value: formatCurrency(totalRevenue), desc: '12-month revenue', icon: TrendingUp, color: 'green' },
                    { label: 'Net Profit', value: formatCurrency(profit), desc: 'After all costs', icon: DollarSign, color: 'blue' },
                    { label: 'ROI', value: `${roi}%`, desc: 'Return on Investment', icon: Target, color: 'purple' },
                    { label: 'Payback Period', value: '< 1 Month', desc: 'First client covers setup', icon: Clock, color: 'green' },
                    { label: 'API Cost/Month', value: '₹0', desc: 'Free tier only', icon: Zap, color: 'green' },
                  ].map((item, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', `bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400`)}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Why Free APIs Win</h4>
                  <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300 pl-4 list-disc">
                    <li>Zero marginal cost per API call — scale infinitely</li>
                    <li>No vendor lock-in — switch providers anytime</li>
                    <li>No credit card required — start immediately</li>
                    <li>Global coverage — same APIs work in Kathmandu, NYC, Tokyo</li>
                    <li>Your only cost: development time (one-time)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Investment Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="pb-3 pr-4">Activity</th>
                        <th className="pb-3 pr-4">Hours/Week</th>
                        <th className="pb-3 pr-4">Monthly Hours</th>
                        <th className="pb-3 pr-4">Revenue Attributed</th>
                        <th className="pb-3">$/Hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { activity: 'Lead Research & Outreach', hours: 15, revenue: 840000 },
                        { activity: 'Content Creation & Scheduling', hours: 10, revenue: 540000 },
                        { activity: 'Client Onboarding & Support', hours: 8, revenue: 470000 },
                        { activity: 'Bot Deployment & Maintenance', hours: 5, revenue: 280000 },
                        { activity: 'SEO Audits & Optimization', hours: 4, revenue: 190000 },
                        { activity: 'Price Monitoring Setup', hours: 3, revenue: 320000 },
                        { activity: 'Admin & Reporting', hours: 5, revenue: 0 },
                      ].map((item, i) => {
                        const monthlyHours = item.hours * 4.33
                        const perHour = item.revenue > 0 ? Math.round(item.revenue / monthlyHours) : 0
                        return (
                          <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 pr-4 font-medium">{item.activity}</td>
                            <td className="py-3 pr-4">{item.hours}</td>
                            <td className="py-3 pr-4">{Math.round(monthlyHours)}</td>
                            <td className="py-3 pr-4">{formatCurrency(item.revenue)}</td>
                            <td className="py-3 pr-4 font-bold text-green-600">{perHour > 0 ? formatCurrency(perHour) : 'N/A'}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Executive Summary (PDF)', desc: 'One-page overview for stakeholders', icon: FileText },
                    { name: 'Revenue Detail (CSV)', desc: 'Monthly breakdown by service', icon: BarChart2 },
                    { name: 'Lead Pipeline (CSV)', desc: 'All leads with status & scores', icon: Users },
                    { name: 'Service Performance (CSV)', desc: 'Per-service metrics & ROI', icon: Zap },
                    { name: 'API Usage Log (JSON)', desc: 'Free API calls & rate limits', icon: Globe },
                    { name: 'Full Database Dump (SQL)', desc: 'Complete backup for migration', icon: Database },
                  ].map((item, i) => (
                    <Button key={i} variant="outline" className="w-full justify-start gap-3" onClick={() => alert(`Exporting ${item.name}...`)}>
                      <item.icon className="h-4 w-4" />
                      <div className="text-left">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Weekly Revenue Summary', schedule: 'Every Monday 9 AM', recipients: 'you@domain.com', status: 'Active' },
                    { name: 'Monthly ROI Report', schedule: '1st of month 10 AM', recipients: 'you@domain.com, partner@domain.com', status: 'Active' },
                    { name: 'Daily Lead Count', schedule: 'Every day 8 PM', recipients: 'slack:#leads', status: 'Paused' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.schedule} • {item.recipients}</p>
                      </div>
                      <Badge variant={item.status === 'Active' ? 'success' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Scheduled Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}