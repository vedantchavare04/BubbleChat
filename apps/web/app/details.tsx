"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function FeaturesCarousel() {
  return (
    <Carousel
      orientation="vertical"
      opts={{ align: "start", loop: true }}
      className="w-full max-w-sm mx-auto"
    >
      <CarouselContent className="-mt-1 h-[260px] sm:h-[320px]">
        {[
          { emoji: "🌈", label: "Aesthetic Pastel UI" },
          { emoji: "👥", label: "Public & Private Rooms" },
          { emoji: "⚡", label: "Realtime Messaging" },
          { emoji: "🎭", label: "Custom Avatars" },
          { emoji: "🔒", label: "Secure Conversations" },
        ].map((item, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-2">
              <Card className="rounded-3xl border-0 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-xl">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl">{item.emoji}</span>

                  <p className="font-semibold text-lg text-center">
                    {item.label}
                  </p>

                  <p className="text-sm text-muted-foreground text-center">
                    Smooth animations • Cozy vibes • Soft gradients
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

    <CarouselPrevious className="left-1/2 -translate-x-1/2 -top-4 rotate-90"/>

    <CarouselNext className="left-1/2 -translate-x-1/2 -bottom-4 rotate-90"/>

    </Carousel>
  )
}

export default function Details() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* text content */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
            Various chatrooms
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500">
              bubbles to explore
            </span>
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto md:mx-0">
            Discover communities, join conversations, or create your own cozy space.
            BubbleChat is built for comfort, aesthetics and simplicity.
          </p>
        </div>

        {/* carousel */}
        <div className="flex justify-center">
          <FeaturesCarousel />
        </div>
      </div>
    </section>
  )
}
