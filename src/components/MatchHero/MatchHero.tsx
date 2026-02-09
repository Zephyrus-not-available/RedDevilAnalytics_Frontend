import React from 'react'
import { Activity, MapPin, Shield, TrendingUp, Zap } from 'lucide-react'
import type { MatchPrediction } from '../../types/prediction'
import { confidenceTone, formResultTone } from '../../lib/ui'

type StatCardProps = {
  title: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  value: string
  helper?: string | React.ReactNode
}

function StatCard({ title, icon: Icon, value, helper }: StatCardProps) {
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

export function MatchHero({ data }: { data: MatchPrediction }) {
  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-united-red/15 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(218,41,28,0.4),transparent_35%)]" />
      <div className="absolute right-8 top-10 text-8xl font-headline tracking-[0.35em] stroke-text pointer-events-none">
        UNITED
      </div>
      <div className="relative p-8 lg:p-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
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
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">AI Predicted Score</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-6xl font-headline drop-shadow-glow text-white">
                  {data.predictedScore.home}
                </span>
                <span className="text-2xl text-white/70">-</span>
                <span className="text-6xl font-headline text-white/80">
                  {data.predictedScore.away}
                </span>
              </div>
            </div>
            <div className={`px-3 py-2 rounded-xl text-xs font-semibold ${confidenceTone[data.aiConfidence]}`}>
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
                      formResultTone[result]
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
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex gap-5 items-center">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-gradient-to-br from-united-red to-red-800">
              {data.starPlayer.photo && (
                <img
                  src={data.starPlayer.photo}
                  alt={data.starPlayer.name}
                  className="h-full w-full object-cover opacity-90"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-white/60">Star Player To Watch</p>
              <p className="text-xl font-semibold">{data.starPlayer.name}</p>
              <p className="text-sm text-white/70">{data.starPlayer.position}</p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Zap className="w-4 h-4 text-united-red" />
                <span>
                  {data.starPlayer.expectedXG.toFixed(2)} xG, {data.starPlayer.expectedXA.toFixed(2)} xA
                </span>
              </div>
              <div className="text-xs text-white/60">{data.starPlayer.heatZone}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
