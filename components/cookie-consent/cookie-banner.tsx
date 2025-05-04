"use client"

import { useState } from "react"
import { useCookieConsent } from "./cookie-consent-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { cookiesList } from "./cookie-types"

export function CookieBanner() {
  const { consent, showBanner, updateConsent, saveConsent, setShowBanner } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)

  if (!showBanner || !consent) return null

  const handleAcceptAll = async () => {
    await updateConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })
    await saveConsent()
  }

  const handleAcceptNecessary = async () => {
    await updateConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    })
    await saveConsent()
  }

  const handleSavePreferences = async () => {
    await saveConsent()
    setShowDetails(false)
  }

  return (
    <>
      {/* Simple banner */}
      {!showDetails && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <p>
                Mes naudojame slapukus, kad užtikrintume geriausią patirtį mūsų svetainėje. Tęsdami naršymą, jūs
                sutinkate su mūsų slapukų naudojimu.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
                Nustatymai
              </Button>
              <Button variant="outline" size="sm" onClick={handleAcceptNecessary}>
                Tik būtini
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Priimti visus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Slapukų nustatymai</DialogTitle>
            <DialogDescription>
              Pasirinkite, kokius slapukus norite leisti. Jūs galite bet kada pakeisti šiuos nustatymus.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="privacy">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="privacy">Privatumas</TabsTrigger>
              <TabsTrigger value="necessary">Būtini</TabsTrigger>
              <TabsTrigger value="preferences">Nustatymai</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="space-y-4 py-4">
              <p className="text-sm">
                Mes naudojame slapukus, kad pagerintume jūsų naršymo patirtį, parodytume jums pritaikytą turinį ir
                analizuotume mūsų srautą. Galite pasirinkti, kokius slapukus norite leisti.
              </p>
            </TabsContent>

            <TabsContent value="necessary" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Būtini slapukai</h4>
                    <p className="text-sm text-muted-foreground">
                      Šie slapukai yra būtini svetainės veikimui ir negali būti išjungti.
                    </p>
                  </div>
                  <Switch checked={consent.necessary} disabled />
                </div>

                <div className="border rounded-md">
                  <div className="p-4 space-y-4">
                    {cookiesList
                      .filter((cookie) => cookie.category === "necessary")
                      .map((cookie) => (
                        <div key={cookie.name} className="text-sm">
                          <p className="font-medium">{cookie.name}</p>
                          <p className="text-muted-foreground">Tiekėjas: {cookie.provider}</p>
                          <p className="text-muted-foreground">Tikslas: {cookie.purpose}</p>
                          <p className="text-muted-foreground">Galiojimas: {cookie.expiry}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Analitiniai slapukai</h4>
                    <p className="text-sm text-muted-foreground">
                      Šie slapukai leidžia mums analizuoti svetainės naudojimą ir pagerinti jūsų patirtį.
                    </p>
                  </div>
                  <Switch
                    checked={consent.analytics}
                    onCheckedChange={(checked) => updateConsent({ analytics: checked })}
                    id="analytics"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Rinkodaros slapukai</h4>
                    <p className="text-sm text-muted-foreground">
                      Šie slapukai naudojami sekti jūsų naršymą ir rodyti jums pritaikytą reklamą.
                    </p>
                  </div>
                  <Switch
                    checked={consent.marketing}
                    onCheckedChange={(checked) => updateConsent({ marketing: checked })}
                    id="marketing"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Atšaukti
            </Button>
            <Button variant="outline" onClick={handleAcceptNecessary}>
              Tik būtini
            </Button>
            <Button variant="outline" onClick={handleAcceptAll}>
              Priimti visus
            </Button>
            <Button onClick={handleSavePreferences}>Išsaugoti nustatymus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
