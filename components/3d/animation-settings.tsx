"use client"

import { useAnimationStore } from "@/lib/stores/animation-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AnimationSettings() {
  const { enabled, quality, reducedMotion, setEnabled, setQuality, setReducedMotion } = useAnimationStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Animation Settings</CardTitle>
        <CardDescription>Configure how 3D animations appear throughout the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="enable-animations">Enable 3D animations</Label>
          <Switch id="enable-animations" checked={enabled} onCheckedChange={setEnabled} />
        </div>

        {enabled && (
          <>
            <div className="space-y-3">
              <Label>Animation quality</Label>
              <RadioGroup
                value={quality}
                onValueChange={(value) => setQuality(value as "low" | "medium" | "high")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="quality-low" />
                  <Label htmlFor="quality-low">Low (better performance)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="quality-medium" />
                  <Label htmlFor="quality-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="quality-high" />
                  <Label htmlFor="quality-high">High (better visuals)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion">Reduced motion</Label>
              <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
