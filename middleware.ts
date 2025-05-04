import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n/config"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  // Check if the pathname should be excluded from locale detection
  const excludedPaths = ["/api", "/_next", "/images", "/favicon.ico", "/robots.txt"]
  const shouldExclude = excludedPaths.some((path) => pathname.startsWith(path))

  if (shouldExclude) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  // Get the preferred locale from the cookie or header
  const cookieLocale = request.cookies.get("locale")?.value
  const headerLocale = request.headers.get("accept-language")?.split(",")[0].split("-")[0]

  // Determine the locale to use
  let locale = defaultLocale
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    locale = cookieLocale
  } else if (headerLocale && locales.includes(headerLocale as any)) {
    locale = headerLocale
  }

  // Redirect to the locale-prefixed URL
  return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
