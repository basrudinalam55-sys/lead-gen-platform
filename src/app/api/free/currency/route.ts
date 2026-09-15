import { NextRequest, NextResponse } from 'next/server'
import { getExchangeRates, convertCurrency } from '@/lib/services/free-apis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const base = searchParams.get('base') || 'USD'
  const target = searchParams.get('target')
  const amount = parseFloat(searchParams.get('amount') || '1')

  try {
    const rates = await getExchangeRates(base.toUpperCase())
    
    if (!rates) {
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: 500 }
      )
    }

    if (target) {
      const targetUpper = target.toUpperCase()
      const rate = rates.rates[targetUpper]
      
      if (!rate) {
        return NextResponse.json(
          { error: `Currency ${targetUpper} not found` },
          { status: 404 }
        )
      }

      const converted = amount * rate

      return NextResponse.json({
        success: true,
        base: rates.base,
        target: targetUpper,
        rate,
        amount,
        converted: Math.round(converted * 100) / 100,
        date: rates.date,
      })
    }

    // Return all rates
    return NextResponse.json({
      success: true,
      base: rates.base,
      rates: rates.rates,
      date: rates.date,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Currency API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, from, to } = body

    if (!amount || !from || !to) {
      return NextResponse.json(
        { error: 'amount, from, and to are required' },
        { status: 400 }
      )
    }

    const converted = await convertCurrency(amount, from.toUpperCase(), to.toUpperCase())
    
    return NextResponse.json({
      success: true,
      amount,
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      converted: Math.round(converted * 100) / 100,
    })
  } catch (error) {
    console.error('Currency conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert currency' },
      { status: 500 }
    )
  }
}