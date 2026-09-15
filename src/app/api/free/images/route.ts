import { NextRequest, NextResponse } from 'next/server'
import { searchImagesPexels, generateAIImage } from '@/lib/services/free-apis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const perPage = parseInt(searchParams.get('per_page') || '15')
  const orientation = searchParams.get('orientation') || 'landscape'

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    )
  }

  try {
    const images = await searchImagesPexels(query, { perPage, orientation: orientation as any })
    
    return NextResponse.json({
      success: true,
      query,
      count: images.length,
      images: images.map(img => ({
        url: img.url,
        thumbnail: img.thumbnail,
        alt: img.alt,
        photographer: img.photographer,
        photographerUrl: img.photographerUrl,
        width: img.width,
        height: img.height,
      })),
    })
  } catch (error) {
    console.error('Images API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, width = 1024, height = 1024, model = 'flux', seed } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const imageUrl = await generateAIImage(prompt, { width, height, model, seed })
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      prompt,
      imageUrl,
      width,
      height,
      model,
    })
  } catch (error) {
    console.error('AI Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}