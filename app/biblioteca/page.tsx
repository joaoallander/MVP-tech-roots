"use client"

import { useState } from "react"
import { Search, Leaf, Bug, BookOpen, AlertTriangle, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const crops = [
  { name: "Tomate", icon: "🍅", diseases: 12, guides: 5 },
  { name: "Cenoura", icon: "🥕", diseases: 8, guides: 4 },
  { name: "Repolho", icon: "🥬", diseases: 10, guides: 3 },
  { name: "Alface", icon: "🥗", diseases: 6, guides: 4 },
  { name: "Batata", icon: "🥔", diseases: 15, guides: 6 },
  { name: "Milho", icon: "🌽", diseases: 9, guides: 5 },
  { name: "Feijão", icon: "🫘", diseases: 11, guides: 4 },
  { name: "Soja", icon: "🌱", diseases: 14, guides: 7 },
]

const pests = [
  { name: "Pulgões", type: "Inseto", affectedCrops: ["Tomate", "Repolho", "Alface"] },
  { name: "Lagarta-da-couve", type: "Inseto", affectedCrops: ["Repolho", "Couve"] },
  { name: "Mosca-branca", type: "Inseto", affectedCrops: ["Tomate", "Feijão"] },
  { name: "Oídio", type: "Fungo", affectedCrops: ["Abobrinha", "Pepino", "Melão"] },
  { name: "Ferrugem", type: "Fungo", affectedCrops: ["Soja", "Feijão", "Café"] },
  { name: "Murcha-bacteriana", type: "Bactéria", affectedCrops: ["Tomate", "Batata"] },
]

const tips = [
  {
    title: "Rotação de culturas",
    description: "Alterne as culturas plantadas para prevenir o esgotamento do solo e reduzir pragas.",
    category: "Manejo",
  },
  {
    title: "Irrigação eficiente",
    description: "Regue as plantas no início da manhã para reduzir a evaporação e doenças fúngicas.",
    category: "Irrigação",
  },
  {
    title: "Compostagem caseira",
    description: "Transforme restos orgânicos em adubo rico em nutrientes para suas plantas.",
    category: "Fertilização",
  },
  {
    title: "Controle biológico",
    description: "Use predadores naturais como joaninhas para controlar pragas sem químicos.",
    category: "Pragas",
  },
]

const alerts = [
  {
    title: "Alerta de Ferrugem Asiática",
    description: "Risco elevado nas regiões Sul e Centro-Oeste. Monitore lavouras de soja.",
    severity: "high",
    date: "05/04/2026",
  },
  {
    title: "Condições favoráveis para Oídio",
    description: "Umidade alta e temperaturas amenas favorecem a proliferação do fungo.",
    severity: "medium",
    date: "04/04/2026",
  },
  {
    title: "Início da safra de inverno",
    description: "Período ideal para plantio de hortaliças de clima temperado.",
    severity: "low",
    date: "01/04/2026",
  },
]

const severityColors = {
  low: "bg-primary/10 text-primary",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-destructive/10 text-destructive",
}

export default function BibliotecaPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="font-bold text-lg text-foreground mb-3">Biblioteca</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar culturas, pragas, dicas..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <Tabs defaultValue="culturas" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="culturas" className="text-xs">
              <Leaf className="h-3 w-3 mr-1" />
              Culturas
            </TabsTrigger>
            <TabsTrigger value="pragas" className="text-xs">
              <Bug className="h-3 w-3 mr-1" />
              Pragas
            </TabsTrigger>
            <TabsTrigger value="dicas" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              Dicas
            </TabsTrigger>
            <TabsTrigger value="alertas" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Alertas
            </TabsTrigger>
          </TabsList>

          {/* Culturas Tab */}
          <TabsContent value="culturas" className="space-y-3">
            {crops
              .filter((crop) =>
                crop.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((crop) => (
                <Card key={crop.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-3xl">{crop.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{crop.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {crop.diseases} doenças • {crop.guides} guias
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* Pragas Tab */}
          <TabsContent value="pragas" className="space-y-3">
            {pests
              .filter((pest) =>
                pest.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((pest) => (
                <Card key={pest.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{pest.name}</p>
                        <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                          {pest.type}
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Afeta: {pest.affectedCrops.join(", ")}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* Dicas Tab */}
          <TabsContent value="dicas" className="space-y-3">
            {tips
              .filter((tip) =>
                tip.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((tip) => (
                <Card key={tip.title} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-foreground">{tip.title}</p>
                      <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          {/* Alertas Tab */}
          <TabsContent value="alertas" className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.title} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            severityColors[alert.severity as keyof typeof severityColors]
                          }`}
                        >
                          {alert.severity === "high"
                            ? "Urgente"
                            : alert.severity === "medium"
                            ? "Atenção"
                            : "Info"}
                        </span>
                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                      </div>
                      <p className="font-semibold text-foreground">{alert.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}
