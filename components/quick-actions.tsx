"use client"

import { Stethoscope, Pill, Leaf, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const actions = [
  {
    icon: Stethoscope,
    label: "Diagnosticar planta",
    description: "Identifique problemas",
    href: "/diagnostico",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Pill,
    label: "Obter tratamento",
    description: "Soluções para pragas",
    href: "/biblioteca?tab=tratamentos",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Leaf,
    label: "Culturas",
    description: "Biblioteca de plantas",
    href: "/biblioteca",
    color: "bg-chart-3/20 text-chart-3",
  },
  {
    icon: AlertTriangle,
    label: "Alertas",
    description: "Avisos agrícolas",
    href: "/biblioteca?tab=alertas",
    color: "bg-destructive/10 text-destructive",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <Link key={action.href + action.label} href={action.href}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-start gap-2">
              <div className={`p-2 rounded-xl ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
