"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { locales, localeNames, type Locale } from "@/lib/i18n/config"

export default function SettingsPage() {
  const { t, locale, setLocale } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [animationQuality, setAnimationQuality] = useState("medium")
  const [reducedMotion, setReducedMotion] = useState(false)

  const handleSavePreferences = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: t("settings.settingsSaved"),
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("settings.title")}</h1>
        <p className="text-muted-foreground">{t("settings.preferences")}</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">{t("settings.account")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("settings.theme")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
          <TabsTrigger value="language">{t("settings.language")}</TabsTrigger>
          <TabsTrigger value="animations">{t("settings.animations")}</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.profile")}</CardTitle>
              <CardDescription>{t("settings.account")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("settings.firstName")}</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("settings.lastName")}</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("settings.email")}</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t("common.save")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.theme")}</CardTitle>
              <CardDescription>{t("settings.preferences")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t("settings.theme")}</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder={t("settings.theme")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t("settings.light")}</SelectItem>
                    <SelectItem value="dark">{t("settings.dark")}</SelectItem>
                    <SelectItem value="system">{t("settings.system")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t("common.save")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notifications")}</CardTitle>
              <CardDescription>{t("settings.preferences")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.emailNotifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your account activity.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.pushNotifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications about your account activity.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t("common.save")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.language")}</CardTitle>
              <CardDescription>{t("settings.preferences")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t("settings.language")}</Label>
                <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("settings.language")} />
                  </SelectTrigger>
                  <SelectContent>
                    {locales.map((l) => (
                      <SelectItem key={l} value={l}>
                        {localeNames[l as Locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} disabled={isLoading}>
                {isLoading ? "Saving..." : t("common.save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="animations">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.animations")}</CardTitle>
              <CardDescription>{t("settings.preferences")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.animationsEnabled")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable animations throughout the application.
                  </p>
                </div>
                <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
              </div>

              {animationsEnabled && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label>{t("settings.animationQuality")}</Label>
                    <Select value={animationQuality} onValueChange={setAnimationQuality} disabled={!animationsEnabled}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("settings.animationQuality")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t("settings.low")}</SelectItem>
                        <SelectItem value="medium">{t("settings.medium")}</SelectItem>
                        <SelectItem value="high">{t("settings.high")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Higher quality animations may affect performance on some devices.
                    </p>
                  </div>

                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.reducedMotion")}</Label>
                      <p className="text-sm text-muted-foreground">Reduce motion for accessibility purposes.</p>
                    </div>
                    <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} disabled={!animationsEnabled} />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} disabled={isLoading}>
                {isLoading ? "Saving..." : t("common.save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
