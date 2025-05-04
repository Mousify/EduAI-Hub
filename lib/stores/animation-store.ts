import { create } from "zustand"
import { persist } from "zustand/middleware"

type AnimationState = {
  enabled: boolean
  quality: "low" | "medium" | "high"
  reducedMotion: boolean
  setEnabled: (enabled: boolean) => void
  setQuality: (quality: "low" | "medium" | "high") => void
  setReducedMotion: (reducedMotion: boolean) => void
}

export const useAnimationStore = create<AnimationState>()(
  persist(
    (set) => ({
      enabled: true,
      quality: "medium",
      reducedMotion: false,
      setEnabled: (enabled) => set({ enabled }),
      setQuality: (quality) => set({ quality }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
    }),
    {
      name: "animation-settings",
    },
  ),
)
