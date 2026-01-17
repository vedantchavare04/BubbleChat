"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import { EyeIcon, AiBeautifyIcon, Chatting01Icon, UserCircleIcon, Shield01Icon, } from "hugeicons-react";
/* feature carousel */
function FeaturesCarousel() {
    const features = [
        { label: "Aesthetic Pastel UI", icon: AiBeautifyIcon },
        { label: "Public & Private Rooms", icon: EyeIcon },
        { label: "Realtime Messaging", icon: Chatting01Icon },
        { label: "Custom Avatars", icon: UserCircleIcon },
        { label: "Secure Conversations", icon: Shield01Icon },
    ];
    return (<Carousel orientation="vertical" opts={{ align: "start", loop: true }} className="w-full max-w-sm mx-auto">
      <CarouselContent className="-mt-1 h-[260px] sm:h-[320px]">

        {features.map((item, index) => {
            const Icon = item.icon;
            return (<CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-2">

                <Card className="rounded-3xl border-0 bg-white/70 dark:bg-neutral-800/80 backdrop-blur-xl shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-4">

                    {/* icons */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br">
                      <Icon className="w-10 h-10 text-emerald-600 dark:text-emerald-300"/>
                    </div>

                    <p className="font-semibold text-lg text-center">
                      {item.label}
                    </p>

                    <p className="text-sm text-muted-foreground text-center">
                      Smooth animations • Cozy vibes • Soft gradients
                    </p>

                  </CardContent>
                </Card>

              </div>
            </CarouselItem>);
        })}

      </CarouselContent>

      <CarouselPrevious className="left-1/2 -translate-x-1/2 -top-4 rotate-90"/>
      <CarouselNext className="left-1/2 -translate-x-1/2 -bottom-4 rotate-90"/>

    </Carousel>);
}
export default function Details() {
    return (<section className="w-full max-w-6xl mx-auto px-4 py-20">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* TEXT SIDE */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
            Various chatrooms
            <br />
            <span className="text-transparent bg-clip-text  bg-emerald-500">
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
    </section>);
}
