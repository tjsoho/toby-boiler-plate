"use client";
import { DEFAULT_LOCALE, LOCALE_ICON, SUPPORTED_LOCALES } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const currentLocale = pathName.split("/")[1] || DEFAULT_LOCALE;

  if (SUPPORTED_LOCALES.length < 2) {
    return null;
  }

  return (
    <div className="flex gap-3 mr-3">
      {SUPPORTED_LOCALES.map((locale) => {
        const Flag = LOCALE_ICON[locale];
        return (
          <Link
            href={"/"}
            locale={locale}
            key={locale}
            className={`flex items-center gap-1 hover:underline ${
              currentLocale === locale ? "font-bold" : ""
            }`}
          >
            <Flag className="w-5" />
            <span className="text-xs">{locale.toUpperCase()}</span>
          </Link>
        );
      })}
    </div>
  );
}
