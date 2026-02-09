import { Gauge } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { AiConfidence, Probability } from '../../types/prediction'
import { confidenceTone } from '../../lib/ui'

const probabilityColors = ['#DA291C', '#64748B', '#3B82F6']

type ProbabilityBarProps = {
  probabilities: Probability
  confidence: AiConfidence
}

export function ProbabilityBar({ probabilities, confidence }: ProbabilityBarProps) {
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

  const chartData = segments.map((segment) => ({
    name: segment.label,
    value: segment.value
  }))

  return (
    <section className="glass-panel p-5 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-white/70" />
          <p className="text-sm uppercase tracking-wide text-white/60">Win / Draw / Loss probability</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${confidenceTone[confidence]}`}>
          AI Confidence: {confidence}
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_160px] items-center">
        <div>
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
        </div>
        <div className="h-28 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" innerRadius={32} outerRadius={50} paddingAngle={3}>
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={probabilityColors[index % probabilityColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

