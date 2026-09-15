'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, formatCurrency, formatRelativeTime } from '@/lib/utils'
import { getExchangeRates, convertCurrency } from '@/lib/services/free-apis'
import {
  ShoppingCart,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Globe,
  Zap,
  RefreshCw,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Bell,
  Calendar,
  Package,
  Truck,
  Plane,
  Hotel,
  Store,
} from 'lucide-react'

interface Competitor {
  id: string
  name: string
  industry: string
  website: string
  products: Product[]
  lastChecked: Date
  status: 'active' | 'paused' | 'error'
}

interface Product {
  id: string
  name: string
  url: string
  currentPrice: number
  previousPrice?: number
  currency: string
  availability: 'in_stock' | 'out_of_stock' | 'limited'
  lastChecked: Date
  changePercent?: number
}

const MOCK_COMPETITORS: Competitor[] = [
  {
    id: '1',
    name: 'Daraz Nepal',
    industry: 'E-commerce',
    website: 'daraz.com.np',
    products: [
      { id: 'p1', name: 'iPhone 15 Pro 128GB', url: 'daraz.com.np/iphone-15-pro', currentPrice: 164999, previousPrice: 169999, currency: 'NPR', availability: 'in_stock', lastChecked: new Date(Date.now() - 3600000), changePercent: -2.9 },
      { id: 'p2', name: 'Samsung Galaxy S24', url: 'daraz.com.np/samsung-s24', currentPrice: 124999, previousPrice: 124999, currency: 'NPR', availability: 'in_stock', lastChecked: new Date(Date.now() - 7200000), changePercent: 0 },
    ],
    lastChecked: new Date(Date.now() - 3600000),
    status: 'active',
  },
  {
    id: '2',
    name: 'SastoDeal',
    industry: 'E-commerce',
    website: 'sastodeal.com',
    products: [
      { id: 'p3', name: 'MacBook Air M2', url: 'sastodeal.com/macbook-air-m2', currentPrice: 145000, previousPrice: 149000, currency: 'NPR', availability: 'limited', lastChecked: new Date(Date.now() - 1800000), changePercent: -2.7 },
    ],
    lastChecked: new Date(Date.now() - 1800000),
    status: 'active',
  },
  {
    id: '3',
    name: 'Hotel Yak & Yeti',
    industry: 'Hospitality',
    website: 'yakyeti.com',
    products: [
      { id: 'p4', name: 'Deluxe Room - Peak Season', url: 'yakyeti.com/deluxe', currentPrice: 25000, previousPrice: 22000, currency: 'NPR', availability: 'in_stock', lastChecked: new Date(Date.now() - 86400000), changePercent: 13.6 },
    ],
    lastChecked: new Date(Date.now() - 86400000),
    status: 'active',
  },
]

const INDUSTRIES = ['E-commerce', 'Hotels', 'Tour Operators', 'Airlines', 'Electronics', 'Fashion', 'Grocery', 'Travel Packages']

export default function PriceMonitorPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'competitors' | 'products' | 'alerts' | 'settings'>('overview')
  const [competitors, setCompetitors] = React.useState<Competitor[]>(MOCK_COMPETITORS)
  const [exchangeRates, setExchangeRates] = React.useState<Record<string, number> | null>(null)
  const [isLoadingRates, setIsLoadingRates] = React.useState(false)

  React.useEffect(() => {
    loadExchangeRates()
    const interval = setInterval(loadExchangeRates, 3600000) // Every hour
    return () => clearInterval(interval)
  }, [])

  const loadExchangeRates = async () => {
    setIsLoadingRates(true)
    try {
      const rates = await getExchangeRates('USD')
      if (rates) setExchangeRates(rates.rates)
    } catch (error) {
      console.error('Failed to load exchange rates:', error)
    } finally {
      setIsLoadingRates(false)
    }
  }

  const allProducts = competitors.flatMap(c => c.products.map(p => ({ ...p, competitor: c.name, competitorId: c.id })))
  const totalProducts = allProducts.length
  const priceDrops = allProducts.filter(p => p.changePercent && p.changePercent < -1).length
  const priceIncreases = allProducts.filter(p => p.changePercent && p.changePercent > 1).length
  const outOfStock = allProducts.filter(p => p.availability === 'out_of_stock').length

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Competitor Price Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Track pricing across e-commerce, hotels, travel & more. Free currency conversion + automated alerts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <Globe className="h-3 w-3" />
              {Object.keys(exchangeRates || {}).length} Currencies
            </Badge>
            <Badge variant={isLoadingRates ? 'default' : 'success'} className="gap-1">
              <Zap className="h-3 w-3" />
              Free APIs
            </Badge>
            <Button variant="gradient" asChild>
              <a href="#add-competitor">
                <Plus className="h-4 w-4 mr-2" />
                Add Competitor
              </a>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tracked Products</p>
                  <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Package className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price Drops</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{priceDrops}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <TrendingDown className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price Increases</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{priceIncreases}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{outOfStock}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Competitors</p>
                  <p className="text-3xl font-bold">{competitors.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Store className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              <Zap className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="competitors">
              <Store className="h-4 w-4 mr-2" />
              Competitors
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="settings">
              <RefreshCw className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Price Trends Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Price Trends (Last 30 Days)
                </CardTitle>
                <CardDescription>Average price movement across all tracked products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Chart integration ready - connect Recharts/Chart.js</p>
                    <p className="text-sm mt-2">Data source: Daily automated scraping + ExchangeRate.host</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Currency Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Live Exchange Rates (USD Base)
                </CardTitle>
                <CardDescription>Updated hourly via ExchangeRate.host (free, no key)</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRates ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-brand-500" />
                  </div>
                ) : exchangeRates ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {['NPR', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AED', 'SGD', 'THB', 'MYR'].map(currency => (
                      <div key={currency} className="p-3 rounded-lg bg-muted/50 text-center">
                        <div className="text-lg font-bold">{currency}</div>
                        <div className="text-sm text-muted-foreground">
                          {exchangeRates[currency] ? `1 USD = ${exchangeRates[currency].toFixed(2)} ${currency}` : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Failed to load rates</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'Add Competitor', icon: Plus, action: () => setActiveTab('competitors') },
                    { label: 'Run Price Check Now', icon: RefreshCw, action: () => alert('Triggering price check...') },
                    { label: 'Export Price History', icon: Download, action: () => alert('Exporting CSV...') },
                    { label: 'Configure Alerts', icon: Bell, action: () => setActiveTab('alerts') },
                  ].map((item, i) => (
                    <Button key={i} variant="outline" onClick={item.action} className="w-full justify-start gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Tracked Competitors</h2>
              <Button variant="gradient" id="add-competitor">
                <Plus className="h-4 w-4 mr-2" />
                Add Competitor
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {competitors.map(competitor => (
                <Card key={competitor.id} className="relative">
                  <div className="absolute top-3 right-3">
                    <Badge variant={competitor.status === 'active' ? 'success' : competitor.status === 'paused' ? 'warning' : 'destructive'}>
                      {competitor.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{competitor.name}</h3>
                        <p className="text-sm text-muted-foreground">{competitor.industry}</p>
                        <a href={`https://${competitor.website}`} target="_blank" rel="noopener" className="text-sm text-brand-600 hover:underline mt-1 inline-block">
                          {competitor.website}
                        </a>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                        <Store className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="text-2xl font-bold">{competitor.products.length}</div>
                        <div className="text-xs text-muted-foreground">Products</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {competitor.products.filter(p => p.changePercent && p.changePercent < 0).length}
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400">Drops</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last checked: {formatRelativeTime(competitor.lastChecked)}</span>
                      <Button variant="ghost" size="sm" onClick={() => alert(`View ${competitor.name} details`)}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => alert(`Edit ${competitor.name}`)}>
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => alert(`Delete ${competitor.name}`)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Competitor Form */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Add New Competitor</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid md:grid-cols-3 gap-4" onSubmit={e => e.preventDefault()}>
                  <Input placeholder="Competitor Name" required />
                  <Select defaultValue="E-commerce">
                    <SelectTrigger>
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Website (e.g., example.com)" type="url" required />
                  <div className="md:col-span-3 flex gap-3">
                    <Button type="submit" variant="gradient">Add Competitor</Button>
                    <Button type="button" variant="outline">Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="pb-3 pr-4">Product</th>
                    <th className="pb-3 pr-4">Competitor</th>
                    <th className="pb-3 pr-4">Current Price</th>
                    <th className="pb-3 pr-4">Previous</th>
                    <th className="pb-3 pr-4">Change</th>
                    <th className="pb-3 pr-4">Availability</th>
                    <th className="pb-3 pr-4">Last Checked</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map(product => (
                    <tr key={product.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 pr-4 font-medium">{product.name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{product.competitor}</td>
                      <td className="py-3 pr-4 font-semibold">{formatCurrency(product.currentPrice, product.currency)}</td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {product.previousPrice ? formatCurrency(product.previousPrice, product.currency) : '—'}
                      </td>
                      <td className="py-3 pr-4">
                        {product.changePercent !== undefined && (
                          <span className={cn('font-medium', product.changePercent < 0 ? 'text-green-600' : product.changePercent > 0 ? 'text-red-600' : 'text-muted-foreground')}>
                            {product.changePercent > 0 ? '+' : ''}{product.changePercent.toFixed(1)}%
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={
                          product.availability === 'in_stock' ? 'success' :
                          product.availability === 'out_of_stock' ? 'destructive' : 'warning'
                        }>
                          {product.availability.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">{formatRelativeTime(product.lastChecked)}</td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Price Alert Rules
                </CardTitle>
                <CardDescription>Get notified when prices change beyond your thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'Price Drop', threshold: '> 5%', channel: 'Email + WhatsApp', status: 'Active' },
                  { type: 'Price Increase', threshold: '> 10%', channel: 'Email', status: 'Active' },
                  { type: 'Out of Stock', threshold: 'Any', channel: 'WhatsApp', status: 'Active' },
                  { type: 'Back in Stock', threshold: 'Any', channel: 'Email', status: 'Paused' },
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">Threshold: {alert.threshold} • {alert.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={alert.status === 'Active' ? 'success' : 'secondary'}>
                        {alert.status}
                      </Badge>
                      <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert Rule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Check Frequency</label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly (High volume)</SelectItem>
                      <SelectItem value="daily">Daily (Recommended)</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Default Currency</label>
                  <Select defaultValue="NPR">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NPR">NPR (Nepal)</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" defaultChecked />
                    <span>Enable free currency conversion (ExchangeRate.host)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" defaultChecked />
                    <span>Alert on price drops > 5%</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Alert on stock changes</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Weekly summary email</span>
                  </label>
                </div>
                <Button variant="gradient">Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'ExchangeRate.host', status: 'healthy', desc: 'Free currency rates, no key required' },
                  { name: 'Custom Scrapers', status: 'healthy', desc: 'Playwright/Puppeteer based' },
                  { name: 'Webhook Delivery', status: 'healthy', desc: 'HTTP callbacks for alerts' },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-3 h-3 rounded-full', api.status === 'healthy' ? 'bg-green-500' : 'bg-red-500')} />
                      <div>
                        <p className="font-medium">{api.name}</p>
                        <p className="text-sm text-muted-foreground">{api.desc}</p>
                      </div>
                    </div>
                    <Badge variant={api.status === 'healthy' ? 'success' : 'destructive'}>
                      {api.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}