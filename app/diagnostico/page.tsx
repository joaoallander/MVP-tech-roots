"use client"

import { useState, useRef } from "react"
import { Camera, Upload, ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNavigation } from "@/components/bottom-navigation"
import Link from "next/link"
import Image from "next/image"

interface DiagnosisResult {
  problem: string
  confidence: number
  description: string
  treatment: string
  severity: "low" | "medium" | "high"
}

const mockResults: DiagnosisResult[] = [
  {
    problem: "Deficiência de Nitrogênio",
    confidence: 92,
    description: "As folhas amareladas na base da planta indicam falta de nitrogênio, um nutriente essencial para o crescimento.",
    treatment: "Aplique fertilizante rico em nitrogênio (NPK 20-10-10) ou ureia na dosagem de 30g por m².",
    severity: "medium",
  },
  {
    problem: "Deficiência de Potássio",
    confidence: 67,
    description: "Bordas das folhas queimadas e amareladas podem indicar falta de potássio.",
    treatment: "Utilize cloreto de potássio ou sulfato de potássio. Dose recomendada: 20g por m².",
    severity: "low",
  },
  {
    problem: "Deficiência de Ferro",
    confidence: 45,
    description: "Clorose internerval (amarelamento entre as nervuras) pode ser sinal de deficiência de ferro.",
    treatment: "Aplique quelato de ferro foliar ou sulfato de ferro ao solo.",
    severity: "low",
  },
]

const severityColors = {
  low: "bg-chart-3/20 text-chart-3",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-destructive/10 text-destructive",
}

const severityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
}

export default function DiagnosticoPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<DiagnosisResult[] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    setResults(null)
    // Simulate AI analysis
    setTimeout(() => {
      setResults(mockResults)
      setIsAnalyzing(false)
    }, 2500)
  }

  const resetDiagnosis = () => {
    setImage(null)
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-lg text-foreground">Diagnóstico de Planta</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {!image ? (
          /* Upload Section */
          <section className="space-y-4">
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="p-8 flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Camera className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Tire ou envie uma foto</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fotografe a folha ou parte afetada da planta
                  </p>
                </div>
                <div className="flex gap-3 w-full">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                    Câmera
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Galeria
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">Dicas para uma boa foto</h3>
              <div className="space-y-2">
                <TipItem text="Fotografe em boa iluminação, preferencialmente luz natural" />
                <TipItem text="Focalize na área afetada da planta" />
                <TipItem text="Inclua folhas saudáveis para comparação" />
                <TipItem text="Evite sombras fortes sobre a planta" />
              </div>
            </div>
          </section>
        ) : (
          /* Results Section */
          <section className="space-y-6">
            {/* Image Preview */}
            <Card>
              <CardContent className="p-3">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt="Planta analisada"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-muted-foreground"
                  onClick={resetDiagnosis}
                >
                  Tirar outra foto
                </Button>
              </CardContent>
            </Card>

            {isAnalyzing ? (
              /* Loading State */
              <Card>
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Analisando imagem...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nossa IA está identificando possíveis problemas
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : results ? (
              /* Diagnosis Results */
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Resultados do Diagnóstico</h2>
                </div>

                {results.map((result, index) => (
                  <Card key={index} className={index === 0 ? "ring-2 ring-primary" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{result.problem}</CardTitle>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${severityColors[result.severity]}`}>
                            {severityLabels[result.severity]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-primary">
                          {result.confidence}%
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-xs font-medium text-primary mb-1">Tratamento sugerido:</p>
                        <p className="text-sm text-foreground">{result.treatment}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/biblioteca?tab=tratamentos">Ver mais tratamentos</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/comunidade">Perguntar na comunidade</Link>
                  </Button>
                </div>
              </div>
            ) : null}
          </section>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
