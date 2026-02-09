import { useMatchData } from '../../context/MatchDataContext'

export function Navbar() {
  const { live, toggleLive } = useMatchData()

  return (
    <header className="sticky top-0 z-20 bg-united-black/80 backdrop-blur-lg border-b border-white/10 w-full transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 py-4 md:px-6 md:py-5 gap-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-united-red to-red-800 grid place-items-center drop-shadow-glow overflow-hidden flex-shrink-0">
            <a href="#main" className="sr-only-focusable">
              Skip to main
            </a>
            <picture>
              <source srcSet="/logo-512.webp 512w, /logo-256.webp 256w" type="image/webp" />
              <source srcSet="/logo-512.jpg 512w, /logo-256.jpg 256w" type="image/jpeg" />
              <img
                src="/img.png"
                alt="Red Devil Analytics"
                className="h-full w-full object-contain transform transition-transform duration-200 ease-out hover:scale-105 focus:scale-105"
                width={48}
                height={48}
              />
            </picture>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60 leading-tight">
              Red Devil
            </p>
            <p className="text-base md:text-xl font-headline leading-none text-white tracking-wide">
              Analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden xs:inline-block text-[10px] md:text-xs uppercase tracking-wide text-white/60">
            Live data
          </span>
          <button
            onClick={toggleLive}
            className={`relative inline-flex h-7 w-12 md:h-9 md:w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-united-red focus-visible:ring-offset-2 focus-visible:ring-offset-united-black ${
              live ? 'bg-united-red' : 'bg-white/10'
            }`}
            aria-pressed={live}
            aria-label="Toggle live data"
          >
            <span
              className={`inline-block h-5 w-5 md:h-7 md:w-7 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                live ? 'translate-x-6 md:translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}
