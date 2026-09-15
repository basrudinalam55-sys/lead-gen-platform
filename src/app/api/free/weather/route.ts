import { NextRequest, NextResponse } from 'next/server'
import { getWeather } from '@/lib/services/free-apis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '27.7172')
  const lon = parseFloat(searchParams.get('lon') || '85.3240')
  const days = parseInt(searchParams.get('days') || '7')

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json(
      { error: 'Invalid coordinates' },
      { status: 400 }
    )
  }

  try {
    const weather = await getWeather(lat, lon, Math.min(days, 14))
    
    if (!weather) {
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      location: { latitude: lat, longitude: lon },
      current: weather.current_weather || weather.current,
      daily: weather.daily,
      units: {
        temperature: 'celsius',
        windspeed: 'kmh',
        precipitation: 'mm',
      },
    })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}