export type AiConfidence = 'High' | 'Medium' | 'Low'

export type Probability = {
  win: number
  draw: number
  loss: number
}

export type FormResult = 'W' | 'D' | 'L'

export type RecentMatch = {
  id: string
  opponent: string
  result: FormResult
  score: string
  date: string
  venue: 'H' | 'A'
  competition: string
}

export type PlayerProjection = {
  id: string
  name: string
  position: string
  expectedXG: number
  expectedXA: number
  shots: number
  keyPasses: number
  minutes: number
  heatZone: string
  photo?: string
}

export type PlayerMetric = {
  label: string
  value: number
  max: number
}

export type LeagueTableRow = {
  position: number
  club: string
  played: number
  goalDiff: number
  points: number
  isUnited?: boolean
  projectedFinish?: number
}

export type MatchPrediction = {
  opponent: string
  venue: string
  date: string
  kickoff: string
  aiConfidence: AiConfidence
  predictedScore: {
    home: number
    away: number
  }
  probabilities: Probability
  recentForm: FormResult[]
  recentMatches: RecentMatch[]
  attackXG: number
  defenseCleanSheet: number
  starPlayer: PlayerProjection
  playerProjections: PlayerProjection[]
  radarMetrics: PlayerMetric[]
  leagueTable: LeagueTableRow[]
  currentPosition: number
  projectedFinish: number
}

