"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageCircle } from "lucide-react"
import Navbar from "@/components/core_ui/navbar"

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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-neutral-50 dark:bg-neutral-900">
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* soft depth blobs (static) */}
        <div className="absolute top-[-120px] left-[-120px] h-80 w-80 rounded-full bg-emerald-200/15 dark:bg-emerald-900/15 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-80 w-80 rounded-full bg-sky-200/15 dark:bg-sky-900/15 blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-24 sm:pt-28 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Chatrooms
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Discover calm, welcoming spaces and join conversations that feel right.
            </p>
          </header>

          {/* Rooms Grid */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHAT_ROOMS.map((room) => (
              <Card
                key={room.id}
                className="
                  group
                  rounded-3xl
                  bg-white/85 dark:bg-neutral-800/85
                  border border-zinc-200 dark:border-neutral-700
                  backdrop-blur
                  transition-shadow
                  hover:shadow-xl
                "
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-lg font-semibold leading-tight">
                      {room.name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                      <Users size={16} />
                      <span>{room.members} online</span>
                    </div>

                    <Button
                      size="sm"
                      className="rounded-xl px-4"
                    >
                      Join Room
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
