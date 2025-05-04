export const locales = ["en", "lt"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

// Add back the missing localeNames export
export const localeNames: Record<Locale, string> = {
  en: "English",
  lt: "Lietuvių",
}

// Function to get text direction
export function getDirection(locale: Locale) {
  return "ltr"
}

// Default translations to avoid fetch during initial load
export const defaultTranslations = {
  common: {
    appName: "EduAI Hub",
    loading: "Loading...",
    error: "An error occurred",
  },
  navigation: {
    home: "Home",
    dashboard: "Dashboard",
    login: "Log In",
    signup: "Sign Up",
    news: "News",
    about: "About",
    pricing: "Pricing",
    blog: "Blog",
  },
}
