import { BottomNavigation } from "@/components/bottom-navigation"
import { WeatherCard } from "@/components/weather-card"
import { CameraButton } from "@/components/camera-button"
import { QuickActions } from "@/components/quick-actions"
import { Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Tech Roots</span>
          </div>
          <p className="text-sm text-muted-foreground">Olá, Agricultor!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Weather Card */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Clima atual</h2>
          <WeatherCard />
        </section>

        {/* Camera Button */}
        <section>
          <CameraButton />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Ações rápidas</h2>
          <QuickActions />
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Atividade recente</h2>
          <div className="space-y-3">
            <RecentActivityCard
              title="Diagnóstico de Tomate"
              description="Deficiência de nitrogênio detectada"
              time="Há 2 horas"
            />
            <RecentActivityCard
              title="Tratamento aplicado"
              description="Pulverização de fungicida"
              time="Ontem"
            />
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  )
}

function RecentActivityCard({
  title,
  description,
  time,
}: {
  title: string
  description: string
  time: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
        <Leaf className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  )
}
