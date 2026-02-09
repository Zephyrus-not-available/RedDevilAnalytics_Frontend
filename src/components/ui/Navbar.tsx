import { Zap } from 'lucide-react'
import { useMatchData } from '../../context/MatchDataContext'

export function Navbar() {
  const { live, toggleLive } = useMatchData()

  return (
    <header className="sticky top-0 z-20 bg-united-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-united-red to-red-800 grid place-items-center drop-shadow-glow">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Red Devil</p>
            <p className="text-lg font-headline leading-tight">Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wide text-white/60">Live data</span>
          <button
            onClick={toggleLive}
            className={`relative inline-flex h-9 w-16 items-center rounded-full transition ${
              live ? 'bg-united-red' : 'bg-white/10'
            }`}
            aria-pressed={live}
            aria-label="Toggle live data"
          >
            <span
              className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition ${
                live ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}

