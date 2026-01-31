import { useMemo, useState } from 'react'
import {
  Zap,
  Shield,
  TrendingUp,
  MapPin,
  Activity,
  Gauge
} from 'lucide-react'
import './App.css'

type Probability = {
  win: number
  draw: number
  loss: number
}

type StarPlayer = {
  name: string
  position: string
  photo: string
  predictedContribution: string
  location: string
}

type MatchData = {
  opponent: string
  venue: string
  date: string
  kickoff: string
  aiConfidence: 'High' | 'Medium' | 'Low'
  predictedScore: [number, number]
  probabilities: Probability
  recentForm: Array<'W' | 'D' | 'L'>
  attackXG: number
  defenseCleanSheet: number
  starPlayer: StarPlayer
}

const mockData: MatchData = {
  opponent: 'Liverpool',
  venue: 'Old Trafford, Manchester',
  date: 'Saturday, 14 Feb 2026',
  kickoff: '18:30 GMT',
  aiConfidence: 'High',
  predictedScore: [2, 1],
  probabilities: {
    win: 57,
    draw: 22,
    loss: 21
  },
  recentForm: ['W', 'W', 'D', 'L', 'W'],
  attackXG: 1.9,
  defenseCleanSheet: 0.38,
  starPlayer: {
    name: 'Bruno Fernandes',
    position: 'Attacking Midfielder',
    photo:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=500&q=80',
    predictedContribution: '75% chance of assist',
    location: 'Advanced playmaker channels'
  }
}

const badgeTone: Record<MatchData['aiConfidence'], string> = {
  High: 'bg-green-500/15 text-green-300 border border-green-400/20',
  Medium: 'bg-amber-500/15 text-amber-200 border border-amber-300/20',
  Low: 'bg-red-500/15 text-red-200 border border-red-300/20'
}

function Navbar({ live, onToggle }: { live: boolean; onToggle: () => void }) {
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
            onClick={onToggle}
            className={`relative inline-flex h-9 w-16 items-center rounded-full transition ${
              live ? 'bg-united-red' : 'bg-white/10'
            }`}
            aria-pressed={live}
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

function ProbabilityBar({
  probabilities,
  confidence
}: {
  probabilities: Probability
  confidence: MatchData['aiConfidence']
}) {
  const total = probabilities.win + probabilities.draw + probabilities.loss || 1
  const segments = [
    {
      label: 'Win',
      value: probabilities.win,
      color: 'from-united-red to-red-700'
    },
    {
      label: 'Draw',
      value: probabilities.draw,
      color: 'from-slate-500 to-slate-700'
    },
    {
      label: 'Loss',
      value: probabilities.loss,
      color: 'from-blue-500 to-blue-700'
    }
  ]

  return (
    <section className="glass-panel p-5 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-white/70" />
          <p className="text-sm uppercase tracking-wide text-white/60">Win / Draw / Loss probability</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeTone[confidence]}`}>
          AI Confidence: {confidence}
        </span>
      </div>
      <div className="h-6 w-full overflow-hidden rounded-full bg-white/5 border border-white/10 flex">
        {segments.map((segment) => {
          const width = `${Math.max(4, Math.round((segment.value / total) * 100))}%`
          return (
            <div
              key={segment.label}
              className={`h-full transition-all duration-500 bg-gradient-to-r ${segment.color}`}
              style={{ width }}
            />
          )
        })}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3 text-sm text-white/70">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between">
            <span>{segment.label}</span>
            <span className="font-semibold text-white">{segment.value}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatCard({
  title,
  icon: Icon,
  value,
  helper
}: {
  title: string
  icon: typeof Shield
  value: string
  helper?: string | JSX.Element
}) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="relative flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-white/5 grid place-items-center">
          <Icon className="w-5 h-5 text-white/80" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          {helper && <div className="text-xs text-white/60 mt-1">{helper}</div>}
        </div>
      </div>
    </div>
  )
}

function MatchHero({ data }: { data: MatchData }) {
  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-united-red/15 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(218,41,28,0.4),transparent_35%)]" />
      <div className="absolute right-8 top-10 text-8xl font-headline tracking-[0.35em] stroke-text pointer-events-none">
        UNITED
      </div>
      <div className="relative p-8 lg:p-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm text-white/70">
            <MapPin className="w-4 h-4" />
            <span>{data.venue}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{data.date}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{data.kickoff}</span>
          </div>
          <div>
            <p className="uppercase text-white/60 tracking-[0.3em] text-xs">Next Match</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-united-red to-red-800 grid place-items-center text-lg font-semibold">
                MU
              </div>
              <div className="text-sm text-white/60">vs</div>
              <div className="h-12 w-12 rounded-full bg-white/5 grid place-items-center text-lg font-semibold">
                {data.opponent.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-headline tracking-tight mt-4">
              Manchester United <span className="text-white/60">vs</span> {data.opponent}
            </h1>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">AI Predicted Score</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-6xl font-headline drop-shadow-glow text-white">
                  {data.predictedScore[0]}
                </span>
                <span className="text-2xl text-white/70">-</span>
                <span className="text-6xl font-headline text-white/80">
                  {data.predictedScore[1]}
                </span>
              </div>
            </div>
            <div className={`px-3 py-2 rounded-xl text-xs font-semibold ${badgeTone[data.aiConfidence]}`}>
              Confidence: {data.aiConfidence}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <StatCard
            title="Recent Form"
            icon={Activity}
            value={data.recentForm.join(' ')}
            helper={
              <div className="flex gap-1">
                {data.recentForm.map((result, idx) => (
                  <span
                    key={`${result}-${idx}`}
                    className={`w-7 h-7 rounded-full grid place-items-center text-xs font-semibold ${
                      result === 'W'
                        ? 'bg-green-500/30 text-green-200'
                        : result === 'D'
                          ? 'bg-slate-500/30 text-slate-200'
                          : 'bg-red-500/30 text-red-200'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            }
          />
          <StatCard
            title="Attack Power (xG)"
            icon={TrendingUp}
            value={`${data.attackXG.toFixed(2)} xG`}
            helper="Projected attacking output"
          />
          <StatCard
            title="Defensive Strength"
            icon={Shield}
            value={`${Math.round(data.defenseCleanSheet * 100)}% clean sheet chance`}
            helper="Probability of shutting out opponent"
          />
        </div>
      </div>
    </section>
  )
}

function PlayerInsight({ player }: { player: StarPlayer }) {
  return (
    <section className="glass-panel rounded-2xl p-6 border border-white/10 flex gap-5 items-center">
      <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-gradient-to-br from-united-red to-red-800">
        <img
          src={player.photo}
          alt={player.name}
          className="h-full w-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-white/60">Star Player To Watch</p>
        <p className="text-xl font-semibold">{player.name}</p>
        <p className="text-sm text-white/70">{player.position}</p>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Zap className="w-4 h-4 text-united-red" />
          <span>{player.predictedContribution}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <MapPin className="w-3 h-3" />
          <span>{player.location}</span>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [live, setLive] = useState(false)
  const matchData = useMemo(() => mockData, [])

  return (
    <div className="min-h-screen bg-united-black text-white">
      <Navbar live={live} onToggle={() => setLive((prev) => !prev)} />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="grid-overlay" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
          <MatchHero data={matchData} />
          <ProbabilityBar probabilities={matchData.probabilities} confidence={matchData.aiConfidence} />
          <PlayerInsight player={matchData.starPlayer} />
        </div>
      </main>
    </div>
  )
}

export default App
