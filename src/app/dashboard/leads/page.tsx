'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, formatRelativeTime, formatCurrency, LEAD_STATUS_LABELS } from '@/lib/utils'
import {
  Users,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Edit,
  Trash2,
  Eye,
  Download,
  MoreHorizontal,
  Activity,
  Target,
  Building2,
} from 'lucide-react'

const MOCK_LEADS = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    businessName: 'Glamour Salon Thamel',
    email: 'rajesh@glamoursalon.com',
    phone: '+9779841234567',
    whatsapp: '+9779841234567',
    instagram: '@glamoursalon_thamel',
    website: 'https://glamoursalon.com.np',
    address: 'Thamel Marg, Kathmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    latitude: 27.7167,
    longitude: 85.3117,
    industry: 'Beauty salon',
    businessType: 'Salon',
    source: 'GOOGLE_MAPS_LEAD_GEN',
    status: 'DEMO_COMPLETED',
    score: 85,
    tags: ['Thamel', 'High Value', 'WhatsApp'],
    notes: 'Interested in WhatsApp booking bot. Demo completed. Sending proposal.',
    lastContactedAt: new Date(Date.now() - 86400000),
    nextFollowUpAt: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 604800000),
  },
  {
    id: '2',
    name: 'Priya Malhotra',
    businessName: 'Style Studio Patan',
    email: 'priya@stylestudio.com',
    phone: '+9779851234567',
    whatsapp: '+9779851234567',
    instagram: '@stylestudio_patan',
    website: '',
    address: 'Patan Dhoka, Lalitpur',
    city: 'Lalitpur',
    country: 'Nepal',
    latitude: 27.6736,
    longitude: 85.3194,
    industry: 'Hair salon',
    businessType: 'Salon',
    source: 'GOOGLE_MAPS_LEAD_GEN',
    status: 'PROPOSAL_SENT',
    score: 78,
    tags: ['Patan', 'Instagram Active'],
    notes: 'Proposal sent for WhatsApp bot + IG content. Waiting for response.',
    lastContactedAt: new Date(Date.now() - 172800000),
    nextFollowUpAt: new Date(Date.now() + 43200000),
    createdAt: new Date(Date.now() - 1209600000),
  },
  {
    id: '3',
    name: 'Amit Kumar',
    businessName: 'FitZone Gym Boudha',
    email: 'amit@fitzone.com',
    phone: '+9779861234567',
    whatsapp: '',
    instagram: '@fitzone_boudha',
    website: 'https://fitzone.com.np',
    address: 'Boudha Stupa Road, Kathmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    latitude: 27.7214,
    longitude: 85.3611,
    industry: 'Gym',
    businessType: 'Fitness',
    source: 'GOOGLE_MAPS_LEAD_GEN',
    status: 'QUALIFIED',
    score: 65,
    tags: ['Boudha', 'No WhatsApp'],
    notes: 'Needs WhatsApp setup first. Good candidate for full package.',
    lastContactedAt: new Date(Date.now() - 259200000),
    nextFollowUpAt: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: '4',
    name: 'Sunita Gurung',
    businessName: 'Tasty Bites Cafe Lakeside',
    email: 'sunita@tastybites.com',
    phone: '+9779871234567',
    whatsapp: '+9779871234567',
    instagram: '@tastybites_lakeside',
    website: 'https://tastybites.com.np',
    address: 'Lakeside, Pokhara',
    city: 'Pokhara',
    country: 'Nepal',
    latitude: 28.2127,
    longitude: 83.9494,
    industry: 'Restaurant',
    businessType: 'Cafe',
    source: 'SOCIAL_MEDIA_CONTENT_PIPELINE',
    status: 'NEGOTIATING',
    score: 92,
    tags: ['Pokhara', 'Tourist Area', 'High Value'],
    notes: 'Negotiating annual contract. Wants IG content + WhatsApp reservations.',
    lastContactedAt: new Date(Date.now() - 43200000),
    nextFollowUpAt: new Date(Date.now() + 21600000),
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: '5',
    name: 'Deepak Thapa',
    businessName: 'Royal Cuts Lazimpat',
    email: 'deepak@royalcuts.com',
    phone: '+9779881234567',
    whatsapp: '+9779881234567',
    instagram: '@royalcuts_lazimpat',
    website: '',
    address: 'Lazimpat, Kathmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    latitude: 27.7297,
    longitude: 85.3206,
    industry: 'Barbershop',
    businessType: 'Salon',
    source: 'WHATSAPP_AUTOMATION',
    status: 'CLOSED_WON',
    score: 88,
    tags: ['Lazimpat', 'Active Client'],
    notes: 'Signed! WhatsApp bot deployed. Onboarding scheduled.',
    lastContactedAt: new Date(Date.now() - 86400000),
    nextFollowUpAt: null,
    createdAt: new Date(Date.now() - 345600000),
  },
]

const STATUS_OPTIONS = [
  'NEW', 'CONTACTED', 'QUALIFIED', 'DEMO_SCHEDULED', 'DEMO_COMPLETED',
  'PROPOSAL_SENT', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST'
]

const SOURCE_OPTIONS = [
  'GOOGLE_MAPS_LEAD_GEN', 'COMPETITOR_PRICE_MONITORING',
  'SOCIAL_MEDIA_CONTENT_PIPELINE', 'WHATSAPP_AUTOMATION', 'LOCAL_SEO_GMB', 'MANUAL', 'REFERRAL'
]

export default function LeadsPage() {
  const [activeTab, setActiveTab] = React.useState<'pipeline' | 'list' | 'kanban' | 'analytics'>('pipeline')
  const [leads, setLeads] = React.useState(MOCK_LEADS)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [sourceFilter, setSourceFilter] = React.useState('all')
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = React.useState<'table' | 'cards'>('table')

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery) ||
      lead.city?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter
    
    return matchesSearch && matchesStatus && matchesSource
  })

  const pipelineStages = STATUS_OPTIONS.map(status => ({
    status,
    label: LEAD_STATUS_LABELS[status]?.label || status,
    color: LEAD_STATUS_LABELS[status]?.color || 'gray',
    leads: filteredLeads.filter(l => l.status === status),
  }))

  const toggleLeadSelection = (id: string) => {
    const newSelected = new Set(selectedLeads)
    if (newSelected.has(id)) newSelected.delete(id)
    else newSelected.add(id)
    setSelectedLeads(newSelected)
  }

  const selectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set())
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)))
    }
  }

  const updateLeadStatus = (id: string, newStatus: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus as any, updatedAt: new Date() } : l))
  }

  const getStatusConfig = (status: string) => LEAD_STATUS_LABELS[status] || { label: status, color: 'gray' }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Leads Pipeline</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your leads across services</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}>
              {viewMode === 'table' ? <Users className="h-4 w-4 mr-2" /> : <Building2 className="h-4 w-4 mr-2" />}
              {viewMode === 'table' ? 'Cards' : 'Table'}
            </Button>
            <Button variant="gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Pipeline/Kanban View */}
        {activeTab === 'pipeline' && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {pipelineStages.map((stage, i) => (
              <div key={stage.status} className="min-w-[320px] max-w-[360px] flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={stage.color as any}>{stage.label}</Badge>
                    <span className="text-sm text-muted-foreground">{stage.leads.length}</span>
                  </div>
                  {i < pipelineStages.length - 1 && (
                    <div className="w-2 h-2 rounded-full bg-border" />
                  )}
                </div>
                <div className="bg-muted/50 rounded-xl p-3 min-h-[400px] space-y-3" 
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    const id = e.dataTransfer.getData('lead-id')
                    if (id) updateLeadStatus(id, stage.status)
                  }}>
                  {stage.leads.map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      isSelected={selectedLeads.has(lead.id)}
                      onSelect={() => toggleLeadSelection(lead.id)}
                      onStatusChange={updateLeadStatus}
                      draggable
                      onDragStart={e => e.dataTransfer.setData('lead-id', lead.id)}
                    />
                  ))}
                  {stage.leads.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground/50">
                      <Target className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Drop leads here</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List/Table View */}
        {(activeTab === 'list' || activeTab === 'kanban') && (
          <>
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter} className="w-[180px]">
                    <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {STATUS_OPTIONS.map(s => (
                        <SelectItem key={s} value={s}>{LEAD_STATUS_LABELS[s]?.label || s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sourceFilter} onValueChange={setSourceFilter} className="w-[220px]">
                    <SelectTrigger><SelectValue placeholder="All Sources" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {SOURCE_OPTIONS.map(s => (
                        <SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" onClick={() => alert('Export CSV')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Badge variant="outline" className="px-3 py-1">
                      {filteredLeads.length} leads
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leads Grid/Table */}
            {viewMode === 'table' ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-muted-foreground border-b border-border bg-muted/50">
                          <th className="p-3 w-12"><input type="checkbox" onChange={selectAll} checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0} /></th>
                          <th className="p-3">Lead</th>
                          <th className="p-3">Business</th>
                          <th className="p-3 hidden md:table-cell">Contact</th>
                          <th className="p-3 hidden lg:table-cell">Location</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Score</th>
                          <th className="p-3">Source</th>
                          <th className="p-3">Last Touch</th>
                          <th className="p-3 w-36">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map(lead => (
                          <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="p-3">
                              <input type="checkbox" checked={selectedLeads.has(lead.id)} onChange={() => toggleLeadSelection(lead.id)} />
                            </td>
                            <td className="p-3">
                              <div>
                                <p className="font-medium">{lead.name}</p>
                                <p className="text-xs text-muted-foreground">{lead.tags.slice(0, 2).join(', ')}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <p className="font-medium">{lead.businessName}</p>
                              <p className="text-xs text-muted-foreground">{lead.industry}</p>
                            </td>
                            <td className="p-3 hidden md:table-cell">
                              <div className="space-y-1 text-sm">
                                {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>}
                                {lead.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>}
                                {lead.whatsapp && <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3 text-green-500" /> WhatsApp</span>}
                              </div>
                            </td>
                            <td className="p-3 hidden lg:table-cell">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {lead.city}, {lead.country}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant={getStatusConfig(lead.status).color as any}>
                                {getStatusConfig(lead.status).label}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <span className={cn('font-bold', lead.score >= 70 ? 'text-green-600' : lead.score >= 40 ? 'text-yellow-600' : 'text-red-600')}>
                                  {lead.score}
                                </span>
                                <Target className="h-3 w-3 text-muted-foreground" />
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">{lead.source.replace(/_/g, ' ')}</Badge>
                            </td>
                            <td className="p-3 text-sm text-muted-foreground">
                              {lead.lastContactedAt ? formatRelativeTime(lead.lastContactedAt) : 'Never'}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={() => alert(`View ${lead.name}`)}><Eye className="h-3.5 w-3.5" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => alert(`Edit ${lead.name}`)}><Edit className="h-3.5 w-3.5" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => alert(`Delete ${lead.name}`)}><Trash2 className="h-3.5 w-3.5" /></Button>
                              </div>
                            </td                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredLeads.map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLeads.has(lead.id)}
                    onSelect={() => toggleLeadSelection(lead.id)}
                    onStatusChange={updateLeadStatus}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads', value: leads.length, icon: Users, color: 'blue' },
                { label: 'Qualified', value: leads.filter(l => ['QUALIFIED', 'DEMO_SCHEDULED', 'DEMO_COMPLETED'].includes(l.status)).length, icon: Target, color: 'yellow' },
                { label: 'Closed Won', value: leads.filter(l => l.status === 'CLOSED_WON').length, icon: CheckCircle, color: 'green' },
                { label: 'Avg Score', value: Math.round(leads.reduce((a, b) => a + b.score, 0) / leads.length), icon: Activity, color: 'purple' },
              ].map((stat, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`)}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Leads by Status</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {STATUS_OPTIONS.map(status => {
                      const count = leads.filter(l => l.status === status).length
                      const percentage = Math.round((count / leads.length) * 100)
                      return (
                        <div key={status} className="flex items-center gap-4">
                          <Badge variant={LEAD_STATUS_LABELS[status]?.color as any} className="w-32">{LEAD_STATUS_LABELS[status]?.label}</Badge>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="w-16 text-right font-medium">{count} ({percentage}%)</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Leads by Source</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {SOURCE_OPTIONS.map(source => {
                      const count = leads.filter(l => l.source === source).length
                      const percentage = Math.round((count / leads.length) * 100)
                      return (
                        <div key={source} className="flex items-center gap-4">
                          <span className="w-40 text-sm text-muted-foreground">{source.replace(/_/g, ' ')}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="w-16 text-right font-medium">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipeline">
              <Activity className="h-4 w-4 mr-2" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="list">
              <Building2 className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <Users className="h-4 w-4 mr-2" />
              Cards
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function LeadCard({ lead, isSelected, onSelect, onStatusChange, draggable, onDragStart }: any) {
  const statusConfig = getStatusConfig(lead.status)
  
  return (
    <div
      className={cn(
        'p-4 rounded-lg border border-border transition-all duration-200 cursor-pointer',
        isSelected && 'ring-2 ring-primary bg-primary/5',
        draggable && 'hover:shadow-lg active:scale-[0.98]'
      )}
      onClick={onSelect}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{lead.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{lead.businessName}</p>
        </div>
        <Badge variant={statusConfig.color as any} className="whitespace-nowrap">{statusConfig.label}</Badge>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {lead.city}</div>
        <div className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {lead.industry}</div>
        {lead.phone && <div className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {lead.phone}</div>}
        {lead.whatsapp && <div className="flex items-center gap-1 text-green-500"><MessageSquare className="h-3.5 w-3.5" /> WhatsApp</div>}
        {lead.instagram && <div className="flex items-center gap-1 text-pink-500"><Instagram className="h-3.5 w-3.5" /> {lead.instagram}</div>}
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {lead.tags.slice(0, 3).map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className={cn('font-bold', lead.score >= 70 ? 'text-green-600' : lead.score >= 40 ? 'text-yellow-600' : 'text-red-600')}>
            {lead.score}
          </span>
          <Target className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        {onStatusChange && (
          <Select 
            value={lead.status} 
            onValueChange={v => onStatusChange(lead.id, v)}
            className="w-[140px]"
          >
            <SelectTrigger className="h-8 text-xs py-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(s => (
                <SelectItem key={s} value={s}>{LEAD_STATUS_LABELS[s]?.label || s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}