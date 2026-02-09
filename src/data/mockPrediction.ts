import type { MatchPrediction } from '../types/prediction'

export const mockPrediction: MatchPrediction = {
  opponent: 'Liverpool',
  venue: 'Old Trafford, Manchester',
  date: 'Saturday, 14 Feb 2026',
  kickoff: '18:30 GMT',
  aiConfidence: 'High',
  predictedScore: {
    home: 2,
    away: 1
  },
  probabilities: {
    win: 57,
    draw: 22,
    loss: 21
  },
  recentForm: ['W', 'W', 'D', 'L', 'W'],
  recentMatches: [
    {
      id: 'match-1',
      opponent: 'Chelsea',
      result: 'W',
      score: '2-0',
      date: '01 Feb 2026',
      venue: 'H',
      competition: 'Premier League'
    },
    {
      id: 'match-2',
      opponent: 'Tottenham',
      result: 'W',
      score: '3-1',
      date: '25 Jan 2026',
      venue: 'A',
      competition: 'Premier League'
    },
    {
      id: 'match-3',
      opponent: 'Newcastle',
      result: 'D',
      score: '1-1',
      date: '18 Jan 2026',
      venue: 'H',
      competition: 'Premier League'
    },
    {
      id: 'match-4',
      opponent: 'Arsenal',
      result: 'L',
      score: '0-1',
      date: '11 Jan 2026',
      venue: 'A',
      competition: 'Premier League'
    },
    {
      id: 'match-5',
      opponent: 'Leeds United',
      result: 'W',
      score: '2-1',
      date: '04 Jan 2026',
      venue: 'H',
      competition: 'Premier League'
    }
  ],
  attackXG: 1.9,
  defenseCleanSheet: 0.38,
  starPlayer: {
    id: 'bruno-fernandes',
    name: 'Bruno Fernandes',
    position: 'Attacking Midfielder',
    expectedXG: 0.32,
    expectedXA: 0.41,
    shots: 3,
    keyPasses: 4,
    minutes: 90,
    heatZone: 'Advanced playmaker channels',
    photo:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=500&q=80'
  },
  playerProjections: [
    {
      id: 'marcus-rashford',
      name: 'Marcus Rashford',
      position: 'Left Forward',
      expectedXG: 0.44,
      expectedXA: 0.18,
      shots: 4,
      keyPasses: 2,
      minutes: 88,
      heatZone: 'Left half-space entries'
    },
    {
      id: 'rasmus-hojlund',
      name: 'Rasmus Hojlund',
      position: 'Striker',
      expectedXG: 0.52,
      expectedXA: 0.08,
      shots: 5,
      keyPasses: 1,
      minutes: 85,
      heatZone: 'Central penalty area'
    },
    {
      id: 'alejandro-garnacho',
      name: 'Alejandro Garnacho',
      position: 'Right Forward',
      expectedXG: 0.26,
      expectedXA: 0.22,
      shots: 3,
      keyPasses: 2,
      minutes: 82,
      heatZone: 'Right wing isolations'
    },
    {
      id: 'matheus-cunha',
      name: 'Matheus Cunha',
      position: 'Secondary Striker',
      expectedXG: 0.35,
      expectedXA: 0.28,
      shots: 3,
      keyPasses: 3,
      minutes: 75,
      heatZone: 'Between the lines'
    },
    {
      id: 'bryan-mbeumo',
      name: 'Bryan Mbeumo',
      position: 'Right Winger',
      expectedXG: 0.29,
      expectedXA: 0.31,
      shots: 2,
      keyPasses: 3,
      minutes: 70,
      heatZone: 'Cutting inside right'
    },
    {
      id: 'kobbie-mainoo',
      name: 'Kobbie Mainoo',
      position: 'Central Midfielder',
      expectedXG: 0.15,
      expectedXA: 0.12,
      shots: 1,
      keyPasses: 4,
      minutes: 90,
      heatZone: 'Midfield transitions'
    },
    {
      id: 'andre-onana',
      name: 'Andre Onana',
      position: 'Goalkeeper',
      expectedXG: 0,
      expectedXA: 0.02,
      shots: 0,
      keyPasses: 1,
      minutes: 90,
      heatZone: 'Distribution lanes'
    }
  ],
  radarMetrics: [
    { label: 'xG', value: 0.32, max: 0.6 },
    { label: 'xA', value: 0.41, max: 0.7 },
    { label: 'Shots', value: 3, max: 6 },
    { label: 'Key Passes', value: 4, max: 7 },
    { label: 'Pressures', value: 12, max: 20 }
  ],
  leagueTable: [
    { position: 1, club: 'Arsenal', played: 24, goalDiff: 32, points: 56 },
    {
      position: 2,
      club: 'Manchester United',
      played: 24,
      goalDiff: 24,
      points: 52,
      isUnited: true,
      projectedFinish: 2
    },
    { position: 3, club: 'Manchester City', played: 24, goalDiff: 21, points: 49 },
    { position: 4, club: 'Liverpool', played: 24, goalDiff: 18, points: 48 },
    { position: 5, club: 'Tottenham', played: 24, goalDiff: 12, points: 44 },
    { position: 6, club: 'Chelsea', played: 24, goalDiff: 9, points: 41 }
  ],
  currentPosition: 2,
  projectedFinish: 2
}

