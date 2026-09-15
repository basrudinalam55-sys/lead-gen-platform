'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Image as ImageIcon,
  Clock,
  RefreshCw,
  TrendingUp,
  Download,
  Upload,
  Settings,
  Plus,
  Eye,
  Edit,
  BarChart2,
  Target,
  Shield,
  Zap,
} from 'lucide-react'

const MOCK_GMB_PROFILES = [
  {
    id: '1',
    placeId: 'ChIJ1234567890',
    name: 'Glamour Salon Thamel',
    address: 'Thamel Marg, Kathmandu 44600, Nepal',
    phone: '+977 1-4412345',
    website: 'https://glamoursalon.com.np',
    category: 'Beauty salon',
    rating: 4.7,
    reviewCount: 234,
    latitude: 27.7167,
    longitude: 85.3117,
    verified: true,
    optimizationScore: 92,
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    photos: 24,
    lastSynced: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    placeId: 'ChIJ9876543210',
    name: 'Style Studio Patan',
    address: 'Patan Dhoka, Lalitpur 44700, Nepal',
    phone: '+977 1-5523456',
    website: '',
    category: 'Hair salon',
    rating: 4.5,
    reviewCount: 156,
    latitude: 27.6736,
    longitude: 85.3194,
    verified: true,
    optimizationScore: 78,
    hours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 7:00 PM',
      friday: '10:00 AM - 7:00 PM',
      saturday: '10:00 AM - 7:00 PM',
      sunday: 'Closed',
    },
    photos: 12,
    lastSynced: new Date(Date.now() - 172800000),
  },
  {
    id: '3',
    placeId: 'ChIJ5555555555',
    name: 'Beauty Hub Boudha',
    address: 'Boudha Stupa Road, Kathmandu 44600, Nepal',
    phone: '+977 984-123456',
    website: 'https://beautyhubboudha.com',
    category: 'Beauty salon',
    rating: 4.2,
    reviewCount: 89,
    latitude: 27.7214,
    longitude: 85.3611,
    verified: false,
    optimizationScore: 54,
    hours: {},
    photos: 5,
    lastSynced: null,
  },
]

const OPTIMIZATION_CHECKS = [
  { id: 'name', name: 'Business Name Accuracy', weight: 15, check: (p: typeof MOCK_GMB_PROFILES[0]) => p.name.length > 2 },
  { id: 'address', name: 'Complete Address', weight: 15, check: (p: typeof MOCK_GMB_PROFILES[0]) => p.address.length > 10 },
  { id: 'phone', name: 'Phone Number', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => !!p.phone },
  { id: 'website', name: 'Website URL', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => !!p.website },
  { id: 'category', name: 'Primary Category', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => !!p.category },
  { id: 'hours', name: 'Business Hours', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => Object.keys(p.hours).length > 0 },
  { id: 'photos', name: 'Photos (10+)', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => p.photos >= 10 },
  { id: 'reviews', name: 'Review Count (10+)', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => p.reviewCount >= 10 },
  { id: 'rating', name: 'Rating (4.0+)', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => p.rating >= 4.0 },
  { id: 'verified', name: 'Verified Listing', weight: 10, check: (p: typeof MOCK_GMB_PROFILES[0]) => p.verified },
]

export default function SEOPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'profiles' | 'audit' | 'reviews' | 'posts' | 'competitors'>('overview')
  const [searchQuery, setSearchQuery] = React.useState('')

  const calculateScore = (profile: typeof MOCK_GMB_PROFILES[0]) => {
    let score = 0
    let passed = 0
    OPTIMIZATION_CHECKS.forEach(check => {
      if (check.check(profile)) {
        score += check.weight
        passed++
      }
    })
    return { score, passed, total: OPTIMIZATION_CHECKS.length }
  }

  const avgScore = Math.round(MOCK_GMB_PROFILES.reduce((a, b) => a + calculateScore(b).score, 0) / MOCK_GMB_PROFILES.length)

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Local SEO / GMB Optimization</h1>
            <p className="text-muted-foreground mt-1">
              Dominate Google Maps: profile optimization, review generation, posts, Q&A, photos. Free Places API + OSM.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Free APIs
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              Real-time Sync
            </Badge>
            <Button variant="gradient" onClick={() => setActiveTab('profiles')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Managed Profiles</p>
                  <p className="text-3xl font-bold">{MOCK_GMB_PROFILES.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Optimization</p>
                  <p className="text-3xl font-bold text-green-600">{avgScore}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <p className="text-3xl font-bold">{MOCK_GMB_PROFILES.reduce((a, b) => a + b.reviewCount, 0)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-3xl font-bold">{MOCK_GMB_PROFILES.filter(p => p.verified).length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Need Attention</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {MOCK_GMB_PROFILES.filter(p => calculateScore(p).score < 80).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
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
            <TabsTrigger value="profiles">
              <MapPin className="h-4 w-4 mr-2" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="audit">
              <Target className="h-4 w-4 mr-2" />
              Audit
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="posts">
              <ImageIcon className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="competitors">
              <Search className="h-4 w-4 mr-2" />
              Competitors
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Profile Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Your Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MOCK_GMB_PROFILES.map(profile => {
                    const { score, passed } = calculateScore(profile)
                    return (
                      <div key={profile.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{profile.name}</h3>
                              {profile.verified && (
                                <Badge variant="success" className="gap-1 text-xs">
                                  <CheckCircle className="h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{profile.address}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {profile.rating} ({profile.reviewCount} reviews)
                              </span>
                              <span className="flex items-center gap-1">
                                <ImageIcon className="h-3 w-3" />
                                {profile.photos} photos
                              </span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={cn('text-2xl font-bold', score >= 80 ? 'text-green-600' : score >= 60 ? 'text-orange-600' : 'text-red-600')}>
                              {score}%
                            </div>
                            <div className="text-xs text-muted-foreground">{passed}/{OPTIMIZATION_CHECKS.length} checks</div>
                            <Button variant="ghost" size="sm" className="mt-2" onClick={() => setActiveTab('audit')}>
                              <Eye className="h-3.5 w-3.5 mr-1.5" />
                              Audit
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Run Full Audit', icon: Target, action: () => setActiveTab('audit'), desc: 'Check all optimization factors' },
                    { label: 'Generate Review QR Codes', icon: QrCode, action: () => alert('Generating QR codes...'), desc: 'Print for table tents' },
                    { label: 'Schedule GMB Posts', icon: Clock, action: () => setActiveTab('posts'), desc: 'Weekly updates & offers' },
                    { label: 'Analyze Competitors', icon: Search, action: () => setActiveTab('competitors'), desc: 'Nearby similar businesses' },
                    { label: 'Sync from Google', icon: RefreshCw, action: () => alert('Syncing...'), desc: 'Pull latest data from Places API' },
                    { label: 'Export Report', icon: Download, action: () => alert('Exporting PDF...'), desc: 'Client-ready PDF report' },
                  ].map((item, i) => (
                    <Button key={i} variant="outline" onClick={item.action} className="w-full justify-start gap-3 h-14">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Optimization Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Optimization Factor Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {OPTIMIZATION_CHECKS.map(check => {
                    const passedCount = MOCK_GMB_PROFILES.filter(p => check.check(p)).length
                    const percentage = Math.round((passedCount / MOCK_GMB_PROFILES.length) * 100)
                    return (
                      <div key={check.id} className="flex items-center gap-4">
                        <div className="w-48 text-sm font-medium">{check.name}</div>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-500', 
                              percentage === 100 ? 'bg-green-500' : 
                              percentage >= 66 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-20 text-right text-sm text-muted-foreground">
                          {passedCount}/{MOCK_GMB_PROFILES.length} ({percentage}%)
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profiles Tab */}
          <TabsContent value="profiles" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">GMB Profiles</h2>
                <Input placeholder="Search profiles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-64" />
              </div>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add New Location
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_GMB_PROFILES.map(profile => {
                const { score } = calculateScore(profile)
                return (
                  <Card key={profile.id} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ 
                      background: score >= 80 ? 'linear-gradient(90deg, #22c55e, #16a34a)' :
                        score >= 60 ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                        'linear-gradient(90deg, #ef4444, #dc2626)'
                    }} />
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.category}</p>
                        </div>
                        <Badge variant={profile.verified ? 'success' : 'warning'}>
                          {profile.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{profile.address}</span>
                        </div>
                        {profile.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{profile.phone}</span>
                          </div>
                        )}
                        {profile.website && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <a href={profile.website} target="_blank" rel="noopener" className="truncate text-brand-600 hover:underline">
                              {profile.website}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{profile.rating}</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{profile.reviewCount}</div>
                          <div className="text-xs text-muted-foreground">Reviews</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{profile.photos}</div>
                          <div className="text-xs text-muted-foreground">Photos</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Optimization Score</span>
                          <span className={cn('text-xl font-bold', score >= 80 ? 'text-green-600' : score >= 60 ? 'text-orange-600' : 'text-red-600')}>
                            {score}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full', 
                              score >= 80 ? 'bg-green-500' : 
                              score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => alert(`Audit ${profile.name}`)}>
                          <Target className="h-3.5 w-3.5 mr-1.5" />
                          Audit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => alert(`View ${profile.name} on Maps`)}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Detailed Optimization Audit
                </CardTitle>
                <CardDescription>Select a profile to see detailed checklist</CardDescription>
              </CardHeader>
              <CardContent>
                <Select defaultValue={MOCK_GMB_PROFILES[0].id} className="w-[300px] mb-6">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_GMB_PROFILES.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name} ({calculateScore(p).score}%)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-3">
                  {OPTIMIZATION_CHECKS.map(check => {
                    const profile = MOCK_GMB_PROFILES[0]
                    const passed = check.check(profile)
                    return (
                      <div key={check.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-4">
                          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                            passed ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                          )}>
                            {passed ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{check.name}</p>
                            <p className="text-sm text-muted-foreground">Weight: {check.weight}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={passed ? 'success' : 'destructive'}>{passed ? 'Pass' : 'Fail'}</Badge>
                          <Button variant="ghost" size="sm">{passed ? <Eye className="h-3.5 w-3.5" /> : <Edit className="h-3.5 w-3.5" />}</Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Action Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { priority: 'High', title: 'Add website to Beauty Hub Boudha', impact: '+10% score' },
                  { priority: 'High', title: 'Verify Beauty Hub Boudha listing', impact: '+10% score' },
                  { priority: 'Medium', title: 'Add business hours for Style Studio Patan (Sunday)', impact: '+10% score' },
                  { priority: 'Medium', title: 'Upload 5+ more photos to Beauty Hub Boudha', impact: '+10% score' },
                  { priority: 'Low', title: 'Respond to 3 unanswered reviews', impact: 'Improves trust signals' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'warning' : 'secondary'}>
                        {item.priority}
                      </Badge>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Estimated impact: {item.impact}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Fix</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Review Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Reviews', value: '479', change: '+23 this month', icon: Star, color: 'yellow' },
                    { label: 'Average Rating', value: '4.47', change: '+0.12', icon: TrendingUp, color: 'green' },
                    { label: 'Response Rate', value: '87%', change: '+5%', icon: CheckCircle, color: 'blue' },
                  ].map((stat, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                            <p className="text-sm text-green-600 flex items-center gap-1">
                              <stat.icon className="h-4 w-4" />
                              {stat.change}
                            </p>
                          </div>
                          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`)}>
                            <stat.icon className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Review Generation Tools */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-4">Review Generation Tools</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">QR Code Generator</h4>
                        <p className="text-sm text-muted-foreground mb-4">Create printable QR codes for table tents, receipts, business cards</p>
                        <Button variant="outline" className="w-full">
                          <QrCode className="h-4 w-4 mr-2" />
                          Generate QR Codes
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">Review Request Templates</h4>
                        <p className="text-sm text-muted-foreground mb-4">WhatsApp/SMS/Email templates for asking happy customers</p>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Templates
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">Review Monitoring</h4>
                        <p className="text-sm text-muted-foreground mb-4">Get alerts for new reviews across all profiles</p>
                        <Button variant="outline" className="w-full">
                          <Bell className="h-4 w-4 mr-2" />
                          Set Up Alerts
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">Competitor Reviews</h4>
                        <p className="text-sm text-muted-foreground mb-4">Track competitor ratings & review velocity</p>
                        <Button variant="outline" className="w-full">
                          <Search className="h-4 w-4 mr-2" />
                          Analyze
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-purple-500" />
                  GMB Posts Scheduler
                </CardTitle>
                <CardDescription>Schedule Google My Business posts: offers, updates, events, products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground mb-4">GMB Posts API integration ready</p>
                  <p className="text-sm text-muted-foreground mb-6">Post types: Offers, Updates, Events, Products, COVID-19</p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-500" />
                  Local Competitor Analysis
                </CardTitle>
                <CardDescription>Find and analyze nearby competitors using free Places API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input placeholder="Search: salon near Thamel" className="flex-1" />
                  <Button variant="gradient">
                    <Search className="h-4 w-4 mr-2" />
                    Find Competitors
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Uses Nominatim (OSM) + Google Places free tier for competitor discovery</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Need QrCode icon
import { QrCode } from 'lucide-react'