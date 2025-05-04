"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { CookieConsent } from "./cookie-types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface CookieConsentContextType {
  consent: CookieConsent | null
  isLoading: boolean
  showBanner: boolean
  updateConsent: (consent: Partial<CookieConsent>) => Promise<void>
  saveConsent: () => Promise<void>
  setShowBanner: (show: boolean) => void
}

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBanner, setShowBanner] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Check if user is logged in and get their consent
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user?.id) {
          setUserId(session.user.id)

          // Get user's consent from Supabase
          const { data, error } = await supabase
            .from("cookie_consent")
            .select("*")
            .eq("user_id", session.user.id)
            .single()

          if (error && error.code !== "PGRST116") {
            console.error("Error fetching cookie consent:", error)
          }

          if (data) {
            setConsent({
              necessary: data.necessary,
              analytics: data.analytics,
              marketing: data.marketing,
              updatedAt: data.updated_at,
            })
          } else {
            // If no consent record exists, use default and show banner
            setConsent(defaultConsent)
            setShowBanner(true)
          }
        } else {
          // For non-logged in users, check localStorage
          const storedConsent = localStorage.getItem("cookieConsent")
          if (storedConsent) {
            setConsent(JSON.parse(storedConsent))
          } else {
            setConsent(defaultConsent)
            setShowBanner(true)
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        // Fallback to localStorage
        const storedConsent = localStorage.getItem("cookieConsent")
        if (storedConsent) {
          setConsent(JSON.parse(storedConsent))
        } else {
          setConsent(defaultConsent)
          setShowBanner(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [supabase])

  // Update consent state
  const updateConsent = async (newConsent: Partial<CookieConsent>) => {
    if (!consent) return

    const updatedConsent = {
      ...consent,
      ...newConsent,
      updatedAt: new Date().toISOString(),
    }

    setConsent(updatedConsent)
  }

  // Save consent to database or localStorage
  const saveConsent = async () => {
    if (!consent) return

    try {
      if (userId) {
        // Save to Supabase for logged in users
        const { error } = await supabase.from("cookie_consent").upsert({
          user_id: userId,
          necessary: consent.necessary,
          analytics: consent.analytics,
          marketing: consent.marketing,
          updated_at: new Date().toISOString(),
        })

        if (error) {
          console.error("Error saving cookie consent:", error)
        }
      } else {
        // Save to localStorage for non-logged in users
        localStorage.setItem("cookieConsent", JSON.stringify(consent))
      }

      // Apply consent settings
      applyConsentSettings(consent)

      // Hide banner
      setShowBanner(false)
    } catch (error) {
      console.error("Error saving consent:", error)
    }
  }

  // Apply consent settings by enabling/disabling cookies
  const applyConsentSettings = (settings: CookieConsent) => {
    // Always allow necessary cookies

    // Handle analytics cookies
    if (!settings.analytics) {
      // Disable Google Analytics
      window["ga-disable-UA-XXXXXXXX-X"] = true
      // Remove analytics cookies
      document.cookie = "_ga=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
      document.cookie = "_gat=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
      document.cookie = "_gid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }

    // Handle marketing cookies
    if (!settings.marketing) {
      // Remove marketing cookies
      document.cookie = "_fbp=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isLoading,
        showBanner,
        updateConsent,
        saveConsent,
        setShowBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
