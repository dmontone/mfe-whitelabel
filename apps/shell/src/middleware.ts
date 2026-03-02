import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Se tem query param, redireciona setando o cookie
  const tenantFromQuery = url.searchParams.get('tenant')
  if (tenantFromQuery) {
    const response = NextResponse.redirect(url.origin + url.pathname)
    response.cookies.set('tenant', tenantFromQuery, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })
    return response
  }
  
  // Lê tenant do cookie, ou default 'a'
  const tenantFromCookie = request.cookies.get('tenant')?.value
  const tenant = tenantFromCookie || 'a'

  const response = NextResponse.next()
  response.headers.set('x-tenant', tenant)
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
