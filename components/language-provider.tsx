"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, defaultLocale, locales } from "@/lib/i18n/config"
import { useLocalStorage } from "@/hooks/use-local-storage"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Default translations as fallback
const defaultTranslations = {
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

type LanguageProviderProps = {
  children: ReactNode
  initialLocale?: Locale
  messages?: Record<string, any>
}

export function LanguageProvider({ children, initialLocale = defaultLocale, messages = {} }: LanguageProviderProps) {
  const [storedLocale, setStoredLocale] = useLocalStorage<Locale>("locale", initialLocale)
  const [locale, setLocale] = useState<Locale>(storedLocale || initialLocale)
  const [translations, setTranslations] = useState<Record<string, any>>(messages || defaultTranslations)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    setStoredLocale(locale)
  }, [locale, setStoredLocale])

  useEffect(() => {
    let isMounted = true

    async function loadTranslations() {
      if (Object.keys(messages).length > 0) {
        if (isMounted) {
          setTranslations(messages)
        }
        return
      }

      setIsLoading(true)
      try {
        // Use public directory for translations with a timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)

        const response = await fetch(`/messages/${locale}.json`, {
          signal: controller.signal,
          cache: "force-cache",
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`Failed to load translations: ${response.status}`)
        }

        const data = await response.json()

        if (isMounted) {
          setTranslations(data)
          setLoadError(false)
        }
      } catch (error) {
        console.error("Failed to load translations:", error)
        if (isMounted) {
          setLoadError(true)
          // Use default translations as fallback
          setTranslations(defaultTranslations)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTranslations()

    return () => {
      isMounted = false
    }
  }, [locale, messages])

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    if (typeof value !== "string") return key

    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, "g"), paramValue)
      }, value)
    }

    return value || key
  }

  const changeLocale = (newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocale(newLocale)
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLocale, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}
