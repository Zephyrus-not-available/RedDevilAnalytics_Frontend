import { useMatchData } from '../../context/MatchDataContext'
import { formResultLabel, formResultTone } from '../../lib/ui'

export function FormGuide() {
  const { data, selectedFormIndex, setSelectedFormIndex } = useMatchData()

  if (!data) {
    return null
  }

  const selectedMatch = data.recentMatches[selectedFormIndex]

  return (
    <section className="glass-panel rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Form Guide</p>
          <p className="text-lg font-semibold">Last 5 matches</p>
        </div>
        <div className="text-xs text-white/60">
          {selectedMatch?.competition} {selectedMatch?.venue === 'H' ? '(Home)' : '(Away)'}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {data.recentMatches.map((match, index) => {
          const isActive = index === selectedFormIndex
          return (
            <button
              key={match.id}
              type="button"
              onClick={() => setSelectedFormIndex(index)}
              className={`h-10 w-10 rounded-full grid place-items-center text-sm font-semibold border transition ${
                formResultTone[match.result]
              } ${isActive ? 'ring-2 ring-united-red/60' : 'opacity-80 hover:opacity-100'}`}
              aria-pressed={isActive}
              aria-label={`${formResultLabel[match.result]} vs ${match.opponent}`}
            >
              {match.result}
            </button>
          )
        })}
      </div>
      {selectedMatch && (
        <div className="mt-5 grid gap-2 text-sm text-white/70">
          <div className="flex items-center justify-between">
            <span className="text-white">{selectedMatch.opponent}</span>
            <span className="font-semibold text-white">{selectedMatch.score}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{selectedMatch.date}</span>
            <span>{formResultLabel[selectedMatch.result]}</span>
          </div>
        </div>
      )}
    </section>
  )
}

