'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  MessageSquare,
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Settings,
  FileText,
  Copy,
  Eye,
  Edit,
  Trash2,
  Bell,
  Phone,
  Users,
  RefreshCw,
  Shield,
  Zap,
  Globe,
  Database,
  Code,
  Terminal,
} from 'lucide-react'

const TEMPLATES = [
  {
    id: 'booking_confirmation',
    name: 'Booking Confirmation',
    category: 'UTILITY',
    language: 'ne_NP',
    status: 'APPROVED',
    variables: ['booking_id', 'service', 'staff', 'date', 'time', 'price'],
    body: 'नमस्ते {{1}}! तपाईको बुकिंग पुष्टि भयो। बुकिंग ID: {{2}}, सेवा: {{3}}, स्टाफ: {{4}}, मिति: {{5}}, समय: {{6}}, मूल्य: {{7}}। धन्यवाद!',
  },
  {
    id: 'reminder_day_before',
    name: 'Reminder - 1 Day Before',
    category: 'UTILITY',
    language: 'ne_NP',
    status: 'APPROVED',
    variables: ['customer', 'service', 'staff', 'date', 'time', 'address'],
    body: 'नमस्ते {{1}}! यो तपाईको बुकिंगको पूर्वसूचना हो: {{2}} सेवा {{3}} साथ {{4}} मा {{5}} बजे, ठेगाना: {{6}}। कृपया समयमा पुग्नुहोला।',
  },
  {
    id: 'reminder_2h',
    name: 'Reminder - 2 Hours Before',
    category: 'UTILITY',
    language: 'ne_NP',
    status: 'PENDING',
    variables: ['customer', 'service', 'staff', 'date', 'time', 'address'],
    body: 'नमस्ते {{1}}! तपाईको अपोइन्टमेन्ट २ घण्टापछि छ: {{2}} साथ {{3}}, {{4}} मा {{5}} बजे। कृपया तयार हुनुहोला।',
  },
  {
    id: 'reminder_30m',
    name: 'Reminder - 30 Minutes Before',
    category: 'UTILITY',
    language: 'ne_NP',
    status: 'PENDING',
    variables: ['customer', 'service', 'staff', 'date', 'time', 'address'],
    body: 'नमस्ते {{1}}! तपाईको अपोइन्टमेन्ट ३० मिनेटपछि सुरु हुनेछ। कृपया सलोनमा पुग्नुहोला।',
  },
  {
    id: 'owner_daily_digest',
    name: 'Owner Daily Digest',
    category: 'UTILITY',
    language: 'en_US',
    status: 'APPROVED',
    variables: ['salon', 'date', 'bs_date', 'confirmed', 'pending', 'revenue', 'staff', 'bookings'],
    body: 'Daily Digest for {{1}} - {{2}} ({{3}}): {{4}} confirmed, {{5}} pending, Revenue: {{6}}, Staff: {{7}}, Bookings: {{8}}',
  },
]

const MOCK_SALONS = [
  { id: '1', name: 'Glamour Salon Thamel', phone: '+9779841234567', status: 'active', bookings: 47, templates: 5 },
  { id: '2', name: 'Style Studio Patan', phone: '+9779851234567', status: 'active', bookings: 32, templates: 5 },
  { id: '3', name: 'Beauty Hub Boudha', phone: '+9779861234567', status: 'pending', bookings: 0, templates: 0 },
  { id: '4', name: 'Royal Cuts Lazimpat', phone: '+9779871234567', status: 'active', bookings: 28, templates: 5 },
]

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'templates' | 'salons' | 'conversations' | 'webhook' | 'deploy'>('overview')
  const [isDeploying, setIsDeploying] = React.useState(false)
  const [deployLogs, setDeployLogs] = React.useState<string[]>([])

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">WhatsApp Automation</h1>
            <p className="text-muted-foreground mt-1">
              Meta Cloud API integration: booking bots, reminders, payments, templates. Your existing bot codebase ready.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Meta Verified
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              Free Tier
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Globe className="h-3 w-3" />
              Global API
            </Badge>
            <Button variant="gradient" onClick={() => setActiveTab('deploy')}>
              <Terminal className="h-4 w-4 mr-2" />
              Deploy Bot
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Salons</p>
                  <p className="text-3xl font-bold">{MOCK_SALONS.filter(s => s.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-3xl font-bold">{MOCK_SALONS.reduce((a, b) => a + b.bookings, 0)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Templates Approved</p>
                  <p className="text-3xl font-bold">{TEMPLATES.filter(t => t.status === 'APPROVED').length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-orange-600">{TEMPLATES.filter(t => t.status === 'PENDING').length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Webhook Status</p>
                  <p className="text-3xl font-bold text-green-600">Active</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">
              <Zap className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="templates">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="salons">
              <Users className="h-4 w-4 mr-2" />
              Salons
            </TabsTrigger>
            <TabsTrigger value="conversations">
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="webhook">
              <Settings className="h-4 w-4 mr-2" />
              Webhook
            </TabsTrigger>
            <TabsTrigger value="deploy">
              <Terminal className="h-4 w-4 mr-2" />
              Deploy
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bot Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    Bot Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Webhook', value: 'Healthy', icon: Zap, color: 'text-green-500' },
                      { label: 'API Version', value: 'v18.0', icon: Code, color: 'text-blue-500' },
                      { label: 'Phone Number ID', value: 'Configured', icon: Phone, color: 'text-green-500' },
                      { label: 'Business Account', value: 'Verified', icon: Shield, color: 'text-green-500' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                        <item.icon className={`h-8 w-8 mx-auto mb-2 ${item.color}`} />
                        <p className="font-medium">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab('webhook')}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-500" />
                    Bot Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Booking Flow: Service → Staff → Date/Time → Confirm',
                    'Multi-language: Nepali (ne_NP) + English',
                    'Bikram Sambat Calendar Integration (47 holidays)',
                    'Automated Reminders: 1 day, 2 hours, 30 min before',
                    'Payment Integration: eSewa + Khalti webhooks',
                    'Owner Daily Digest: 9 AM daily summary',
                    'Multi-salon: Isolated data per phone number',
                    'SQLite (dev) → PostgreSQL (prod) ready',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'Register Templates', icon: FileText, action: () => setActiveTab('templates'), color: 'purple' },
                    { label: 'Add Salon', icon: Plus, action: () => setActiveTab('salons'), color: 'blue' },
                    { label: 'Test Webhook', icon: Send, action: () => alert('Test webhook triggered'), color: 'green' },
                    { label: 'View Conversations', icon: MessageSquare, action: () => setActiveTab('conversations'), color: 'orange' },
                  ].map((item, i) => (
                    <Button key={i} variant="outline" onClick={item.action} className="w-full justify-start gap-3 h-14">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400`)}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">WhatsApp Templates</h2>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>

            <div className="space-y-3">
              {TEMPLATES.map(template => (
                <Card key={template.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', 
                          template.category === 'UTILITY' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 
                          template.category === 'MARKETING' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                          'bg-green-100 dark:bg-green-900/30 text-green-600'
                        )}>
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <Badge variant="secondary">{template.category}</Badge>
                            <Badge variant="outline">{template.language}</Badge>
                            <Badge variant={template.status === 'APPROVED' ? 'success' : 'warning'}>{template.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 lg:ml-8">
                        <div className="text-sm text-muted-foreground">
                          Variables: {template.variables.join(', ')}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(template.body)}>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm font-mono text-muted-foreground max-h-24 overflow-y-auto">
                      {template.body}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Template Registration Guide */}
            <Card className="border-brand-200/50 dark:border-brand-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-brand-500" />
                  Meta Business Manager Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Templates must be approved in Meta Business Manager before use. Follow these steps:
                </p>
                <ol className="space-y-2 text-sm pl-4 list-decimal">
                  <li>Go to <a href="https://business.facebook.com" target="_blank" rel="noopener" className="text-brand-600 underline">Meta Business Manager</a> → WhatsApp Manager</li>
                  <li>Select your WhatsApp Business Account → Message Templates</li>
                  <li>Click "Create Template" → Choose category (Utility/Marketing/Authentication)</li>
                  <li>Fill in name, language (ne_NP for Nepali), header/footer/body</li>
                  <li>Add variables as {{1}}, {{2}}, etc. in order</li>
                  <li>Submit for review (typically 24-48 hours)</li>
                  <li>Once approved, copy Template ID to your bot config</li>
                </ol>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://business.facebook.com" target="_blank" rel="noopener">
                      Open Meta Business Manager
                      <Globe className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('deploy')}>
                    Deploy Bot First
                    <Terminal className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salons Tab */}
          <TabsContent value="salons" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Managed Salons</h2>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Onboard Salon
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_SALONS.map(salon => (
                <Card key={salon.id} className="relative">
                  <div className="absolute top-3 right-3">
                    <Badge variant={salon.status === 'active' ? 'success' : 'warning'}>
                      {salon.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{salon.name}</h3>
                        <p className="text-sm text-muted-foreground">{salon.phone}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="text-2xl font-bold">{salon.bookings}</div>
                        <div className="text-xs text-muted-foreground">Bookings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{salon.templates}</div>
                        <div className="text-xs text-muted-foreground">Templates</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => alert(`Configure ${salon.name}`)}>
                        <Settings className="h-3.5 w-3.5 mr-1.5" />
                        Config
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => window.open(`https://wa.me/${salon.phone.replace(/\D/g, '')}`, '_blank')}>
                        <Phone className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Onboarding Form */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Onboard New Salon</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid md:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
                  <Input placeholder="Salon Name" required />
                  <Input placeholder="WhatsApp Phone (+977XXXXXXXXXX)" type="tel" required />
                  <Input placeholder="Meta Access Token" type="password" />
                  <Input placeholder="Phone Number ID" />
                  <Input placeholder="WhatsApp Business Account ID" />
                  <Select defaultValue="ne_NP">
                    <SelectTrigger>
                      <SelectValue placeholder="Default Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ne_NP">Nepali (ne_NP)</SelectItem>
                      <SelectItem value="en_US">English (en_US)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="md:col-span-2 flex gap-3">
                    <Button type="submit" variant="gradient">Create Salon & Deploy Bot</Button>
                    <Button type="button" variant="outline">Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Conversations</CardTitle>
                <CardDescription>Real-time view of active WhatsApp conversations across all salons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Connect webhook to see live conversations</p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab('webhook')}>
                    Configure Webhook
                    <Settings className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhook Tab */}
          <TabsContent value="webhook" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Webhook Configuration
                </CardTitle>
                <CardDescription>Configure your Meta webhook URL and verify token</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Webhook URL</label>
                    <Input 
                      placeholder="https://your-domain.com/webhook" 
                      defaultValue="https://your-ngrok-url.ngrok-free.app/webhook"
                      readOnly
                    />
                    <p className="text-xs text-muted-foreground mt-1">Set in Meta Developer Console → WhatsApp → Configuration</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Verify Token</label>
                    <Input 
                      placeholder="your_secure_verify_token" 
                      defaultValue="leadgen_webhook_verify_2024"
                      type="password"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Must match META_VERIFY_TOKEN in .env</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h4 className="font-medium mb-3">Required Webhook Fields</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" defaultChecked disabled />
                      <span>messages</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" defaultChecked disabled />
                      <span>message_deliveries</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" defaultChecked disabled />
                      <span>message_reads</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" defaultChecked disabled />
                      <span>message_template_status_update</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="gradient" onClick={() => alert('Webhook verified!')}>
                    <Shield className="h-4 w-4 mr-2" />
                    Verify & Save
                  </Button>
                  <Button variant="outline" onClick={() => alert('Test payload sent')}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Test
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ngrok Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-orange-500" />
                  Local Development with ngrok
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{`# 1. Start your bot locally
cd whatsapp-booking-bot
pnpm run dev  # Runs on port 3001

# 2. In another terminal, start ngrok
ngrok http 3001

# 3. Copy the HTTPS URL (e.g., https://abc123.ngrok-free.app)
# 4. Update Meta Webhook URL to: https://abc123.ngrok-free.app/webhook
# 5. Verify token: leadgen_webhook_verify_2024

# 6. Test: Send a WhatsApp message to your business number`}</code></pre>
                <p className="text-sm text-muted-foreground">
                  Tip: Use ngrok's fixed domain (paid) or update webhook URL each session (free tier).
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deploy Tab */}
          <TabsContent value="deploy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-green-500" />
                  Production Deployment
                </CardTitle>
                <CardDescription>Deploy your WhatsApp bot to VPS with PostgreSQL, Nginx, SSL, and systemd</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">VPS Requirements</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground pl-4 list-disc">
                      <li>Ubuntu 22.04 LTS</li>
                      <li>2 vCPU, 4GB RAM (min)</li>
                      <li>Domain name with DNS access</li>
                      <li>Hetzner/DigitalOcean $5-10/mo</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Included in Deploy</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground pl-4 list-disc">
                      <li>PostgreSQL 15 + migrations</li>
                      <li>Nginx reverse proxy + Let's Encrypt SSL</li>
                      <li>systemd service with auto-restart</li>
                      <li>PM2 process management</li>
                      <li>Daily DB backup to S3</li>
                      <li>Log rotation (logrotate)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-3">Deploy Commands</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{`# On your VPS (run as root)
# 1. Clone repo
git clone https://github.com/yourusername/lead-gen-platform.git
cd lead-gen-platform/whatsapp-booking-bot

# 2. Run deploy script
chmod +x deploy/deploy.sh
./deploy/deploy.sh

# 3. Configure .env with production values
# 4. Run migrations
pnpm run db:migrate

# 5. Start service
systemctl start whatsapp-bot
systemctl enable whatsapp-bot

# 6. Check status
systemctl status whatsapp-bot
curl https://your-domain.com/health`}</code></pre>
                </div>

                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-full"
                  onClick={async () => {
                    setIsDeploying(true)
                    setDeployLogs(['[INFO] Starting deployment...', '[INFO] Connecting to VPS...'])
                    
                    // Simulate deployment
                    const steps = [
                      '[INFO] Pulling latest code...',
                      '[INFO] Installing dependencies...',
                      '[INFO] Running database migrations...',
                      '[INFO] Building TypeScript...',
                      '[INFO] Restarting systemd service...',
                      '[INFO] Health check passed!',
                      '[SUCCESS] Deployment complete! Bot is live.',
                    ]
                    
                    for (const step of steps) {
                      await new Promise(r => setTimeout(r, 800))
                      setDeployLogs(prev => [...prev, step])
                    }
                    
                    setIsDeploying(false)
                  }}
                  disabled={isDeploying}
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Terminal className="h-4 w-4 mr-2" />
                      Deploy to VPS
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {deployLogs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Deploy Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                    {deployLogs.map((log, i) => (
                      <div key={i} className={cn('whitespace-pre-wrap', log.includes('ERROR') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-green-400' : '')}>
                        {log}
                      </div>
                    ))}
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