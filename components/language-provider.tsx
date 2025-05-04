"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
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

type LanguageProviderProps = {
  children: ReactNode
  initialLocale?: Locale
  messages?: Record<string, any>
}

export function LanguageProvider({ children, initialLocale = defaultLocale, messages = {} }: LanguageProviderProps) {
  const [storedLocale, setStoredLocale] = useLocalStorage<Locale>("locale", initialLocale)
  const [locale, setLocale] = useState<Locale>(storedLocale || initialLocale)
  const [translations, setTranslations] = useState<Record<string, any>>(messages)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setStoredLocale(locale)
  }, [locale, setStoredLocale])

  useEffect(() => {
    async function loadTranslations() {
      if (Object.keys(translations).length === 0) {
        setIsLoading(true)
        try {
          const response = await fetch(`/messages/${locale}.json`)
          const data = await response.json()
          setTranslations(data)
        } catch (error) {
          console.error("Failed to load translations:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadTranslations()
  }, [locale, translations])

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
