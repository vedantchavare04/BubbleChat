"use client"
import "./globals.css"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Moon,
  Sun,
  Sparkles,
  MessageCircleHeart,
  Star,
  Send,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
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
import Details from "../components/core_ui/details"
import MarqueeDemo from "../components/core_ui/mover"
import Footer from "../components/core_ui/animated_footer"
import Seperator from "../components/core_ui/seperator"
import GoogleIcon from "../components/core_ui/google_icon"
import BackgroundLayout from "../components/core_ui/background"
import { LogOut, User, Settings } from "lucide-react"

// profile dropdown
function ProfileDropdown() {
  const { data: session } = useSession()
  if (!session) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center rounded-full sm:rounded-2xl w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 sm:gap-2 sm:border sm:border-dashed sm:bg-white/70 sm:dark:bg-neutral-900/70 sm:backdrop-blur-xl hover:shadow-md transition">
          {session.user?.image ? (
            <img src={session.user.image} alt="profile" className="h-9 w-9 rounded-full"/>
          ) : (
            <div className="h-9 w-9 rounded-full bg-emerald-400 flex items-center justify-center text-white text-sm font-bold">
              {session.user?.name?.[0]}
            </div>
          )}

          {/* Desktop only name */}
          <span className="hidden sm:block text-sm font-medium">
            {session.user?.name?.split(" ")[0]}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-2xl">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Signed in as
          <div className="font-medium text-sm text-foreground truncate">
            {session.user?.email}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


// mode toggle
function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
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

export default function BubbleLandingPage() {
  const [open, setOpen] = React.useState(false)
  const { data: session, status } = useSession()


  return (
    <div className="min-h-screen w-full">
      <BackgroundLayout />

      {/* navbar*/}
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-200/80 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 shadow-sm">
              <MessageCircleHeart className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Bubble
              <span className="text-emerald-600 dark:text-emerald-400">Chat</span>
            </h1>
          </div>

          {/* desktop menu */}
          <div className="hidden sm:flex gap-3 items-center p-1.5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl border border-dashed border-gray-400 dark:border-neutral-700">
            <ModeToggle />
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Community</Button>

            {/* login/signup dialog */}
           {session ? <ProfileDropdown /> : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-2xl">Login / Signup</Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl backdrop-blur-2xl">
                <DialogHeader>
                  <DialogTitle>Login or Signup</DialogTitle>
                  <DialogDescription>
                    Welcome to BubbleChat
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col gap-2">
                  <Button className="w-full rounded-2xl" onClick={() => signIn("google")}>
                    <GoogleIcon />
                    Continue with Google
                  </Button>

                  <Button variant="outline" className="w-full rounded-2xl">
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>              
            </Dialog>
          )}
        </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="sm:hidden rounded-xl border p-2 border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-black/40 backdrop-blur">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="sm:hidden bg-white/50 dark:bg-black/40 backdrop-blur-xl">
              <div className="px-4 py-4 flex flex-col gap-2">
                <ModeToggle />
                <Button variant="ghost">Features</Button>
                <Button variant="ghost">Community</Button>

                {session ? (
                    <ProfileDropdown />
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-2xl w-full">Login</Button>
                      </DialogTrigger>
                                  <DialogContent className="rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Login or Signup</DialogTitle>
                      <DialogDescription>
                          Welcome to BubbleChat
                      </DialogDescription>
                    </DialogHeader>

                  <DialogFooter>
                    <Button className="w-full rounded-2xl" onClick={() => signIn("google")}>
                      <GoogleIcon />
                          Continue with Google
                      </Button>
                      </DialogFooter>
                    </DialogContent>
                    </Dialog>
                  )}

            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* landing page */}
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:py-20 pt-24">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
              Soft Pastel
              <br />
              <span className="text-emerald-500">Chat Rooms</span>
              <br />for Everyone
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto md:mx-0">
              Chill, cozy, gender-neutral pastel vibes
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="rounded-2xl">
                <Send className="mr-2 h-4 w-4" />
                Get Started with BubbleChat
              </Button>

              <Button variant="outline" size="lg" className="rounded-2xl">
                <Sparkles className="mr-2 h-4 w-4" />
                Live Preview
              </Button>
            </div>
          </div>

          {/* cards */}
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
                    Let’s keep it chill 🌿
                  </div>
                </div>
              </CardContent>
            </Card>

            <Star className="absolute -top-6 -right-3 text-emerald-400 animate-bounce" />
            <Sparkles className="absolute bottom-6 -left-4 text-amber-400 animate-pulse" />
          </motion.div>
        </section>

        {/* three cards */}
        <section className="mt-16 sm:mt-24 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
                    Soft pastel UI designed to feel warm, calm, and welcoming to everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>
      </main>

      {/* remaining downwards */}
      <Seperator />
      <Details />
      <MarqueeDemo />
      <Footer />
    </div>
  )
}
