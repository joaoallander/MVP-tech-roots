"use client"

import { useState } from "react"
import {
  Settings,
  LogOut,
  Leaf,
  History,
  Award,
  ChevronRight,
  Bell,
  Moon,
  HelpCircle,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

const userStats = {
  diagnostics: 24,
  plants: 8,
  communityPosts: 12,
  level: 3,
  levelProgress: 65,
  levelTitle: "Agricultor Experiente",
}

const recentDiagnostics = [
  { plant: "Tomate", issue: "Deficiência de Nitrogênio", date: "05/04/2026" },
  { plant: "Repolho", issue: "Pulgões", date: "03/04/2026" },
  { plant: "Cenoura", issue: "Murcha Bacteriana", date: "01/04/2026" },
]

const userPlants = [
  { name: "Tomate Cereja", status: "saudável", lastCheck: "Hoje" },
  { name: "Alface Americana", status: "atenção", lastCheck: "Há 3 dias" },
  { name: "Pimentão Verde", status: "saudável", lastCheck: "Ontem" },
]

const statusColors = {
  saudável: "bg-primary text-primary-foreground",
  atenção: "bg-yellow-500 text-white",
  problema: "bg-destructive text-destructive-foreground",
}

export default function PerfilPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-bold text-lg">Meu Perfil</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary-foreground/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl">
                AG
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Agricultor</h2>
              <p className="text-primary-foreground/80 text-sm">
                agricultor@email.com
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Award className="h-4 w-4" />
                <span className="text-sm">{userStats.levelTitle}</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6 bg-primary-foreground/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Nível {userStats.level}</span>
              <span className="text-xs text-primary-foreground/80">
                {userStats.levelProgress}%
              </span>
            </div>
            <Progress
              value={userStats.levelProgress}
              className="h-2 bg-primary-foreground/20"
            />
            <p className="text-xs text-primary-foreground/60 mt-2">
              Faça mais diagnósticos para subir de nível!
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-primary">{userStats.diagnostics}</p>
              <p className="text-xs text-muted-foreground">Diagnósticos</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-primary">{userStats.plants}</p>
              <p className="text-xs text-muted-foreground">Plantas</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-primary">{userStats.communityPosts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </CardContent>
          </Card>
        </div>

        {/* My Plants */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                Minhas Plantas
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs">
                Ver todas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {userPlants.map((plant) => (
              <div
                key={plant.name}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{plant.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Verificado: {plant.lastCheck}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusColors[plant.status as keyof typeof statusColors]
                  }`}
                >
                  {plant.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Diagnostics */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Histórico de Diagnósticos
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs">
                Ver todos
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDiagnostics.map((diagnostic, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {diagnostic.plant}
                  </p>
                  <p className="text-xs text-muted-foreground">{diagnostic.issue}</p>
                </div>
                <span className="text-xs text-muted-foreground">{diagnostic.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Notificações</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Modo escuro</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <MenuItem icon={Shield} label="Privacidade" />
            <MenuItem icon={HelpCircle} label="Ajuda e Suporte" />
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/20 hover:bg-destructive/5">
          <LogOut className="h-4 w-4" />
          Sair da conta
        </Button>
      </main>

      <BottomNavigation />
    </div>
  )
}

function MenuItem({ icon: Icon, label }: { icon: typeof Settings; label: string }) {
  return (
    <button className="flex items-center justify-between w-full py-2">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  )
}
