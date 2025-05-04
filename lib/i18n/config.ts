export type Locale = "en" | "lt"

export const defaultLocale: Locale = "en"

export const locales: Locale[] = ["en", "lt"]

export const localeNames: Record<Locale, string> = {
  en: "English",
  lt: "Lietuvių",
}

export function getDirection(locale: Locale) {
  return "ltr"
}
