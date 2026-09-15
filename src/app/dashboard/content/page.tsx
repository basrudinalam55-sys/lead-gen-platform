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
import { cn, formatRelativeTime } from '@/lib/utils'
import { generateAIImage, searchImagesPexels } from '@/lib/services/free-apis'
import {
  Image,
  Plus,
  Calendar,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Tiktok,
  Download,
  Upload,
  Sparkles,
  Zap,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  Edit,
  Trash2,
  Copy,
  Image as ImageIcon,
  Video,
  Layers,
  Palette,
  Hash,
  Send,
  Schedule,
  MoreHorizontal,
} from 'lucide-react'

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-purple-500 via-pink-500 to-orange-500', types: ['POST', 'STORY', 'REEL', 'CAROUSEL'] },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-600', types: ['POST', 'STORY', 'REEL'] },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-700', types: ['POST', 'ARTICLE'] },
  { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'from-gray-500 to-gray-600', types: ['POST', 'THREAD'] },
  { id: 'tiktok', name: 'TikTok', icon: Tiktok, color: 'from-pink-500 to-black', types: ['VIDEO'] },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600', types: ['VIDEO', 'SHORT'] },
]

const CONTENT_TYPES = [
  { id: 'POST', name: 'Post', icon: ImageIcon },
  { id: 'STORY', name: 'Story', icon: Layers },
  { id: 'REEL', name: 'Reel', icon: Video },
  { id: 'CAROUSEL', name: 'Carousel', icon: Layers },
  { id: 'VIDEO', name: 'Video', icon: Video },
  { id: 'ARTICLE', name: 'Article', icon: ImageIcon },
  { id: 'THREAD', name: 'Thread', icon: Twitter },
  { id: 'SHORT', name: 'Short', icon: Video },
]

const MOCK_CONTENT = [
  {
    id: '1',
    title: 'Monday Motivation - Salon Tips',
    platform: 'instagram',
    type: 'CAROUSEL',
    caption: '8 slides: Hair care routine for monsoon... #haircare #salonlife #kathmandu',
    mediaUrls: ['https://images.unsplash.com/photo-1560066984-1389b4b2f936?w=800'],
    hashtags: ['#haircare', '#salonlife', '#kathmandu', '#monsoonhair', '#beautytips'],
    scheduledAt: new Date(Date.now() + 86400000),
    status: 'SCHEDULED',
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: '2',
    title: 'New Service Launch',
    platform: 'facebook',
    type: 'POST',
    caption: 'Introducing our new organic facial treatment! Book now for 20% off.',
    mediaUrls: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'],
    hashtags: ['#facial', '#organicskincare', '#newservice'],
    scheduledAt: new Date(Date.now() + 43200000),
    status: 'SCHEDULED',
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: '3',
    title: 'Client Transformation Reel',
    platform: 'instagram',
    type: 'REEL',
    caption: 'Watch this amazing hair transformation! ✨ #hairtransformation #reels',
    mediaUrls: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'],
    hashtags: ['#hairtransformation', '#reels', '#hairstyle', '#beforeafter'],
    scheduledAt: new Date(Date.now() - 86400000),
    status: 'PUBLISHED',
    engagement: { likes: 247, comments: 34, shares: 12 },
  },
]

export default function ContentPipelinePage() {
  const [activeTab, setActiveTab] = React.useState<'calendar' | 'create' | 'library' | 'ai-generator' | 'accounts'>('calendar')
  const [content, setContent] = React.useState(MOCK_CONTENT)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generatedImages, setGeneratedImages] = React.useState<string[]>([])
  const [aiPrompt, setAiPrompt] = React.useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'success'
      case 'SCHEDULED': return 'info'
      case 'DRAFT': return 'secondary'
      case 'FAILED': return 'destructive'
      default: return 'default'
    }
  }

  const platformInfo = (id: string) => PLATFORMS.find(p => p.id === id) || PLATFORMS[0]

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Social Media Content Pipeline</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered content creation, multi-platform scheduling & publishing. 6 IG accounts ready via Composio.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              Pollinations AI Free
            </Badge>
            <Badge variant="outline" className="gap-1">
              <ImageIcon className="h-3 w-3" />
              Pexels + Unsplash
            </Badge>
            <Button variant="gradient" onClick={() => setActiveTab('create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>
        </div>

        {/* Connected Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-pink-500" />
              Connected Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { handle: '@smartphone_nepal', niche: 'Tech', followers: '12.4K' },
                { handle: '@technepaliinstag', niche: 'Tech', followers: '8.7K' },
                { handle: '@nepalicut396', niche: 'Food', followers: '25.1K' },
                { handle: '@nepalselite2026', niche: 'Travel', followers: '18.9K' },
                { handle: '@cuswebnepal', niche: 'Web Dev', followers: '5.2K' },
                { handle: '@pending_account', niche: 'TBD', followers: '0' },
              ].map((acc, i) => (
                <div key={i} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{acc.handle}</p>
                      <p className="text-xs text-muted-foreground">{acc.niche} • {acc.followers}</p>
                    </div>
                  </div>
                  <Badge variant={i === 5 ? 'secondary' : 'success'} className="mt-2 w-full justify-center text-xs">
                    {i === 5 ? 'Pending' : 'Connected'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="calendar">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </TabsTrigger>
            <TabsTrigger value="ai-generator">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="library">
              <Image className="h-4 w-4 mr-2" />
              Media Library
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <Users className="h-4 w-4 mr-2" />
              Accounts
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Content Calendar
                </CardTitle>
                <CardDescription>Drag & drop to reschedule. Click to edit.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 rounded-lg border border-border p-4">
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Full calendar view - integrate react-big-calendar or similar</p>
                    <p className="text-sm mt-2">Shows scheduled posts across all 6 accounts</p>
                  </div>
                  
                  {/* Upcoming Posts List */}
                  <div className="mt-8 space-y-3">
                    <h4 className="font-medium">Upcoming Posts</h4>
                    {content
                      .filter(c => c.status === 'SCHEDULED')
                      .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
                      .slice(0, 5)
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className={cn('w-2 h-2 rounded-full', platformInfo(item.platform).color.split(' ')[0].replace('from-', 'bg-'))} />
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {platformInfo(item.platform).name} • {item.type} • {formatRelativeTime(item.scheduledAt)}
                              </p>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>Compose, schedule, and publish across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6 max-w-3xl">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input placeholder="e.g., Monday Motivation - 5 Hair Tips for Monsoon" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Platforms</label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map(platform => (
                        <label key={platform.id} className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50">
                          <input type="checkbox" className="rounded border-input" defaultChecked={platform.id === 'instagram'} />
                          <platform.icon className="h-4 w-4" style={{ color: platform.color.split(' ')[0].replace('from-', '') }} />
                          <span className="text-sm">{platform.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <div className="flex flex-wrap gap-2">
                      {CONTENT_TYPES.map(type => (
                        <label key={type.id} className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50">
                          <input type="radio" name="contentType" className="rounded border-input" defaultChecked={type.id === 'POST'} />
                          <type.icon className="h-4 w-4" />
                          <span className="text-sm">{type.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Caption</label>
                    <Textarea 
                      placeholder="Write your caption... Use {hashtag} for auto-hashtag suggestions"
                      rows={4}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm" type="button">
                        <Hash className="h-3.5 w-3.5 mr-1.5" />
                        Hashtag Suggestions
                      </Button>
                      <Button variant="outline" size="sm" type="button">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        AI Enhance
                      </Button>
                      <span className="text-xs text-muted-foreground ml-auto">Character count: 0/2200</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Media</label>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" type="button" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Files
                      </Button>
                      <Button variant="outline" type="button" className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Stock Photos (Pexels)
                      </Button>
                      <Button variant="outline" type="button" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        AI Generate
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Hashtags</label>
                    <div className="flex flex-wrap gap-2">
                      {['#haircare', '#salonlife', '#kathmandu', '#beautytips', '#monsoonhair', '#nepal'].map(tag => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <XCircle className="h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add hashtag..." className="mt-2" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Schedule</label>
                      <Select defaultValue="now">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Post Now</SelectItem>
                          <SelectItem value="schedule">Schedule for Later</SelectItem>
                          <SelectItem value="recurring">Recurring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date & Time</label>
                      <Input type="datetime-local" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button variant="outline">Save as Draft</Button>
                    <Button variant="gradient" type="submit">
                      <Schedule className="h-4 w-4 mr-2" />
                      Schedule Post
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Generator Tab */}
          <TabsContent value="ai-generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  AI Image Generator (Pollinations - Free)
                </CardTitle>
                <CardDescription>
                  Generate unique images for your content using Flux/SDXL. No API key, unlimited generations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Prompt</label>
                  <Textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="e.g., Professional salon interior with modern hair stations, natural lighting, minimal aesthetic, 8k photorealistic"
                    rows={3}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      'Salon interior',
                      'Hair transformation before/after',
                      'Spa treatment flat lay',
                      'Barbershop vintage style',
                      'Nail art close up',
                      'Massage therapy scene',
                    ].map(suggestion => (
                      <Button key={suggestion} variant="ghost" size="sm" onClick={() => setAiPrompt(suggestion)}>
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                    <Select defaultValue="1:1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">Square (1:1) - Posts</SelectItem>
                        <SelectItem value="9:16">Vertical (9:16) - Stories/Reels</SelectItem>
                        <SelectItem value="16:9">Horizontal (16:9) - Video thumbnails</SelectItem>
                        <SelectItem value="4:5">Portrait (4:5) - Instagram posts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Model</label>
                    <Select defaultValue="flux">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flux">Flux (Best quality)</SelectItem>
                        <SelectItem value="gptimage">GPT-Image</SelectItem>
                        <SelectItem value="sdxl">SDXL</SelectItem>
                        <SelectItem value="midjourney">Midjourney style</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Count</label>
                    <Select defaultValue="4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Image</SelectItem>
                        <SelectItem value="2">2 Images</SelectItem>
                        <SelectItem value="4">4 Images (Grid)</SelectItem>
                        <SelectItem value="8">8 Images</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={async () => {
                    if (!aiPrompt.trim()) return
                    setIsGenerating(true)
                    setGeneratedImages([])
                    
                    // Generate multiple images
                    const count = 4
                    const promises = Array.from({ length: count }, (_, i) => 
                      generateAIImage(aiPrompt, { width: 1024, height: 1024, seed: Date.now() + i })
                    )
                    
                    const results = await Promise.all(promises)
                    setGeneratedImages(results.filter(Boolean) as string[])
                    setIsGenerating(false)
                  }}
                  disabled={isGenerating || !aiPrompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Images
                    </>
                  )}
                </Button>

                {generatedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {generatedImages.map((img, i) => (
                      <div key={i} className="relative group">
                        <img 
                          src={img} 
                          alt={`Generated ${i + 1}`} 
                          className="aspect-square w-full rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button variant="default" size="icon" onClick={() => {
                            navigator.clipboard.writeText(img)
                            alert('Copied data URL!')
                          }}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="default" size="icon" onClick={() => {
                            setGeneratedImages(prev => prev.filter((_, idx) => idx !== i))
                          }}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stock Photo Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                  Stock Photos (Pexels - Free)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4">
                  <Input placeholder="Search Pexels..." className="flex-1" />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="aspect-square rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Click to add to media library • Powered by Pexels API (200 req/hr free)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Media Library</span>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-muted/50 border border-border relative group">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1 p-2">
                        <Button variant="default" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="default" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                        <Button variant="default" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Connected Accounts</CardTitle>
                <CardDescription>Connected via Composio. Add more accounts or reconnect expired tokens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { handle: '@smartphone_nepal', platform: 'Instagram', status: 'connected', lastPost: '2h ago', posts: 1247 },
                  { handle: '@technepaliinstag', platform: 'Instagram', status: 'connected', lastPost: '5h ago', posts: 892 },
                  { handle: '@nepalicut396', platform: 'Instagram', status: 'connected', lastPost: '1h ago', posts: 3421 },
                  { handle: '@nepalselite2026', platform: 'Instagram', status: 'connected', lastPost: '3h ago', posts: 2156 },
                  { handle: '@cuswebnepal', platform: 'Instagram', status: 'connected', lastPost: '1d ago', posts: 445 },
                  { handle: '@pending_account', platform: 'Instagram', status: 'pending', lastPost: '—', posts: 0 },
                ].map((acc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Instagram className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{acc.handle}</p>
                        <p className="text-sm text-muted-foreground">{acc.platform} • {acc.posts} posts • Last: {acc.lastPost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={acc.status === 'connected' ? 'success' : 'warning'}>
                        {acc.status}
                      </Badge>
                      <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect New Account (Composio OAuth)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Need to import Users icon
import { Users } from 'lucide-react'