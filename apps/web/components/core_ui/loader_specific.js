export default function Loader() {
    return (<div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card/60 backdrop-blur-xl px-8 py-6 shadow-lg">

        <p className="text-sm font-medium text-foreground">
          Joining room
        </p>

        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse"/>
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:150ms]"/>
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:300ms]"/>
        </div>

        <p className="text-xs text-muted-foreground">
          Preparing a cozy space for you
        </p>
      </div>
    </div>);
}
