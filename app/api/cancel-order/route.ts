import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return { message: 'Hello World' }
}
