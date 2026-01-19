"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  MessageCircleHeart,
  Star,
  Send,
} from "lucide-react"

export function Card_1(){
    return(
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <Card className="rounded-3xl shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircleHeart className="text-emerald-400" />
                  <p className="font-semibold">Bubbles</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-2xl bg-emerald-100/70 dark:bg-emerald-900/40 w-max shadow">
                    Hey — welcome to BubbleChat ✨
                  </div>
                  <div className="p-3 rounded-2xl bg-sky-100/70 dark:bg-sky-900/40 w-max ml-auto shadow">
                    Don't forget to login!
                  </div>
                </div>
              </CardContent>
            </Card>

            <Star className="absolute -top-6 -right-3 text-emerald-400 animate-bounce" />
            <Sparkles className="absolute bottom-6 -left-4 text-amber-400 animate-pulse" />
          </motion.div>
    )
}

export function Card_2(){
    return(
        <>
        {["Create Rooms", "Meet People", "Chat in Real-time"].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="rounded-3xl shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl">
                        <CardContent className="p-6">
                          <h3 className="font-bold text-xl mb-2">{label}</h3>
                          <p className="text-zinc-600 dark:text-zinc-400">
                            Cozy chatrooms for every type of discussions,click on features tab and get started.
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
        </>

    )
}