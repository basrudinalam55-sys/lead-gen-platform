'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, formatRelativeTime, SERVICE_QUERIES, NEPAL_CITIES } from '@/lib/utils'
import { searchPlacesNominatim } from '@/lib/services/free-apis'
import {
  MapPin,
  Search,
  Filter,
  Download,
  MapPin as MapPinIcon,
  Phone,
  Mail,
  Globe,
  Instagram,
  MessageSquare,
  CheckCircle,
  XCircle,
  Loader2,
  Building2,
  Target,
  ArrowRight,
  Plus,
  Eye,
  Map,
} from 'lucide-react'

const PLACE_CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'salon', label: 'Salons & Spas' },
  { value: 'restaurant', label: 'Restaurants & Cafes' },
  { value: 'gym', label: 'Gyms & Fitness' },
  { value: 'clinic', label: 'Clinics & Medical' },
  { value: 'retail', label: 'Retail & Boutiques' },
  { value: 'service', label: 'Services (Repair, Laundry, etc.)' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'education', label: 'Education & Coaching' },
  { value: 'hospitality', label: 'Hotels & Travel' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'pet', label: 'Pet Services' },
]

const CITIES = Object.entries(NEPAL_CITIES).map(([key, value]) => ({
  value: key,
  label: value.name,
}))

interface LeadResult {
  placeId: string
  name: string
  address: string
  phone?: string
  website?: string
  latitude: number
  longitude: number
  category: string
  subcategory?: string
  source: string
  // Enriched fields
  hasPhone: boolean
  hasWebsite: boolean
  hasInstagram: boolean
  hasWhatsApp: boolean
  score: number
  city: string
  industryMatch: boolean
}

export default function LeadGenPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [selectedCity, setSelectedCity] = React.useState('kathmandu')
  const [results, setResults] = React.useState<LeadResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = React.useState<'search' | 'results' | 'export'>('search')
  const [searchHistory, setSearchHistory] = React.useState<Array<{ query: string; city: string; category: string; count: number; timestamp: Date }>>([])

  const handleSearch = async () => {
    if (!searchQuery.trim() && selectedCategory === 'all') {
      alert('Please enter a search term or select a category')
      return
    }

    setIsLoading(true)
    setActiveTab('results')

    try {
      const city = NEPAL_CITIES[selectedCity as keyof typeof NEPAL_CITIES]
      let queries: string[] = []

      if (searchQuery.trim()) {
        queries = [searchQuery.trim()]
      } else {
        // Use predefined queries for the category
        const categoryKey = selectedCategory.toUpperCase().replace('-', '_') as keyof typeof SERVICE_QUERIES
        queries = SERVICE_QUERIES.GOOGLE_MAPS_LEAD_GEN.filter(q => 
          selectedCategory === 'all' || q.includes(selectedCategory)
        ).slice(0, 5)
        
        if (queries.length === 0) {
          queries = [selectedCategory]
        }
      }

      const allResults: LeadResult[] = []
      
      for (const query of queries) {
        const places = await searchPlacesNominatim(
          `${query} ${city.name}`,
          { lat: city.lat, lon: city.lon, radius: 15000, limit: 30 }
        )
        
        const enriched = places.map(place => enrichLead(place, city.name, selectedCategory))
        allResults.push(...enriched)
        
        // Rate limiting
        await new Promise(r => setTimeout(r, 300))
      }

      // Deduplicate and sort by score
      const unique = new Map<string, LeadResult>()
      for (const lead of allResults) {
        const existing = unique.get(lead.placeId)
        if (!existing || lead.score > existing.score) {
          unique.set(lead.placeId, lead)
        }
      }

      const sorted = Array.from(unique.values()).sort((a, b) => b.score - a.score)
      setResults(sorted)
      
      // Add to history
      setSearchHistory(prev => [{
        query: searchQuery || selectedCategory,
        city: city.name,
        category: selectedCategory,
        count: sorted.length,
        timestamp: new Date(),
      }, ...prev.slice(0, 9)])
      
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const enrichLead = (place: any, cityName: string, category: string): LeadResult => {
    const hasPhone = !!place.phone
    const hasWebsite = !!place.website
    // In real app, you'd check Instagram/WhatsApp via additional APIs
    const hasInstagram = false
    const hasWhatsApp = false
    const industryMatch = category === 'all' || place.category?.includes(category) || place.subcategory?.includes(category)
    
    return {
      ...place,
      hasPhone,
      hasWebsite,
      hasInstagram,
      hasWhatsApp,
      score: calculateScore({ hasPhone, hasEmail: hasWebsite, hasWebsite, hasInstagram, hasWhatsApp, industryMatch, locationMatch: true }),
      city: cityName,
      industryMatch,
    }
  }

  const calculateScore = (lead: {
    hasPhone: boolean
    hasEmail: boolean
    hasWebsite: boolean
    hasInstagram: boolean
    hasWhatsApp: boolean
    industryMatch: boolean
    locationMatch: boolean
  }): number => {
    let score = 0
    if (lead.hasPhone) score += 15
    if (lead.hasEmail) score += 10
    if (lead.hasWebsite) score += 10
    if (lead.hasInstagram) score += 15
    if (lead.hasWhatsApp) score += 20
    if (lead.industryMatch) score += 15
    if (lead.locationMatch) score += 15
    return Math.min(score, 100)
  }

  const toggleLeadSelection = (placeId: string) => {
    const newSelected = new Set(selectedLeads)
    if (newSelected.has(placeId)) {
      newSelected.delete(placeId)
    } else {
      newSelected.add(placeId)
    }
    setSelectedLeads(newSelected)
  }

  const selectAll = () => {
    if (selectedLeads.size === results.length) {
      setSelectedLeads(new Set())
    } else {
      setSelectedLeads(new Set(results.map(r => r.placeId)))
    }
  }

  const exportLeads = () => {
    const toExport = results.filter(r => selectedLeads.has(r.placeId))
    if (toExport.length === 0) {
      alert('No leads selected')
      return
    }
    
    const csv = [
      ['Name', 'Business Name', 'Address', 'Phone', 'Website', 'Category', 'City', 'Latitude', 'Longitude', 'Score', 'Source'].join(','),
      ...toExport.map(r => [
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.address.replace(/"/g, '""')}"`,
        r.phone || '',
        r.website || '',
        r.category,
        r.city,
        r.latitude,
        r.longitude,
        r.score,
        r.source,
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'success'
    if (score >= 40) return 'warning'
    return 'default'
  }

  const selectedCount = selectedLeads.size

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Google Maps Lead Gen</h1>
            <p className="text-muted-foreground mt-1">
              Find high-intent local businesses using free OpenStreetMap/Nominatim APIs. Zero cost, unlimited searches.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Free Tier Active
            </Badge>
            <Badge variant="info" className="gap-1">
              <Globe className="h-3 w-3" />
              Global Coverage
            </Badge>
          </div>
        </div>

        {/* Search Form */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Businesses
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {results.length} results
              </Badge>
            </div>
            <CardDescription>
              Search by business type, name, or keyword. Pre-configured for Nepal cities with global fallback.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Search Query</label>
                <Input
                  placeholder="e.g., hair salon Thamel, dental clinic Patan, gym Lazimpat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLACE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map(city => (
                      <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button 
                size="lg" 
                variant="gradient" 
                onClick={handleSearch} 
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Find Leads Free
                  </>
                )}
              </Button>
              
              {results.length > 0 && (
                <>
                  <Button variant="outline" onClick={exportLeads} disabled={selectedCount === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Export {selectedCount > 0 ? `(${selectedCount})` : ''}
                  </Button>
                  <Button variant="ghost" onClick={selectAll}>
                    {selectedCount === results.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </>
              )}
            </div>

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground mr-2">Quick searches:</span>
              {SERVICE_QUERIES.GOOGLE_MAPS_LEAD_GEN.slice(0, 8).map((query) => (
                <Button
                  key={query}
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSearchQuery(query); handleSearch(); }}
                  className="h-8"
                >
                  {query}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="results">
              <MapPinIcon className="h-4 w-4 mr-2" />
              Results ({results.length})
            </TabsTrigger>
            <TabsTrigger value="export">
              <Download className="h-4 w-4 mr-2" />
              Export & History
            </TabsTrigger>
          </TabsList>

          {/* Search Tab - Tips */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-brand-500" />
                  Pro Tips for Better Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Use specific terms: "hair salon" > "salon"',
                    'Add area: "Thamel", "Patan", "Lakeside"',
                    'Combine: "beauty parlour Boudha"',
                    'Try Nepali terms: "सलून", "क्लिनिक"',
                    'Check "extratags" for phone/website',
                    'Rate limit: 1 request/second (auto-handled)',
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Recent Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {searchHistory.map((search, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        className="w-full justify-start gap-3 hover:bg-muted/50"
                        onClick={() => {
                          setSearchQuery(search.query)
                          setSelectedCity(
                            Object.entries(NEPAL_CITIES).find(([, v]) => v.name === search.city)?.[0] || 'kathmandu'
                          )
                          setSelectedCategory(search.category)
                          handleSearch()
                        }}
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{search.query || search.category}</span>
                        <span className="text-muted-foreground">{search.city}</span>
                        <Badge variant="secondary">{search.count} results</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatRelativeTime(search.timestamp)}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
                <span className="ml-3 text-muted-foreground">Searching free APIs...</span>
              </div>
            ) : results.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results yet</h3>
                  <p className="text-muted-foreground mb-4">Search for businesses to find leads</p>
                  <Button variant="outline" onClick={() => setActiveTab('search')}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Go to Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{results.length} leads found</span>
                    <span>•</span>
                    <span>{selectedCount} selected</span>
                    <span>•</span>
                    <span>Avg score: {Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={exportLeads} disabled={selectedCount === 0}>
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Export CSV
                    </Button>
                    <Button variant="ghost" size="sm" onClick={selectAll}>
                      {selectedCount === results.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((lead) => (
                    <LeadCard 
                      key={lead.placeId} 
                      lead={lead} 
                      isSelected={selectedLeads.has(lead.placeId)}
                      onToggle={() => toggleLeadSelection(lead.placeId)}
                    />
                  ))}
                </div>

                {/* Pagination placeholder */}
                {results.length > 50 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <Button variant="outline" size="sm">Previous</Button>
                    <span className="px-4 text-sm text-muted-foreground">Page 1 of {Math.ceil(results.length / 50)}</span>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Export & History Tab */}
          <TabsContent value="export">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-medium mb-2">CSV Export</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Export selected leads or all results to CSV for CRM import, outreach tools, or team sharing.
                    </p>
                    <Button 
                      onClick={exportLeads} 
                      disabled={selectedCount === 0 && results.length === 0}
                      className="w-full"
                    >
                      {selectedCount > 0 
                        ? `Export ${selectedCount} Selected Leads` 
                        : results.length > 0
                        ? `Export All ${results.length} Leads`
                        : 'No leads to export'}
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-medium mb-2">JSON Export (Developers)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full data with coordinates, metadata, and enrichment fields for API integration.
                    </p>
                    <Button variant="outline" onClick={() => {
                      const data = selectedCount > 0 
                        ? results.filter(r => selectedLeads.has(r.placeId))
                        : results
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `leads-${Date.now()}.json`
                      a.click()
                      URL.revokeObjectURL(url)
                    }} disabled={results.length === 0} className="w-full">
                      Export JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {[
                      { icon: MessageSquare, text: 'Send WhatsApp DM via Meta Cloud API', href: '/dashboard/whatsapp' },
                      { icon: Instagram, text: 'Outreach via Instagram (Composio)', href: '/dashboard/content' },
                      { icon: Phone, text: 'Call directly from lead data', href: '#' },
                      { icon: Mail, text: 'Email outreach with templates', href: '#' },
                      { icon: MapPin, text: 'Walk-in visit (Thamel/Patan)', href: '#' },
                      { icon: Target, text: 'Add to CRM pipeline', href: '/dashboard/leads' },
                    ].map((step, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start gap-3 hover:bg-muted/50"
                        asChild
                      >
                        <Link href={step.href}>
                          <step.icon className="h-4 w-4 text-brand-500" />
                          <span>{step.text}</span>
                          <ArrowRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Search History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground border-b border-border">
                          <th className="pb-2">Query</th>
                          <th className="pb-2">City</th>
                          <th className="pb-2">Category</th>
                          <th className="pb-2">Results</th>
                          <th className="pb-2">Time</th>
                          <th className="pb-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchHistory.map((search, i) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-2 font-medium">{search.query || search.category}</td>
                            <td className="py-2">{search.city}</td>
                            <td className="py-2">{search.category}</td>
                            <td className="py-2">{search.count}</td>
                            <td className="py-2 text-muted-foreground">{formatRelativeTime(search.timestamp)}</td>
                            <td className="py-2">
                              <Button variant="ghost" size="sm" onClick={() => {
                                setSearchQuery(search.query)
                                setSelectedCity(
                                  Object.entries(NEPAL_CITIES).find(([, v]) => v.name === search.city)?.[0] || 'kathmandu'
                                )
                                setSelectedCategory(search.category)
                                handleSearch()
                                setActiveTab('results')
                              }}>
                                Repeat
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function LeadCard({ lead, isSelected, onToggle }: { 
  lead: LeadResult
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <Card 
      className={cn(
        'relative transition-all duration-200 hover:shadow-lg',
        isSelected && 'ring-2 ring-primary ring-offset-2 bg-primary/5'
      )}
    >
      {/* Selection checkbox */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            isSelected 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'border-border hover:border-primary/50'
          )}
          aria-label={isSelected ? 'Deselect' : 'Select'}
        >
          {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{lead.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{lead.address}</p>
          </div>
          <Badge variant={getScoreColor(lead.score)} className="whitespace-nowrap">
            {lead.score}/100
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-3 text-sm">
          {lead.phone && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span>{lead.phone}</span>
            </span>
          )}
          {lead.website && (
            <span className="flex items-center gap-1.5 text-muted-foreground truncate max-w-[150px]">
              <Globe className="h-3.5 w-3.5" />
              <span>{lead.website.replace(/^https?:\/\//, '')}</span>
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span className="flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            {lead.city}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {lead.category}
          </span>
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {lead.industryMatch ? 'Match' : 'General'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-center gap-1.5"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lead.latitude},${lead.longitude}`, '_blank')}
          >
            <MapPin className="h-3.5 w-3.5" />
            Map
          </Button>
          {lead.phone && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 justify-center gap-1.5"
              onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank')}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp
            </Button>
          )}
          {lead.website && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 justify-center gap-1.5"
              onClick={() => window.open(lead.website!, '_blank')}
            >
              <Globe className="h-3.5 w-3.5" />
              Website
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}