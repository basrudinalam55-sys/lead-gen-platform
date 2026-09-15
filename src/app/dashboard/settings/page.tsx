'use client'

import * as React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  User,
  Shield,
  Bell,
  Globe,
  Database,
  Key,
  Github,
  GitBranch,
  Server,
  Mail,
  CreditCard,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'appearance' | 'notifications' | 'integrations' | 'api' | 'billing' | 'security' | 'danger'>('profile')
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')
  const [saving, setSaving] = React.useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    alert('Settings saved!')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, preferences, and integrations</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
            <TabsTrigger value="appearance"><Monitor className="h-4 w-4 mr-2" /> Appearance</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" /> Notifications</TabsTrigger>
            <TabsTrigger value="integrations"><Github className="h-4 w-4 mr-2" /> Integrations</TabsTrigger>
            <TabsTrigger value="api"><Key className="h-4 w-4 mr-2" /> API Keys</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="h-4 w-4 mr-2" /> Billing</TabsTrigger>
            <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" /> Security</TabsTrigger>
            <TabsTrigger value="danger"><Trash2 className="h-4 w-4 mr-2" /> Danger Zone</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-2xl font-bold text-white">
                    JD
                  </div>
                  <div>
                    <Button variant="outline">Change Avatar</Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input defaultValue="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" defaultValue="john@leadgen.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input placeholder="+977 98XXXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <Input defaultValue="LeadGen Platform" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Input placeholder="Tell us about yourself..." />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Default Currency</label>
                    <Select defaultValue="NPR">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NPR">NPR (Nepal)</SelectItem>
                        <SelectItem value="USD">USD (US Dollar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                        <SelectItem value="INR">INR (Indian Rupee)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Timezone</label>
                    <Select defaultValue="Asia/Kathmandu">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kathmandu">Kathmandu (UTC+5:45)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date Format</label>
                    <Select defaultValue="DD/MM/YYYY">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ne">Nepali (नेपाली)</SelectItem>
                        <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Theme
                </CardTitle>
                <CardDescription>Choose your preferred color scheme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: Sun, desc: 'Clean and bright' },
                    { value: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
                    { value: 'system', label: 'System', icon: Monitor, desc: 'Matches OS setting' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={theme === option.value ? 'default' : 'outline'}
                      className="flex flex-col items-start gap-2 h-24 w-full p-4"
                      onClick={() => setTheme(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        <option.icon className="h-5 w-5" />
                        <span className="font-medium">{option.label}</span>
                        {theme === option.value && <CheckCircle className="h-4 w-4 ml-auto" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Density & Animations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Compact Mode</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Reduce padding and spacing</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reduced Motion</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span>Disable animations and transitions</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'New Lead Alerts', desc: 'Get notified when new leads are found', enabled: true },
                  { title: 'Daily Summary', desc: 'Morning digest of pipeline activity', enabled: true },
                  { title: 'Weekly Report', desc: 'Monday 9 AM performance summary', enabled: true },
                  { title: 'Template Approvals', desc: 'WhatsApp template status changes', enabled: true },
                  { title: 'Payment Webhooks', desc: 'eSewa/Khalti payment confirmations', enabled: true },
                  { title: 'System Alerts', desc: 'API errors, deployments, downtime', enabled: true },
                  { title: 'Marketing Emails', desc: 'Product updates, tips, offers', enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications (Browser)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'High-Score Leads', desc: 'Leads with score ≥ 80', enabled: true },
                  { title: 'Deal Updates', desc: 'Status changes to Closed Won/Lost', enabled: true },
                  { title: 'Webhook Failures', desc: 'Meta/WhatsApp webhook errors', enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Connected Services
                </CardTitle>
                <CardDescription>Manage your third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Composio', desc: '6 Instagram accounts connected', status: 'connected', icon: Instagram, action: 'Manage' },
                  { name: 'Meta Cloud API', desc: 'WhatsApp Business API', status: 'connected', icon: MessageSquare, action: 'Configure' },
                  { name: 'GitHub', desc: 'Repository access for deployments', status: 'connected', icon: Github, action: 'Settings' },
                  { name: 'eSewa', desc: 'Payment gateway (UAT)', status: 'pending', icon: CreditCard, action: 'Connect' },
                  { name: 'Khalti', desc: 'Payment gateway (Test)', status: 'pending', icon: CreditCard, action: 'Connect' },
                  { name: 'Vercel', desc: 'Hosting & deployments', status: 'disconnected', icon: Server, action: 'Connect' },
                  { name: 'Netlify', desc: 'Alternative hosting', status: 'disconnected', icon: Globe, action: 'Connect' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', 
                        item.status === 'connected' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                        item.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
                        'bg-muted text-muted-foreground'
                      )}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        item.status === 'connected' ? 'success' :
                        item.status === 'pending' ? 'warning' : 'secondary'
                      }>
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">{item.action}</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Free API Status</CardTitle>
                <CardDescription>All APIs are free - no keys required for most</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Nominatim (OpenStreetMap)', status: 'healthy', desc: 'Places & geocoding - 1 req/sec', key: 'places' },
                  { name: 'Open-Meteo', status: 'healthy', desc: 'Weather forecasts - unlimited', key: 'weather' },
                  { name: 'ExchangeRate.host', status: 'healthy', desc: 'Currency conversion - unlimited', key: 'currency' },
                  { name: 'Pollinations AI', status: 'healthy', desc: 'AI image generation - free', key: 'images' },
                  { name: 'Pexels', status: 'healthy', desc: 'Stock photos - 200/hr free', key: 'photos' },
                  { name: 'Unsplash Source', status: 'healthy', desc: 'Stock photos - no key needed', key: 'unsplash' },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-2 h-2 rounded-full', api.status === 'healthy' ? 'bg-green-500' : 'bg-red-500')} />
                      <div>
                        <p className="font-medium">{api.name}</p>
                        <p className="text-sm text-muted-foreground">{api.desc}</p>
                      </div>
                    </div>
                    <Badge variant="success">Free</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys & Tokens
                </CardTitle>
                <CardDescription>Manage your API credentials. Most free APIs don't require keys.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: 'Composio API Key', value: 'cp_sk_********************', env: 'COMPOSIO_API_KEY', required: true },
                  { label: 'Meta App ID', value: '1234567890123456', env: 'META_APP_ID', required: true },
                  { label: 'Meta App Secret', value: '********************', env: 'META_APP_SECRET', required: true },
                  { label: 'Meta Verify Token', value: 'leadgen_webhook_verify_2024', env: 'META_VERIFY_TOKEN', required: true },
                  { label: 'Pexels API Key (Optional)', value: 'Not set', env: 'PEXELS_API_KEY', required: false },
                  { label: 'Unsplash Access Key (Optional)', value: 'Not set', env: 'UNSPLASH_ACCESS_KEY', required: false },
                  { label: 'Google Maps API Key (Optional)', value: 'Not set', env: 'GOOGLE_MAPS_API_KEY', required: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                        <Key className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground font-mono text-xs">{item.env}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                      {!item.required && <Badge variant="secondary" className="text-xs">Optional</Badge>}
                      <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <Info className="h-4 w-4 inline mr-1" />
                    <strong>Free APIs used:</strong> Nominatim, Open-Meteo, ExchangeRate.host, Pollinations, Pexels (optional), Unsplash Source.
                    No monthly API costs. Keys only needed for enhanced features or higher rate limits.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">Monthly billing • Auto-renew</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="mt-4 flex items-baseline gap-4">
                    <span className="text-3xl font-bold">₹2,999</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Manage Subscription</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">eSewa</p>
                      <p className="text-sm text-muted-foreground">Primary • ••• 1234</p>
                    </div>
                  </div>
                  <Badge variant="success">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">Add Payment Method</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Amount</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: '2024-12-01', amount: '₹2,999', status: 'Paid' },
                        { date: '2024-11-01', amount: '₹2,999', status: 'Paid' },
                        { date: '2024-10-01', amount: '₹2,999', status: 'Paid' },
                      ].map((inv, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3 pr-4">{inv.date}</td>
                          <td className="py-3 pr-4">{inv.amount}</td>
                          <td className="py-3 pr-4"><Badge variant="success">{inv.status}</Badge></td>
                          <td className="py-3"><Button variant="ghost" size="sm">Download</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge variant="secondary">Not Enabled</Badge>
                </div>
                <Button variant="outline" className="mt-4 w-full">Enable 2FA</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'Kathmandu, NP', current: true, lastActive: 'Now' },
                  { device: 'Safari on iPhone', location: 'Lalitpur, NP', current: false, lastActive: '2h ago' },
                  { device: 'Firefox on Linux', location: 'Pokhara, NP', current: false, lastActive: '1d ago' },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                        <Monitor className="h-5 w-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.current && <Badge variant="secondary">Current</Badge>}
                      {!session.current && <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger" className="space-y-6">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-destructive">Delete All Data</p>
                      <p className="text-sm text-muted-foreground">Permanently delete all leads, services, content, and analytics. Cannot be undone.</p>
                    </div>
                    <Button variant="destructive" onClick={() => { if (confirm('Type DELETE to confirm')) alert('Deleted!') }}>Delete Everything</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
                    </div>
                    <Button variant="destructive" onClick={() => { if (confirm('Type DELETE to confirm')) alert('Account deleted!') }}>Delete Account</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Export All Data</p>
                      <p className="text-sm text-muted-foreground">Download a complete backup of your data (JSON + CSV)</p>
                    </div>
                    <Button variant="outline" onClick={() => alert('Preparing export...')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}