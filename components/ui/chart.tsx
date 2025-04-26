"use client"

import * as React from "react"
import type { TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider")
  }

  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  // Create CSS variables for each color
  const cssVariables = Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[`--color-${key}`] = value.color
    return acc
  }, {})

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("", className)} style={cssVariables} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      [key: string]: any
    }
  }>
  label?: string
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length || !label) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <p className="text-sm font-medium">{label}</p>
        <div className="grid gap-1">
          {payload.map((item) => {
            const color = config[item.name]?.color
            const formattedValue = Intl.NumberFormat("en-US").format(item.value)

            return (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted-foreground">{config[item.name]?.label ?? item.name}</span>
                <span className="ml-auto text-xs font-medium">{formattedValue}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ChartTooltip(props: TooltipProps<any, any>) {
  return <ChartTooltipContent {...props} />
}
