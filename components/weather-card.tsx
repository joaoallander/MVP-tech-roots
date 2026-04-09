"use client"

import { Cloud, Droplets, Wind, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  sprayCondition: "ideal" | "caution" | "avoid"
}

const mockWeather: WeatherData = {
  temperature: 24,
  condition: "Parcialmente nublado (Ubajara)",
  humidity: 65,
  windSpeed: 12,
  sprayCondition: "ideal",
}

const sprayConditionLabels = {
  ideal: { label: "Ideal para pulverização", color: "text-primary bg-primary/10" },
  caution: { label: "Atenção ao pulverizar", color: "text-yellow-600 bg-yellow-50" },
  avoid: { label: "Evite pulverizar", color: "text-destructive bg-destructive/10" },
}

export function WeatherCard() {
  const weather = mockWeather
  const sprayInfo = sprayConditionLabels[weather.sprayCondition]

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-card rounded-full">
              <Sun className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{weather.temperature}°C</p>
              <p className="text-sm text-muted-foreground">{weather.condition}</p>
            </div>
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${sprayInfo.color}`}>
            {sprayInfo.label}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Droplets className="h-4 w-4" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wind className="h-4 w-4" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
