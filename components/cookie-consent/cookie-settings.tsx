"use client"

import { useCookieConsent } from "./cookie-consent-context"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cookiesList } from "./cookie-types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function CookieSettings() {
  const { consent, updateConsent, saveConsent, setShowBanner } = useCookieConsent()
  const [isSaving, setIsSaving] = useState(false)

  if (!consent) return null

  const handleSave = async () => {
    setIsSaving(true)
    await saveConsent()
    setIsSaving(false)
  }

  const handleResetPreferences = () => {
    setShowBanner(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Slapukų nustatymai</CardTitle>
        <CardDescription>Valdykite, kokius slapukus leidžiate mūsų svetainėje</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Visi slapukai</TabsTrigger>
            <TabsTrigger value="necessary">Būtini</TabsTrigger>
            <TabsTrigger value="optional">Pasirenkami</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 py-4">
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
                  id="analytics-settings"
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
                  id="marketing-settings"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="necessary" className="space-y-4 py-4">
            <div className="space-y-4">
              {cookiesList
                .filter((cookie) => cookie.category === "necessary")
                .map((cookie) => (
                  <div key={cookie.name} className="p-4 border rounded-md">
                    <h4 className="font-medium">{cookie.name}</h4>
                    <p className="text-sm">Tiekėjas: {cookie.provider}</p>
                    <p className="text-sm">Tikslas: {cookie.purpose}</p>
                    <p className="text-sm">Galiojimas: {cookie.expiry}</p>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="optional" className="space-y-4 py-4">
            <div className="space-y-4">
              {cookiesList
                .filter((cookie) => cookie.category !== "necessary")
                .map((cookie) => (
                  <div key={cookie.name} className="p-4 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{cookie.name}</h4>
                      <Switch
                        checked={consent[cookie.category]}
                        onCheckedChange={(checked) => updateConsent({ [cookie.category]: checked })}
                        id={`cookie-${cookie.name}`}
                      />
                    </div>
                    <p className="text-sm">Tiekėjas: {cookie.provider}</p>
                    <p className="text-sm">Tikslas: {cookie.purpose}</p>
                    <p className="text-sm">Galiojimas: {cookie.expiry}</p>
                    <p className="text-sm">Kategorija: {cookie.category}</p>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleResetPreferences}>
          Atstatyti nustatymus
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Išsaugoma..." : "Išsaugoti nustatymus"}
        </Button>
      </CardFooter>
    </Card>
  )
}
