import { Activity, TrendingUp } from 'lucide-react'
import { useMatchData } from '../../context/MatchDataContext'
import { PlayerPerformanceRadar } from './PlayerPerformanceRadar'

export function PlayerStatGrid() {
  const { data } = useMatchData()

  if (!data) {
    return null
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <div className="glass-panel rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-united-red" />
          <p className="text-sm uppercase tracking-wide text-white/60">Expected performance radar</p>
        </div>
        <p className="text-lg font-semibold mt-2">Predicted impact profile</p>
        <div className="mt-4">
          <PlayerPerformanceRadar metrics={data.radarMetrics} />
        </div>
        <div className="mt-4 text-xs text-white/60">
          Metrics are calibrated for upcoming fixture intensity and opponent press profile.
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.playerProjections.map((player) => (
          <div key={player.id} className="glass-panel rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{player.name}</p>
                <p className="text-xs text-white/60">{player.position}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <TrendingUp className="w-4 h-4 text-united-red" />
                <span>{player.minutes} mins</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>xG</span>
                <span className="text-white font-semibold">{player.expectedXG.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>xA</span>
                <span className="text-white font-semibold">{player.expectedXA.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shots</span>
                <span className="text-white font-semibold">{player.shots}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Key passes</span>
                <span className="text-white font-semibold">{player.keyPasses}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-white/60">{player.heatZone}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

