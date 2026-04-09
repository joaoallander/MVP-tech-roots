"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Image as ImageIcon, Filter, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  image?: string
  crop: string
  likes: number
  comments: number
  timeAgo: string
  isLiked: boolean
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Maria Silva",
      avatar: "",
      initials: "MS",
    },
    content:
      "Alguém sabe o que pode estar causando essas manchas amarelas nas folhas do meu tomateiro? Comecei a notar há uma semana e está piorando.",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop",
    crop: "Tomate",
    likes: 24,
    comments: 8,
    timeAgo: "2h",
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "João Santos",
      avatar: "",
      initials: "JS",
    },
    content:
      "Dica: Para quem está tendo problemas com pulgões no repolho, a solução de água com sabão de coco funciona muito bem! Apliquem pela manhã.",
    crop: "Repolho",
    likes: 56,
    comments: 12,
    timeAgo: "5h",
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: "Ana Oliveira",
      avatar: "",
      initials: "AO",
    },
    content:
      "Colheita do dia! Super feliz com o resultado das minhas cenouras. Plantei há 4 meses seguindo as dicas do app.",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop",
    crop: "Cenoura",
    likes: 89,
    comments: 15,
    timeAgo: "8h",
    isLiked: false,
  },
  {
    id: 4,
    author: {
      name: "Pedro Costa",
      avatar: "",
      initials: "PC",
    },
    content:
      "Preciso de ajuda! Minhas plantas de feijão estão com as folhas enrolando para cima. Será falta de água ou alguma doença?",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    crop: "Feijão",
    likes: 12,
    comments: 6,
    timeAgo: "1d",
    isLiked: false,
  },
]

const cropFilters = ["Todos", "Tomate", "Repolho", "Cenoura", "Feijão", "Milho", "Soja"]

export default function ComunidadePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [filter, setFilter] = useState("Todos")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCrop, setNewPostCrop] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      })
    )
  }

  const handleNewPost = () => {
    if (!newPostContent.trim() || !newPostCrop) return

    const newPost: Post = {
      id: Date.now(),
      author: {
        name: "Você",
        avatar: "",
        initials: "VC",
      },
      content: newPostContent,
      crop: newPostCrop,
      likes: 0,
      comments: 0,
      timeAgo: "agora",
      isLiked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setNewPostCrop("")
    setIsDialogOpen(false)
  }

  const filteredPosts =
    filter === "Todos" ? posts : posts.filter((post) => post.crop === filter)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-lg text-foreground">Comunidade</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Postar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[calc(100%-2rem)] rounded-xl">
                <DialogHeader>
                  <DialogTitle>Nova Publicação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Textarea
                    placeholder="Compartilhe sua dúvida ou experiência..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <Select value={newPostCrop} onValueChange={setNewPostCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cultura" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropFilters.slice(1).map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Foto
                    </Button>
                    <Button className="flex-1" onClick={handleNewPost}>
                      Publicar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {cropFilters.map((crop) => (
              <Button
                key={crop}
                variant={filter === crop ? "default" : "outline"}
                size="sm"
                className="shrink-0 rounded-full text-xs h-8"
                onClick={() => setFilter(crop)}
              >
                {crop}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma publicação encontrada para este filtro.
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      {post.author.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs h-5">
                        {post.crop}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                {post.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Imagem do post"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 border-t border-border">
                <div className="flex items-center gap-4 w-full pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${post.isLiked ? "text-destructive" : "text-muted-foreground"}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`}
                    />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground ml-auto"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}
