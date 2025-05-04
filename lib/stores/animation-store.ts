import { create } from "zustand"
import { persist } from "zustand/middleware"

type AnimationState = {
  enabled: boolean
  reducedMotion: boolean
  setEnabled: (enabled: boolean) => void
  setReducedMotion: (reducedMotion: boolean) => void
  toggleEnabled: () => void
  toggleReducedMotion: () => void
}

export const useAnimationStore = create<AnimationState>()(
  persist(
    (set) => ({
      // Disable animations by default to avoid WebGL errors
      enabled: false,
      reducedMotion: true,
      setEnabled: (enabled) => set({ enabled }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
    }),
    {
      name: "animation-settings",
    },
  ),
)
