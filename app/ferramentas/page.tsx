"use client"

import { useState } from "react"
import { Calculator, Droplets, Leaf, ArrowLeft, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomNavigation } from "@/components/bottom-navigation"

type Tool = "fertilizantes" | "dosagem" | "area" | null

const tools = [
  {
    id: "fertilizantes" as const,
    name: "Calculadora de Fertilizantes",
    description: "Calcule a quantidade ideal de NPK para sua cultura",
    icon: Leaf,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "dosagem" as const,
    name: "Calculadora de Dosagem",
    description: "Determine a dosagem correta de defensivos",
    icon: Droplets,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "area" as const,
    name: "Calculadora de Área",
    description: "Calcule a área do seu terreno ou canteiro",
    icon: Scale,
    color: "bg-chart-3/20 text-chart-3",
  },
]

export default function FerramentasPage() {
  const [selectedTool, setSelectedTool] = useState<Tool>(null)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          {selectedTool ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setSelectedTool(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="p-2 bg-primary/10 rounded-xl">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
          )}
          <h1 className="font-bold text-lg text-foreground">
            {selectedTool
              ? tools.find((t) => t.id === selectedTool)?.name
              : "Ferramentas Agrícolas"}
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {!selectedTool ? (
          /* Tool Selection */
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Selecione uma ferramenta para ajudar no manejo da sua lavoura
            </p>
            <div className="space-y-3">
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${tool.color}`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{tool.name}</p>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : selectedTool === "fertilizantes" ? (
          <FertilizerCalculator />
        ) : selectedTool === "dosagem" ? (
          <DosageCalculator />
        ) : selectedTool === "area" ? (
          <AreaCalculator />
        ) : null}
      </main>

      <BottomNavigation />
    </div>
  )
}

function FertilizerCalculator() {
  const [area, setArea] = useState("")
  const [crop, setCrop] = useState("")
  const [result, setResult] = useState<{ n: number; p: number; k: number } | null>(null)

  const calculate = () => {
    const areaNum = parseFloat(area)
    if (!areaNum || !crop) return

    // Mock calculation based on crop type
    const recommendations: Record<string, { n: number; p: number; k: number }> = {
      tomate: { n: 150, p: 100, k: 200 },
      milho: { n: 120, p: 80, k: 60 },
      soja: { n: 10, p: 90, k: 90 },
      feijao: { n: 40, p: 80, k: 60 },
    }

    const base = recommendations[crop] || { n: 100, p: 80, k: 80 }
    setResult({
      n: Math.round(base.n * areaNum),
      p: Math.round(base.p * areaNum),
      k: Math.round(base.k * areaNum),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados da Cultura</CardTitle>
          <CardDescription>
            Informe os dados para calcular a quantidade de fertilizante
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop">Cultura</Label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cultura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomate">Tomate</SelectItem>
                <SelectItem value="milho">Milho</SelectItem>
                <SelectItem value="soja">Soja</SelectItem>
                <SelectItem value="feijao">Feijão</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Área (hectares)</Label>
            <Input
              id="area"
              type="number"
              placeholder="Ex: 1.5"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={calculate}>
            Calcular
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-primary">Recomendação de NPK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">{result.n}</p>
                <p className="text-xs text-muted-foreground">kg de N</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">{result.p}</p>
                <p className="text-xs text-muted-foreground">kg de P</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">{result.k}</p>
                <p className="text-xs text-muted-foreground">kg de K</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              *Valores aproximados. Consulte um agrônomo para recomendações precisas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function DosageCalculator() {
  const [tankVolume, setTankVolume] = useState("")
  const [productDose, setProductDose] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const tank = parseFloat(tankVolume)
    const dose = parseFloat(productDose)
    if (!tank || !dose) return
    setResult(Math.round((tank * dose) / 100 * 100) / 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cálculo de Dosagem</CardTitle>
          <CardDescription>
            Calcule a quantidade de produto para seu tanque
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tank">Volume do Tanque (litros)</Label>
            <Input
              id="tank"
              type="number"
              placeholder="Ex: 2000"
              value={tankVolume}
              onChange={(e) => setTankVolume(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dose">Dose Recomendada (mL/100L)</Label>
            <Input
              id="dose"
              type="number"
              placeholder="Ex: 150"
              value={productDose}
              onChange={(e) => setProductDose(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={calculate}>
            Calcular
          </Button>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base text-accent">Quantidade Necessária</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-foreground">{result}</p>
            <p className="text-sm text-muted-foreground">mL de produto</p>
            <p className="text-xs text-muted-foreground mt-4">
              Para um tanque de {tankVolume}L com dose de {productDose}mL/100L
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AreaCalculator() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [result, setResult] = useState<{ m2: number; hectares: number } | null>(null)

  const calculate = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    if (!l || !w) return
    const m2 = l * w
    setResult({
      m2: Math.round(m2 * 100) / 100,
      hectares: Math.round((m2 / 10000) * 10000) / 10000,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cálculo de Área</CardTitle>
          <CardDescription>
            Informe as dimensões do terreno retangular
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="length">Comprimento (metros)</Label>
            <Input
              id="length"
              type="number"
              placeholder="Ex: 100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Largura (metros)</Label>
            <Input
              id="width"
              type="number"
              placeholder="Ex: 50"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={calculate}>
            Calcular
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-chart-3/10 border-chart-3/20">
          <CardHeader>
            <CardTitle className="text-base text-chart-3">Área Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">{result.m2.toLocaleString("pt-BR")}</p>
                <p className="text-xs text-muted-foreground">metros quadrados</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">{result.hectares}</p>
                <p className="text-xs text-muted-foreground">hectares</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
