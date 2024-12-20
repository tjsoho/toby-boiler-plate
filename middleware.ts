import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./i18n/config";

const intlMiddleware = createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all routes except static files and APIs
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---------------------------------------------------
  // Comment out the following block and "if" statement
  // if you want to show the default locale in the URL
  const hasLocalePrefix = SUPPORTED_LOCALES.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!hasLocalePrefix) {
    const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);
    return NextResponse.rewrite(newUrl);
  }
  // ---------------------------------------------------

  // Use next-intl middleware for handling locale-based routing
  return intlMiddleware(request);
}
