"use client"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BookOpen, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface PracticeModeToggleProps {
  onChange?: (mode: "test" | "learning") => void
}

export function PracticeModeToggle({ onChange }: PracticeModeToggleProps) {
  const [mode, setMode] = useLocalStorage<"test" | "learning">("practice-mode", "learning")

  const handleToggle = (checked: boolean) => {
    const newMode = checked ? "learning" : "test"
    setMode(newMode)
    if (onChange) {
      onChange(newMode)
    }
  }

  return (
    <div className="flex items-center space-x-6 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: mode === "test" ? 1.1 : 1,
            opacity: mode === "test" ? 1 : 0.7,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <GraduationCap className={`h-5 w-5 ${mode === "test" ? "text-primary" : "text-muted-foreground"}`} />
        </motion.div>
        <Label htmlFor="practice-mode" className={mode === "test" ? "font-medium" : "text-muted-foreground"}>
          Testavimo režimas
        </Label>
      </div>

      <Switch id="practice-mode" checked={mode === "learning"} onCheckedChange={handleToggle} />

      <div className="flex items-center space-x-2">
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: mode === "learning" ? 1.1 : 1,
            opacity: mode === "learning" ? 1 : 0.7,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <BookOpen className={`h-5 w-5 ${mode === "learning" ? "text-primary" : "text-muted-foreground"}`} />
        </motion.div>
        <Label htmlFor="practice-mode" className={mode === "learning" ? "font-medium" : "text-muted-foreground"}>
          Mokymosi režimas
        </Label>
      </div>
    </div>
  )
}
