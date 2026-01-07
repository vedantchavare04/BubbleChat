"use client"

import "./globals.css"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Sparkles, MessageCircleHeart, Star, Send, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

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


function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
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

export default function ChitpiLandingPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-800 overflow-hidden">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-sky-500">
              BubbleChat
            </span>
          </h1>

          {/* DESKTOP MENU */}
          <div
            className="hidden sm:flex gap-3 items-center p-1.5 
            bg-white dark:bg-neutral-900 
            drop-shadow-md rounded-2xl 
            border border-dashed 
            border-gray-400 dark:border-neutral-700"
          >
            <ModeToggle />

            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Community</Button>

            {/* LOGIN WITH DIALOG */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-2xl">Login</Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Welcome back to BubbleChat ✨
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>

                <DialogFooter>
                  <Button className="w-full rounded-2xl">Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden rounded-xl border p-2 border-zinc-300 dark:border-zinc-700"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden border-t border-white/30 dark:border-zinc-800/50"
            >
              <div className="px-4 pb-4 pt-2 flex flex-col gap-2">
                <ModeToggle />
                <Button variant="ghost" className="w-full">Features</Button>
                <Button variant="ghost" className="w-full">Community</Button>

                {/* MOBILE LOGIN */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="rounded-2xl w-full">Login</Button>
                  </DialogTrigger>

                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Login</DialogTitle>
                      <DialogDescription>
                        Sign in to continue 🚀
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="you@example.com" />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Password</label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button className="w-full rounded-2xl">Login</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* BACKGROUND BLOBS */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute w-40 h-40 sm:w-72 sm:h-72 bg-emerald-200/40 blur-3xl rounded-full -top-6 -left-6 animate-pulse" />
        <div className="absolute w-48 h-48 sm:w-96 sm:h-96 bg-sky-200/40 blur-3xl rounded-full bottom-0 right-0 animate-pulse" />
        <div className="absolute w-40 h-40 sm:w-80 sm:h-80 bg-amber-200/40 blur-3xl rounded-full top-1/3 left-1/3 animate-pulse" />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:py-20 pt-24">

        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT HERO TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
              Soft Pastel
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500">
                Chat Rooms
              </span>
              <br />for Everyone
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto md:mx-0">
              Chill, cozy, gender-neutral pastel vibes
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="rounded-2xl w-full sm:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Get Started with BubbleChat
              </Button>

              <Button variant="outline" size="lg" className="rounded-2xl w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4" />
                Live Preview
              </Button>
            </div>
          </div>

          {/* HERO MOCK CHAT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <Card className="rounded-3xl shadow-2xl bg-white/80 dark:bg-slate-800 backdrop-blur-xl">
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
                    Let’s keep it chill 🌿
                  </div>
                </div>
              </CardContent>
            </Card>

            <Star className="absolute -top-6 -right-3 text-emerald-400 animate-bounce" />
            <Sparkles className="absolute bottom-6 -left-4 text-amber-400 animate-pulse" />
          </motion.div>
        </section>

        {/* ⭐⭐⭐ MIDDLE FEATURE CARDS (RESTORED) ⭐⭐⭐ */}
        <section className="mt-16 sm:mt-24 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {["Create Rooms", "Meet People", "Chat in Real-time"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="rounded-3xl shadow-xl bg-white/80 dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{label}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Soft pastel UI designed to feel warm, calm, and welcoming to everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>
      </main>

      {/* DETAILS SECTION BELOW */}
      <Details />

      <footer className="text-center py-8 text-sm text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} BubbleChat — pastel vibes, open to all
      </footer>
    </div>
  )
}
