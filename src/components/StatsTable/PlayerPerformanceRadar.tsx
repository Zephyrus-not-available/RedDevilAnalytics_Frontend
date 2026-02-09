import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import type { PlayerMetric } from '../../types/prediction'

type PlayerPerformanceRadarProps = {
  metrics: PlayerMetric[]
}

export function PlayerPerformanceRadar({ metrics }: PlayerPerformanceRadarProps) {
  const maxValue = Math.max(...metrics.map((metric) => metric.max))
  const chartData = metrics.map((metric) => ({
    subject: metric.label,
    value: metric.value
  }))

  return (
    <ResponsiveContainer width="100%" height={180}>
      <RadarChart data={chartData} outerRadius={70}>
        <PolarGrid stroke="rgba(255,255,255,0.12)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
        <PolarRadiusAxis domain={[0, maxValue]} tick={false} />
        <Radar
          dataKey="value"
          stroke="#DA291C"
          fill="rgba(218, 41, 28, 0.35)"
          strokeWidth={2}
          dot={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
