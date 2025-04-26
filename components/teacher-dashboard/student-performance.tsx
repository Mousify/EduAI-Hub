"use client"

const performanceData = [
  {
    name: "Algebra Quiz - Grade 9",
    average: 82,
  },
  {
    name: "Chemistry Lab - Grade 10",
    average: 76,
  },
  {
    name: "History Essay - Grade 11",
    average: 88,
  },
  {
    name: "Physics Test - Grade 12",
    average: 79,
  },
]

export function StudentPerformance() {
  return (
    <div className="space-y-4">
      {performanceData.map((item) => (
        <div key={item.name}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">{item.name}</div>
            <div className="text-sm text-muted-foreground">Avg: {item.average}%</div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${item.average}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}
