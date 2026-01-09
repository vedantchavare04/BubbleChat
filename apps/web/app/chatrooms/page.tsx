"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageCircle } from "lucide-react"

const CHAT_ROOMS = [
  {
    id: "general",
    name: "General Lounge",
    description: "Casual conversations, chill vibes, and friendly chats.",
    members: 124,
  },
  {
    id: "tech",
    name: "Tech Talk",
    description: "Discuss programming, tools, and tech ideas.",
    members: 86,
  },
  {
    id: "design",
    name: "Design & UI",
    description: "UI/UX, inspiration, feedback, and creativity.",
    members: 54,
  },
  {
    id: "music",
    name: "Music Corner",
    description: "Share songs, playlists, and music opinions.",
    members: 42,
  },
  {
    id: "gaming",
    name: "Gaming Hub",
    description: "Games, updates, and casual gamer chats.",
    members: 73,
  },
  {
    id: "study",
    name: "Study Room",
    description: "Focus sessions, productivity, and quiet support.",
    members: 31,
  },
]

export default function ChatRoomsPage() {
  return (
    <div className="min-h-screen w-full px-4 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Chatrooms
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl">
            Explore cozy spaces and join conversations that match your mood.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHAT_ROOMS.map((room) => (
            <Card
              key={room.id}
              className="
                rounded-3xl
                bg-neutral-100/70 dark:bg-neutral-800/70
                border border-zinc-200 dark:border-neutral-700
                backdrop-blur
                hover:shadow-lg
                transition
              "
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Title */}
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-lg font-semibold">
                    {room.name}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {room.description}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-zinc-500">
                    <Users size={16} />
                    {room.members} online
                  </div>

                  <Button
                    size="sm"
                    className="rounded-xl"
                  >
                    Join Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
