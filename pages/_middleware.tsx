// handles every single request coming in between pages
import { NextRequest, NextResponse } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  url.pathname = '/signin'
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.HOBBS_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect(url)
    }
  }
}
