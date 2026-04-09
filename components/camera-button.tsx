"use client"

import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CameraButton() {
  return (
    <Link href="/diagnostico">
      <Button
        size="lg"
        className="w-full h-16 text-lg font-semibold gap-3 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
      >
        <Camera className="h-6 w-6" />
        Tirar uma foto
      </Button>
    </Link>
  )
}
