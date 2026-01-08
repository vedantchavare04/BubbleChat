export default function BackgroundLayout() {
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