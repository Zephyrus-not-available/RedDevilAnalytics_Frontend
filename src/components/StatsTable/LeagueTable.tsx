import { Trophy } from 'lucide-react'
import { useMatchData } from '../../context/MatchDataContext'

export function LeagueTable() {
  const { data } = useMatchData()

  if (!data) {
    return null
  }

  return (
    <section className="glass-panel rounded-2xl p-6 border border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-united-red" />
          <p className="text-sm uppercase tracking-wide text-white/60">League table simulator</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span>
            Current: <span className="text-white font-semibold">#{data.currentPosition}</span>
          </span>
          <span>
            Projected: <span className="text-white font-semibold">#{data.projectedFinish}</span>
          </span>
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-xs text-left">
          <thead className="bg-white/5 text-white/60 uppercase tracking-wide">
            <tr>
              <th className="px-3 py-2">Pos</th>
              <th className="px-3 py-2">Club</th>
              <th className="px-3 py-2 text-right">P</th>
              <th className="px-3 py-2 text-right">GD</th>
              <th className="px-3 py-2 text-right">Pts</th>
              <th className="px-3 py-2 text-right">Proj</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.leagueTable.map((row) => (
              <tr
                key={row.club}
                className={row.isUnited ? 'bg-united-red/15 text-white font-semibold' : 'text-white/80'}
              >
                <td className="px-3 py-2">{row.position}</td>
                <td className="px-3 py-2">{row.club}</td>
                <td className="px-3 py-2 text-right">{row.played}</td>
                <td className="px-3 py-2 text-right">{row.goalDiff}</td>
                <td className="px-3 py-2 text-right">{row.points}</td>
                <td className="px-3 py-2 text-right">{row.projectedFinish ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

