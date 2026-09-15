import { NextRequest, NextResponse } from 'next/server'
import { searchPlacesNominatim, getWeather, getExchangeRates, searchImagesPexels, NEPAL_CITIES, SERVICE_QUERIES } from '@/lib/services/free-apis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'all' // places, weather, currency, images, all
  const query = searchParams.get('q') || ''
  const city = searchParams.get('city') || 'kathmandu'

  const cityData = NEPAL_CITIES[city as keyof typeof NEPAL_CITIES] || NEPAL_CITIES.kathmandu

  try {
    const results: any = {}

    if (type === 'places' || type === 'all') {
      if (query) {
        const places = await searchPlacesNominatim(
          `${query} ${cityData.name}`,
          { lat: cityData.lat, lon: cityData.lon, radius: 15000, limit: 20 }
        )
        results.places = places.slice(0, 10)
      }
    }

    if (type === 'weather' || type === 'all') {
      const weather = await getWeather(cityData.lat, cityData.lon, 3)
      results.weather = weather
    }

    if (type === 'currency' || type === 'all') {
      const rates = await getExchangeRates('USD')
      results.currency = rates ? {
        base: rates.base,
        date: rates.date,
        keyRates: {
          NPR: rates.rates.NPR,
          EUR: rates.rates.EUR,
          GBP: rates.rates.GBP,
          INR: rates.rates.INR,
          JPY: rates.rates.JPY,
          CNY: rates.rates.CNY,
        }
      } : null
    }

    if (type === 'images' || type === 'all') {
      if (query) {
        const images = await searchImagesPexels(query, { perPage: 10 })
        results.images = images.slice(0, 6)
      }
    }

    // Add available categories for lead gen
    if (type === 'all' || type === 'categories') {
      results.categories = {
        leadGen: SERVICE_QUERIES.GOOGLE_MAPS_LEAD_GEN,
        priceMonitor: SERVICE_QUERIES.COMPETITOR_PRICE_MONITORING,
        content: SERVICE_QUERIES.SOCIAL_MEDIA_CONTENT_PIPELINE,
        whatsapp: SERVICE_QUERIES.WHATSAPP_AUTOMATION,
        seo: SERVICE_QUERIES.LOCAL_SEO_GMB,
      }
      results.cities = Object.entries(NEPAL_CITIES).map(([key, val]) => ({ key, ...val }))
    }

    return NextResponse.json({
      success: true,
      query,
      city: cityData.name,
      timestamp: new Date().toISOString(),
      ...results,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}