import "./globals.css";
import React from "react";
import { Button } from "../components/ui/button";
import { Sparkles, Send, } from "lucide-react";
import Details from "../components/core_ui/details";
import MarqueeDemo from "../components/core_ui/mover";
import Footer from "../components/core_ui/animated_footer";
import Seperator from "../components/core_ui/seperator";
import BackgroundLayout from "../components/core_ui/background";
import Navbar from "../components/core_ui/navbar";
import { Card_1, Card_2 } from "../components/core_ui/motion";
import { useRouter } from "next/navigation";
export default function BubbleLandingPage() {
    const router = useRouter();
    return (<div className="min-h-screen w-full">
      <BackgroundLayout />

      <Navbar />

      {/* landing page */}
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:py-20 pt-24">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
              Soft Cozy
              <br />
              <span className="text-emerald-500">Chat Rooms</span>
              <br />for Everyone
            </h2>

            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto md:mx-0">
              Chill, cozy, friendly chatrooms
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="rounded-2xl" onClick={() => { router.push("/chatrooms"); }}>
                <Send className="mr-2 h-4 w-4"/>
                Get Started with BubbleChat
              </Button>

              <Button variant="outline" size="lg" className="rounded-2xl">
                <Sparkles className="mr-2 h-4 w-4"/>
                Click on features tab and get started
              </Button>
            </div>
          </div>

          {/* cards */}
          <Card_1 />
        </section>

        {/* three cards */}
        <section className="mt-16 sm:mt-24 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Card_2 />
        </section>
      </main>

      {/* remaining downwards */}
      <Seperator />
      <Details />
      <MarqueeDemo />
      <Footer />
    </div>);
}
