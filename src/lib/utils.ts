import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'NPR', locale = 'en-NP'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-NP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(d)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function parseJSON<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateScore(lead: {
  hasPhone: boolean
  hasEmail: boolean
  hasWebsite: boolean
  hasInstagram: boolean
  hasWhatsApp: boolean
  industryMatch: boolean
  locationMatch: boolean
}): number {
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

export const SERVICE_TYPES = [
  { id: 'GOOGLE_MAPS_LEAD_GEN', label: 'Google Maps Lead Gen', icon: 'MapPin', color: 'brand' },
  { id: 'COMPETITOR_PRICE_MONITORING', label: 'Competitor Price Monitoring', icon: 'ShoppingCart', color: 'orange' },
  { id: 'SOCIAL_MEDIA_CONTENT_PIPELINE', label: 'Social Media Content Pipeline', icon: 'Image', color: 'purple' },
  { id: 'WHATSAPP_AUTOMATION', label: 'WhatsApp Automation', icon: 'MessageSquare', color: 'green' },
  { id: 'LOCAL_SEO_GMB', label: 'Local SEO / GMB Optimization', icon: 'Search', color: 'red' },
] as const

export const LEAD_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: 'New', color: 'gray' },
  CONTACTED: { label: 'Contacted', color: 'blue' },
  QUALIFIED: { label: 'Qualified', color: 'yellow' },
  DEMO_SCHEDULED: { label: 'Demo Scheduled', color: 'purple' },
  DEMO_COMPLETED: { label: 'Demo Completed', color: 'indigo' },
  PROPOSAL_SENT: { label: 'Proposal Sent', color: 'orange' },
  NEGOTIATING: { label: 'Negotiating', color: 'amber' },
  CLOSED_WON: { label: 'Closed Won', color: 'green' },
  CLOSED_LOST: { label: 'Closed Lost', color: 'red' },
}

export const TASK_TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  LEAD_RESEARCH: { label: 'Lead Research', icon: 'Search' },
  OUTREACH: { label: 'Outreach', icon: 'Send' },
  DEMO: { label: 'Demo', icon: 'Monitor' },
  FOLLOW_UP: { label: 'Follow Up', icon: 'RotateCcw' },
  PROPOSAL: { label: 'Proposal', icon: 'FileText' },
  ONBOARDING: { label: 'Onboarding', icon: 'UserPlus' },
  CONTENT_CREATION: { label: 'Content Creation', icon: 'Image' },
  REPORTING: { label: 'Reporting', icon: 'BarChart' },
}