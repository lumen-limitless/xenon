import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // restricted api route api key middleware
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const { headers } = request
    const apiKey = headers.get('x-api-key')
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
  }

  // cron api route cron key middleware
  if (request.nextUrl.pathname.startsWith('/api/cron')) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        {
          status: 401,
        },
      )
    }
  }
}
