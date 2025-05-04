export type CookieCategory = "necessary" | "analytics" | "marketing"

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export interface CookieInfo {
  name: string
  provider: string
  purpose: string
  expiry: string
  category: CookieCategory
}

export const cookiesList: CookieInfo[] = [
  {
    name: "sb-auth-token",
    provider: "Mano10",
    purpose: "Authentication",
    expiry: "1 year",
    category: "necessary",
  },
  {
    name: "theme-preference",
    provider: "Mano10",
    purpose: "Stores user theme preference",
    expiry: "1 year",
    category: "necessary",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Registers a unique ID that is used to generate statistical data",
    expiry: "2 years",
    category: "analytics",
  },
  {
    name: "_gat",
    provider: "Google Analytics",
    purpose: "Used to throttle request rate",
    expiry: "1 day",
    category: "analytics",
  },
  {
    name: "_fbp",
    provider: "Facebook",
    purpose: "Used by Facebook to deliver advertisements",
    expiry: "3 months",
    category: "marketing",
  },
]
