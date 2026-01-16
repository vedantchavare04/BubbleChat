"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ModeToggle from "@/components/core_ui/mode_toggle";
import Loader from "@/components/core_ui/loader_specific";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";

type Message = {
  id: string;
  text: string;
  user: string;
  mine: boolean;
  timestamp: string;
};

export default function RoomPage() {
  const { roomsId } = useParams<{ roomsId: string }>();
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const clientId = useRef<string>(crypto.randomUUID());

  const username =
    session?.user?.name ??
    session?.user?.email ??
    "Anonymous";

  useEffect(() => {
    if (!roomsId) return;

    const ws = new WebSocket("ws://localhost:5173");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: roomsId, clientId: clientId.current },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "user_count") {
        setOnlineCount(data.payload.count);
        return;
      }

      const payload = data.payload;

      if (payload.clientId === clientId.current) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: payload.message,
          user: payload.user || "Anonymous",
          mine: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    return () => {
      ws.close();
    };
  }, [roomsId]);

  if (!roomsId) return <Loader />;

  function sendMessage() {
    if (!message.trim()) return;

    const payload = {
      type: "chat",
      payload: {
        roomId: roomsId,
        message,
        user: username,
        clientId: clientId.current,
      },
    };

    wsRef.current?.send(JSON.stringify(payload));

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: message,
        user: "You",
        mine: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  }

  return (
    <div className="relative min-h-screen bg-background">

      {/* background layout */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900" />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(120,120,120,0.06) 1px,transparent 1px),
                              linear-gradient(to bottom, rgba(120,120,120,0.06) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute -top-64 -left-64 h-[36rem] w-[36rem] rounded-full bg-emerald-400/12 blur-[160px]" />
        <div className="absolute -bottom-64 -right-64 h-[36rem] w-[36rem] rounded-full bg-sky-400/12 blur-[160px]" />
      </div>

      {/* header */}
      <div className="top-0 z-20 backdrop-blur-md bg-background/60 border-b relative">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold capitalize">
              {roomsId.replace(/-/g, " ")}
            </h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users size={14} />
              {onlineCount} online
            </div>
          </div>
          <ModeToggle />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-2 py-6">
        <div
          className={cn(
            "relative rounded-3xl bg-card/70 backdrop-blur-xl border shadow-xl",
            "flex flex-col h-[calc(100vh-8rem)]"
          )}
        >

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  "flex",
                  msg.mine ? "justify-end" : "justify-start"
                )}
              >
                <Card
                  className={cn(
                    "max-w-[70%] rounded-2xl border shadow-sm",
                    msg.mine
                      ? "bg-emerald-400 text-white border-emerald-400 rounded-br-md"
                      : "bg-card/80 backdrop-blur border-border rounded-bl-md"
                  )}>
                  <CardContent className="px-4 py-3.5 space-y-1">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span
                        className={cn(
                          "font-medium",
                          msg.mine
                            ? "text-white/90"
                            : "text-muted-foreground"
                        )}>
                        {msg.user}
                      </span>

                      <span
                        className={cn(
                          "text-[10px]",
                          msg.mine
                            ? "text-white/70"
                            : "text-muted-foreground/70"
                        )}>
                        {msg.timestamp}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        msg.mine ? "text-white" : "text-foreground"
                      )}>
                      {msg.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* input */}
          <div className="border-t px-6 py-4 flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type something calm…"
            />
            <Button onClick={sendMessage} size="icon">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
