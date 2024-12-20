import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,
  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed", // or "always" if you want to show default locale in the URL
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
