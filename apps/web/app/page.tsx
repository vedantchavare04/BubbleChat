"use client"
import { Separator } from "@/components/ui/separator"
import "./globals.css"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Sparkles, MessageCircleHeart, Star, Send, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { signIn } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Details from "./details"
import MarqueeDemo from "./mover"
import Footer from "./animated_footer"

/* layout background */
function BackgroundLayout() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(167,243,208,0.35),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(125,211,252,0.35),transparent_40%),radial-gradient(ellipse_at_top_right,rgba(253,230,138,0.35),transparent_40%)]" />

      <div className="absolute inset-0 blur-3xl opacity-80">
        <div className="absolute w-[55vw] h-[30vh] -top-10 left-5 bg-emerald-200/40 rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute w-[65vw] h-[32vh] top-1/3 -right-5 bg-sky-200/40 rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute w-[60vw] h-[35vh] bottom-0 left-1/4 bg-amber-200/40 rounded-full mix-blend-screen animate-pulse" />
      </div>

      <div className="absolute inset-0 opacity-40 dark:opacity-20 [mask-image:radial-gradient(circle_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d41a_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d41a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}

/* mode toggle */
function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* main page */
export default function ChitpiLandingPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen w-full">

      <BackgroundLayout />

      {/* navbar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-200/80 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 shadow-sm">
              <MessageCircleHeart className="h-5 w-5 text-emerald-700 dark:text-emerald-300"/>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              Bubble<span className="text-emerald-600 dark:text-emerald-400">Chat</span>
            </h1>
          </div>

          {/* desktop menu */}
          <div className="hidden sm:flex gap-3 items-center p-1.5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl border border-dashed border-gray-400 dark:border-neutral-700">
            <ModeToggle />
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Community</Button>

            {/* 🔐 MODIFIED LOGIN / SIGNUP */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="rounded-2xl"
                  onClick={() => signIn("google")}
                >
                  Login / Signup
                </Button>
              </DialogTrigger>

              <DialogContent className="hidden" />
            </Dialog>
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden rounded-xl border p-2 border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-black/40 backdrop-blur"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* rest of page untouched */}
      <Details />
      <MarqueeDemo />
      <Footer />
    </div>
  )
}
