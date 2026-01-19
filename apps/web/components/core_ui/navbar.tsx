"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Moon,
  Sun,
  MessageCircleHeart,
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
  DropdownMenuLabel,
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
import GoogleIcon from "./google_icon"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"


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

        <DropdownMenuItem onClick={() => signOut()} className="gap-2 cursor-pointer text-red-500 focus:text-red-500">
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

// navbar
export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  return (
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Features</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1">
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => router.push("/chatrooms")}
              >
                Chatrooms
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost">Community</Button>

          {session ? (
            <ProfileDropdown />
          ) : (
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
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden rounded-xl border p-2 border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-black/40 backdrop-blur"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white/50 dark:bg-black/40 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    Features
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-52 rounded-2xl p-1">
                  <DropdownMenuItem
                    className="rounded-xl cursor-pointer"
                    onClick={() => {
                      setOpen(false)
                      router.push("/chatrooms")
                    }}
                  >
                    Chatrooms
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>


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
                      <Button
                        className="w-full rounded-2xl"
                        onClick={() => signIn("google")}
                      >
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
  )
}
