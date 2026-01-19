"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
export default function Footer() {
    const logoRef = useRef(null);
    const isInView = useInView(logoRef, { once: true, margin: "-80px" });
    return (<footer className="relative mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"/>
      </div>

      <div className="
          mt-10
          backdrop-blur-xl
          bg-white/40 dark:bg-neutral-900/40
        ">
        <div className="mx-auto max-w-6xl px-4 py-14 flex flex-col items-center gap-6">

          {/* logo */}
          <motion.div ref={logoRef} initial={{ y: 24, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{
            type: "spring",
            stiffness: 120,
            damping: 16,
        }} className="flex items-center gap-3 select-none">
            <div className="
                flex items-center justify-center
                h-11 w-11 rounded-2xl
                bg-emerald-200/80 dark:bg-emerald-900/50
                border border-emerald-300 dark:border-emerald-800
                shadow-sm
              ">
              <MessageCircleHeart className="h-6 w-6 text-emerald-700 dark:text-emerald-300"/>
            </div>

            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Bubble
              <span className="text-emerald-600 dark:text-emerald-400">
                Chat
              </span>
            </span>
          </motion.div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
            Cozy, calm conversations — open to everyone.
          </p>

          {/* bottom */}
          <div className="pt-6 text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Made with ❤️.
          </div>
        </div>
      </div>
    </footer>);
}
