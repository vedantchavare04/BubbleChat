"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import ModeToggle from "@/components/core_ui/mode_toggle"
import Loader from "@/components/core_ui/loader_specific"

type Message = {
  id: number
  text: string
  mine?: boolean
}

export default function RoomPage() {
  const { roomsId } = useParams<{ roomsId: string }>()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to BubbleChat!!" },
    { id: 2, text: "Chat peacefully and in cooperation!!!!" },
  ])

  if (!roomsId) {
  return (
    <Loader />
  )
}


  function sendMessage() {
    if (!message.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, mine: true },
    ])
    setMessage("")
  }

  return (
    <div className="relative min-h-screen bg-background">

    {/* background layout */}

    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(120,120,120,0.06) 1px,transparent 1px),linear-gradient( to bottom, rgba(120,120,120,0.06) 1px, transparent 1px ) `,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute -top-64 -left-64 h-[36rem] w-[36rem] rounded-full bg-emerald-400/12 blur-[160px]" />
      <div className="absolute -bottom-64 -right-64 h-[36rem] w-[36rem] rounded-full bg-sky-400/12 blur-[160px]" />
    </div>

      {/* top navbar  */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-background/60 border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold capitalize">
              {roomsId.replace(/-/g, " ")}
            </h1>
            <p className="text-xs text-muted-foreground">
              Cozy chatroom · BubbleChat
            </p>
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* chat layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-2 sm:px-6 py-4 sm:py-6">
        <div
          className={cn( "relative rounded-2xl sm:rounded-3xl", "bg-card/70 backdrop-blur-xl border shadow-xl", "flex flex-col", "h-[calc(100vh-7rem)] sm:h-[calc(100vh-8rem)]"
          )} >

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 text-sm sm:text-[15px] leading-relaxed",
                  msg.mine
                    ? "ml-auto bg-emerald-500/90 text-white shadow"
                    : "bg-muted/80 text-foreground shadow-sm"
                )}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          {/* input by user */}
          <div className="border-t bg-card/80 backdrop-blur-md px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2">
              <Input value={message}  onChange={(e) => setMessage(e.target.value)}  placeholder="Type something calm…" onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="rounded-xl h-10 sm:h-11" />
              <Button onClick={sendMessage} size="icon" className="rounded-xl h-10 w-10 sm:h-11 sm:w-11" >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
