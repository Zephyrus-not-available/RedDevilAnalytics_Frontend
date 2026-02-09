import { useQuery } from '@tanstack/react-query'
import { getNextPrediction } from '../services/api'
import { mockPrediction } from '../data/mockPrediction'
import type { MatchPrediction } from '../types/prediction'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true'

const fetchPrediction = async (): Promise<MatchPrediction> => {
  if (useMock) {
    await delay(600)
    return mockPrediction
  }

  return getNextPrediction()
}

export const usePrediction = () =>
  useQuery({
    queryKey: ['match-prediction', useMock],
    queryFn: fetchPrediction,
    staleTime: 60_000,
    retry: 1
  })

