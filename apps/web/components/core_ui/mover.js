"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
function MarqueeSpacer() {
    return <div className="w-2 shrink-1"/>;
}
function ReviewCard({ img, name, username, body, }) {
    return (<figure className={cn("relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl border p-4", "border-zinc-200 bg-white/80 hover:bg-white dark:border-zinc-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-900", "backdrop-blur-md transition-colors")}>
      <div className="flex items-center gap-2">
        <img src={img} alt={name} width={32} height={32} className="rounded-full"/>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {name}
          </figcaption>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {username}
          </p>
        </div>
      </div>

      <blockquote className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {body}
      </blockquote>
    </figure>);
}
export default function MarqueeDemo() {
    return (<section className="relative w-full overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-neutral-900/60 backdrop-blur-xl py-12">

          {/* Row 1 */}
          <Marquee pauseOnHover className="[--duration:28s] [--gap:1.25rem]">
            {firstRow.map((review) => (<ReviewCard key={review.username} {...review}/>))}
            <MarqueeSpacer />

          </Marquee>

          {/* Row 2 */}
          <Marquee reverse pauseOnHover className="[--duration:28s] [--gap:1.25rem]">
            {secondRow.map((review) => (<ReviewCard key={review.username} {...review}/>))}
            <MarqueeSpacer />
          </Marquee>

          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-neutral-900"/>

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-neutral-900"/>
        </div>
      </div>
    </section>);
}
