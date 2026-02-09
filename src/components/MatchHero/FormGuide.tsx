import { useMatchData } from '../../context/MatchDataContext'
import { formResultLabel, formResultTone } from '../../lib/ui'
import { motion, AnimatePresence } from 'framer-motion'

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
            <motion.button
              key={match.id}
              layout
              type="button"
              onClick={() => setSelectedFormIndex(index)}
              className={`h-10 w-10 rounded-full grid place-items-center text-sm font-semibold border transition-colors ${
                formResultTone[match.result]
              } ${isActive ? 'ring-2 ring-united-red/60 scale-110' : 'opacity-80 hover:opacity-100'}`}
              aria-pressed={isActive}
              aria-label={`${formResultLabel[match.result]} vs ${match.opponent}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {match.result}
            </motion.button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        {selectedMatch && (
          <motion.div
            key={selectedMatch.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{selectedMatch.opponent}</span>
                <span className="font-bold text-white text-lg font-headline">{selectedMatch.score}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{selectedMatch.date}</span>
                <span className={`px-2 py-0.5 rounded-full ${formResultTone[selectedMatch.result].split(' ')[0]}`}>
                  {formResultLabel[selectedMatch.result]}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

