import { NextRequest, NextResponse } from 'next/server'
import { searchPlacesNominatim, NEPAL_CITIES, SERVICE_QUERIES } from '@/lib/services/free-apis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'
  const city = searchParams.get('city') || 'kathmandu'
  const limit = parseInt(searchParams.get('limit') || '50')
  const radius = parseInt(searchParams.get('radius') || '15000')

  if (!query && category === 'all') {
    return NextResponse.json(
      { error: 'Please provide a search query or select a category' },
      { status: 400 }
    )
  }

  const cityData = NEPAL_CITIES[city as keyof typeof NEPAL_CITIES] || NEPAL_CITIES.kathmandu

  try {
    let queries: string[] = []

    if (query) {
      queries = [query]
    } else {
      const categoryQueries = SERVICE_QUERIES.GOOGLE_MAPS_LEAD_GEN.filter(q =>
        category === 'all' || q.toLowerCase().includes(category.toLowerCase())
      ).slice(0, 5)
      
      queries = categoryQueries.length > 0 ? categoryQueries : [category]
    }

    const allResults = []
    
    for (const q of queries) {
      const places = await searchPlacesNominatim(
        `${q} ${cityData.name}`,
        { 
          lat: cityData.lat, 
          lon: cityData.lon, 
          radius, 
          limit: Math.min(limit, 30) 
        }
      )
      
      const enriched = places.map(place => ({
        ...place,
        city: cityData.name,
        hasPhone: !!place.phone,
        hasWebsite: !!place.website,
        score: calculateScore({
          hasPhone: !!place.phone,
          hasEmail: !!place.website,
          hasWebsite: !!place.website,
          hasInstagram: false,
          hasWhatsApp: false,
          industryMatch: category === 'all' || place.category?.includes(category),
          locationMatch: true,
        }),
      }))
      
      allResults.push(...enriched)
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 300))
    }

    // Deduplicate by placeId
    const unique = new Map()
    for (const place of allResults) {
      if (!unique.has(place.placeId) || place.score > unique.get(place.placeId).score) {
        unique.set(place.placeId, place)
      }
    }

    const sorted = Array.from(unique.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      count: sorted.length,
      query: query || category,
      city: cityData.name,
      results: sorted,
    })
  } catch (error) {
    console.error('Places API error:', error)
    return NextResponse.json(
      { error: 'Failed to search places' },
      { status: 500 }
    )
  }
}

function calculateScore(lead: {
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