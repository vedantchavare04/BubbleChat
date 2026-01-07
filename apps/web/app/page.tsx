"use client"
import { Separator } from "@/components/ui/separator"
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



/* layout background */
function BackgroundLayout() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">

      {/* mesh gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(167,243,208,0.35),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(125,211,252,0.35),transparent_40%),radial-gradient(ellipse_at_top_right,rgba(253,230,138,0.35),transparent_40%)]" />

      {/* soft aurora ribbons */}
      <div className="absolute inset-0 blur-3xl opacity-80">
        <div className="absolute w-[55vw] h-[30vh] -top-10 left-5 bg-emerald-200/40 rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute w-[65vw] h-[32vh] top-1/3 -right-5 bg-sky-200/40 rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute w-[60vw] h-[35vh] bottom-0 left-1/4 bg-amber-200/40 rounded-full mix-blend-screen animate-pulse" />
      </div>

      {/* dotted glass grid */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 [mask-image:radial-gradient(circle_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d41a_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d41a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* film grain texture */}
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

/* main page */
export default function ChitpiLandingPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen w-full overflow-hidden">

      {/* layout background */}
      <BackgroundLayout />

      {/* navbar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-sky-500">
              BubbleChat
            </span>
          </h1>

          {/*desktop menu */}
          <div
            className="hidden sm:flex gap-3 items-center p-1.5 
            bg-white/70 dark:bg-neutral-900/70
            backdrop-blur-xl
            drop-shadow-md rounded-2xl 
            border border-dashed 
            border-gray-400 dark:border-neutral-700"
          >
            <ModeToggle />
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Community</Button>

            {/* login or signup */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-2xl">Login/Signup</Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl backdrop-blur-2xl">
                <DialogHeader>
                  <DialogTitle>Login or Signup</DialogTitle>
                  <DialogDescription>
                    Welcome to BubbleChat
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

          {/* mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden rounded-xl border p-2 border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-black/40 backdrop-blur"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden border-t border-white/30 dark:border-zinc-800/50 bg-white/50 dark:bg-black/40 backdrop-blur-xl"
            >
              <div className="px-4 pb-4 pt-2 flex flex-col gap-2">
                <ModeToggle />
                <Button variant="ghost" className="w-full">Features</Button>
                <Button variant="ghost" className="w-full">Community</Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="rounded-2xl w-full">Login</Button>
                  </DialogTrigger>

                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Login</DialogTitle>
                      <DialogDescription>
                        Sign in to continue
                      </DialogDescription>
                    </DialogHeader>

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


      {/* main content */}
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:py-20 pt-24">

        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
              Soft Pastel
              <br />
              <span className="text-transparent bg-clip-text bg-emerald-500 ">
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

          {/* ui card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
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
                    Let’s keep it chill 🌿
                  </div>
                </div>
              </CardContent>
            </Card>

            <Star className="absolute -top-6 -right-3 text-emerald-400 animate-bounce" />
            <Sparkles className="absolute bottom-6 -left-4 text-amber-400 animate-pulse" />
          </motion.div>
        </section>

        {/* tthree cards features */}
        <section className="mt-16 sm:mt-24 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {["Create Rooms", "Meet People", "Chat in Real-time"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="rounded-3xl shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl">
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
      {/* separator */}
      <div className="my-16">
        <svg
          viewBox="0 0 400 40"
          className="w-full opacity-70 dark:opacity-50">
          <path
            d="M0 20 Q 40 10 80 20 T 160 20 T 240 20 T 320 20 T 400 20"
            className="fill-none stroke-emerald-400/60 dark:stroke-emerald-500/60"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"/>
        </svg>
      </div>



      {/* details section(carousel) */}
      <Details />

      <footer className="text-center py-8 text-sm text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} BubbleChat — pastel vibes, open to all
      </footer>
    </div>
  )
}
