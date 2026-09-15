// Free API Services - No keys required, globally accessible
import axios from 'axios'

// Types
export interface PlaceResult {
  placeId: string
  name: string
  address: string
  phone?: string
  website?: string
  latitude: number
  longitude: number
  category: string
  subcategory?: string
  rating?: number
  reviewCount?: number
  openingHours?: Record<string, string>
  photos?: string[]
  source: 'nominatim' | 'google' | 'manual'
}

export interface GeocodeResult {
  latitude: number
  longitude: number
  address: string
  city?: string
  country?: string
  countryCode?: string
}

export interface WeatherData {
  current: {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
  }
  daily?: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
  }
}

export interface ExchangeRateData {
  base: string
  rates: Record<string, number>
  date: string
}

export interface ImageResult {
  url: string
  thumbnail: string
  photographer?: string
  photographerUrl?: string
  alt: string
  width: number
  height: number
}

// Rate limiting
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const record = rateLimits.get(key)
  
  if (!record || now > record.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

// Nominatim / OpenStreetMap - Free, no key, 1 req/sec
export async function searchPlacesNominatim(
  query: string,
  options: {
    lat?: number
    lon?: number
    radius?: number
    limit?: number
    countryCodes?: string
  } = {}
): Promise<PlaceResult[]> {
  const { lat = 27.7172, lon = 85.324, radius = 50000, limit = 50, countryCodes = 'np' } = options
  
  if (!checkRateLimit('nominatim', 1, 1100)) {
    await new Promise(r => setTimeout(r, 1100))
  }
  
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: limit.toString(),
    addressdetails: '1',
    extratags: '1',
    namedetails: '1',
    'accept-language': 'en',
    countrycodes: countryCodes,
  })
  
  // Add viewbox for biased results
  const viewbox = `${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}`
  params.append('viewbox', viewbox)
  params.append('bounded', '1')
  
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: {
        'User-Agent': 'LeadGenPlatform/1.0 (https://leadgen-platform.vercel.app)',
      },
      timeout: 10000,
    })
    
    return response.data.map((place: any) => ({
      placeId: `osm_${place.place_id}`,
      name: place.display_name.split(',')[0],
      address: place.display_name,
      phone: place.extratags?.phone || place.extratags?.contact_phone,
      website: place.extratags?.website || place.extratags?.contact_website,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
      category: place.class,
      subcategory: place.type,
      source: 'nominatim' as const,
    }))
  } catch (error) {
    console.error('Nominatim search error:', error)
    return []
  }
}

export async function reverseGeocodeNominatim(lat: number, lon: number): Promise<GeocodeResult | null> {
  if (!checkRateLimit('nominatim_reverse', 1, 1100)) {
    await new Promise(r => setTimeout(r, 1100))
  }
  
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
        addressdetails: 1,
        'accept-language': 'en',
      },
      headers: {
        'User-Agent': 'LeadGenPlatform/1.0',
      },
    })
    
    const addr = response.data.address
    return {
      latitude: lat,
      longitude: lon,
      address: response.data.display_name,
      city: addr.city || addr.town || addr.village || addr.municipality,
      country: addr.country,
      countryCode: addr.country_code?.toUpperCase(),
    }
  } catch (error) {
    console.error('Reverse geocode error:', error)
    return null
  }
}

// Open-Meteo Weather - Free, no key, unlimited
export async function getWeather(lat: number, lon: number, days = 7): Promise<WeatherData | null> {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        timezone: 'auto',
        forecast_days: days,
      },
      timeout: 10000,
    })
    return response.data
  } catch (error) {
    console.error('Weather API error:', error)
    return null
  }
}

// Exchange Rate - Free, no key (open.er-api.com)
export async function getExchangeRates(base = 'USD'): Promise<ExchangeRateData | null> {
  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${base}`, {
      timeout: 10000,
    })
    if (response.data.result === 'success') {
      return response.data
    }
    return null
  } catch (error) {
    console.error('Exchange rate error:', error)
    // Fallback to exchangerate.host
    try {
      const fallback = await axios.get(`https://api.exchangerate.host/latest?base=${base}`, {
        timeout: 10000,
      })
      return {
        base: fallback.data.base,
        rates: fallback.data.rates,
        date: fallback.data.date,
      }
    } catch {
      return null
    }
  }
}

// Convert currency using free API
export async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  const rates = await getExchangeRates(from)
  if (rates && rates.rates[to]) {
    return amount * rates.rates[to]
  }
  return amount // fallback: no conversion
}

// Pexels Images - Free tier (200/hour without key, higher with key)
export async function searchImagesPexels(
  query: string,
  options: { perPage?: number; orientation?: 'landscape' | 'portrait' | 'square' } = {}
): Promise<ImageResult[]> {
  const { perPage = 15, orientation } = options
  const apiKey = process.env.PEXELS_API_KEY
  
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: { query, per_page: perPage, orientation },
      headers: {
        Authorization: apiKey || '',
      },
      timeout: 10000,
    })
    
    return response.data.photos.map((photo: any) => ({
      url: photo.src.original,
      thumbnail: photo.src.medium,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
    }))
  } catch (error) {
    console.error('Pexels error:', error)
    // Fallback to Unsplash Source (no key needed)
    return getUnsplashSourceImages(query, perPage)
  }
}

// Unsplash Source - No key, unlimited (but rate limited by browser)
function getUnsplashSourceImages(query: string, count: number): ImageResult[] {
  const encoded = encodeURIComponent(query)
  return Array.from({ length: count }, (_, i) => ({
    url: `https://source.unsplash.com/800x600/?${encoded}&sig=${i}`,
    thumbnail: `https://source.unsplash.com/400x300/?${encoded}&sig=${i}`,
    alt: query,
    width: 800,
    height: 600,
  }))
}

// Pollinations AI - Free AI image generation
export async function generateAIImage(
  prompt: string,
  options: { width?: number; height?: number; model?: string; seed?: number } = {}
): Promise<string | null> {
  const { width = 1024, height = 1024, model = 'flux', seed } = options
  
  try {
    const params = new URLSearchParams({
      prompt,
      width: width.toString(),
      height: height.toString(),
      model,
      ...(seed && { seed: seed.toString() }),
      nologo: 'true',
      private: 'true',
    })
    
    const response = await axios.get(`https://image.pollinations.ai/prompt/${params}`, {
      responseType: 'arraybuffer',
      timeout: 30000,
    })
    
    // Convert to base64 data URL
    const base64 = Buffer.from(response.data).toString('base64')
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error('Pollinations error:', error)
    return null
  }
}

// Google Places (optional - requires API key)
export async function searchPlacesGoogle(
  query: string,
  options: { lat?: number; lon?: number; radius?: number; type?: string } = {}
): Promise<PlaceResult[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) return []
  
  const { lat = 27.7172, lon = 85.324, radius = 50000, type } = options
  
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query,
        location: `${lat},${lon}`,
        radius,
        type,
        key: apiKey,
      },
      timeout: 10000,
    })
    
    return response.data.results.map((place: any) => ({
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number,
      website: place.website,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      category: place.types[0] || 'establishment',
      subcategory: place.types.slice(1).join(', '),
      rating: place.rating,
      reviewCount: place.user_ratings_total,
      source: 'google' as const,
    }))
  } catch (error) {
    console.error('Google Places error:', error)
    return []
  }
}

// High-level service functions for each business type
export const SERVICE_QUERIES = {
  GOOGLE_MAPS_LEAD_GEN: [
    'salon', 'spa', 'beauty parlour', 'barbershop', 'hair salon',
    'restaurant', 'cafe', 'bakery', 'coffee shop',
    'gym', 'fitness center', 'yoga studio', 'pilates',
    'dental clinic', 'skin clinic', 'dermatologist', 'ayurvedic clinic',
    'boutique', 'tailor', 'clothing store',
    'photography studio', 'wedding planner', 'event management',
    'real estate agency', 'property dealer',
    'coaching center', 'tutoring', 'language school',
    'car repair', 'car wash', 'auto service',
    'laundry', 'dry cleaning',
    'pharmacy', 'medical store',
    'optical', 'eye care',
    'veterinary', 'pet clinic', 'pet grooming',
  ],
  COMPETITOR_PRICE_MONITORING: [
    'e-commerce', 'online store', 'shopify', 'woocommerce',
    'hotel', 'resort', 'guest house', 'homestay',
    'tour operator', 'travel agency', 'trekking agency',
    'airline ticketing', 'bus booking',
  ],
  SOCIAL_MEDIA_CONTENT_PIPELINE: [
    'salon', 'spa', 'restaurant', 'cafe', 'gym', 'yoga studio',
    'coach', 'consultant', 'trainer', 'influencer',
    'boutique', 'fashion', 'jewelry', 'accessories',
    'bakery', 'cake shop', 'dessert',
    'photography', 'videography',
    'real estate', 'property',
    'education', 'coaching', 'training',
    'wellness', 'ayurveda', 'naturopathy',
  ],
  WHATSAPP_AUTOMATION: [
    'salon', 'spa', 'clinic', 'dental', 'skin clinic',
    'gym', 'yoga studio', 'physiotherapy',
    'restaurant', 'cafe', 'bakery',
    'real estate agent', 'property dealer',
    'travel agency', 'tour operator',
    'coaching center', 'tutoring',
    'boutique', 'tailor',
    'pharmacy', 'medical store',
    'veterinary', 'pet clinic',
    'car service', 'car wash',
    'laundry', 'dry cleaning',
  ],
  LOCAL_SEO_GMB: [
    'salon', 'spa', 'restaurant', 'cafe', 'gym', 'clinic',
    'dental', 'skin clinic', 'pharmacy', 'optical',
    'boutique', 'tailor', 'bakery', 'photography',
    'real estate', 'travel agency', 'coaching center',
    'veterinary', 'pet clinic', 'car service', 'laundry',
  ],
} as const

// Nepal-specific city centers for targeted search
export const NEPAL_CITIES = {
  kathmandu: { lat: 27.7172, lon: 85.324, name: 'Kathmandu' },
  thamel: { lat: 27.7167, lon: 85.3117, name: 'Thamel' },
  patan: { lat: 27.6736, lon: 85.3194, name: 'Patan (Lalitpur)' },
  boudha: { lat: 27.7214, lon: 85.3611, name: 'Boudha' },
  lazimpat: { lat: 27.7297, lon: 85.3206, name: 'Lazimpat' },
  bhaktapur: { lat: 27.671, lon: 85.4298, name: 'Bhaktapur' },
  pokhara: { lat: 28.2096, lon: 83.9856, name: 'Pokhara' },
  lakeside: { lat: 28.2127, lon: 83.9494, name: 'Lakeside, Pokhara' },
  biratnagar: { lat: 26.4525, lon: 87.2718, name: 'Biratnagar' },
  birgunj: { lat: 27.0027, lon: 84.8697, name: 'Birgunj' },
  dharan: { lat: 26.8133, lon: 87.28, name: 'Dharan' },
  butwal: { lat: 27.6924, lon: 83.4589, name: 'Butwal' },
  hetauda: { lat: 27.4167, lon: 85.0333, name: 'Hetauda' },
  janakpur: { lat: 26.7271, lon: 85.9236, name: 'Janakpur' },
} as const

// Search leads for a specific service in Nepal cities
export async function searchLeadsForService(
  serviceType: keyof typeof SERVICE_QUERIES,
  cities: string[] = ['kathmandu', 'thamel', 'patan', 'boudha', 'lazimpat']
): Promise<PlaceResult[]> {
  const queries = SERVICE_QUERIES[serviceType]
  const allResults: PlaceResult[] = []
  
  for (const cityKey of cities) {
    const city = NEPAL_CITIES[cityKey as keyof typeof NEPAL_CITIES]
    if (!city) continue
    
    for (const query of queries) {
      const results = await searchPlacesNominatim(
        `${query} ${city.name}`,
        { lat: city.lat, lon: city.lon, radius: 10000, limit: 20 }
      )
      allResults.push(...results)
      
      // Rate limit: small delay between queries
      await new Promise(r => setTimeout(r, 200))
    }
  }
  
  // Deduplicate by placeId
  const unique = new Map<string, PlaceResult>()
  for (const place of allResults) {
    if (!unique.has(place.placeId)) {
      unique.set(place.placeId, place)
    }
  }
  
  return Array.from(unique.values())
}