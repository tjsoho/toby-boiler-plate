import { FlagComponent, US, DE } from "country-flag-icons/react/3x2";

//--------------------------------
// Locale configuration
//--------------------------------
export enum Locale {
  EN = "en",
  DE = "de",
}

// Define the flag icons for each locale
export const LOCALE_ICON: Record<Locale, FlagComponent> = {
  [Locale.EN]: US,
  [Locale.DE]: DE,
};

// First locale is the default one
export const SUPPORTED_LOCALES = [Locale.EN, Locale.DE];
export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0] || Locale.EN;
