"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageCircle } from "lucide-react";
import Navbar from "@/components/core_ui/navbar";
import { useRouter } from "next/navigation";

const CHAT_ROOMS = [
  { id: "general", name: "General Lounge", description: "Casual conversations, chill vibes, and friendly chats." },
  { id: "tech", name: "Tech Talk", description: "Discuss programming, tools, and tech ideas." },
  { id: "design", name: "Design & UI", description: "UI/UX, inspiration, feedback, and creativity." },
  { id: "music", name: "Music Corner", description: "Share songs, playlists, and music opinions." },
  { id: "gaming", name: "Gaming Hub", description: "Games, updates, and casual gamer chats." },
  { id: "study", name: "Study Room", description: "Focus sessions, productivity, and quiet support." },
];

export default function ChatRoomsPage() {
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);

  // roomId -> live count
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "user_count") {
        setCounts((prev) => ({
          ...prev,
          [data.payload.roomId]: data.payload.count,
        }));
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-neutral-50 dark:bg-neutral-900">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-[-120px] left-[-120px] h-80 w-80 rounded-full bg-emerald-200/15 dark:bg-emerald-900/15 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-80 w-80 rounded-full bg-sky-200/15 dark:bg-sky-900/15 blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-24 sm:pt-28 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Chatrooms
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Discover calm, welcoming spaces and join conversations that feel right.
            </p>
          </header>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHAT_ROOMS.map((room) => {
              const online = counts[room.id] ?? 0;

              return (
                <Card
                  key={room.id}
                  className="group rounded-3xl bg-white/85 dark:bg-neutral-800/85 border border-zinc-200 dark:border-neutral-700 backdrop-blur transition-shadow hover:shadow-xl"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <h2 className="text-lg font-semibold leading-tight">
                        {room.name}
                      </h2>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                        <Users size={16} />
                        <span>{online} online</span>
                      </div>

                      <Button
                        size="sm"
                        className="rounded-xl px-4"
                        onClick={() => router.push(`/chatrooms/rooms/${room.id}`)}
                      >
                        Join Room
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
