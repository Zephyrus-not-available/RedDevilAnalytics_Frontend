import { useQuery } from '@tanstack/react-query'
import { getNextPrediction } from '../services/api'
import { mockPrediction } from '../data/mockPrediction'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const useMock = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const usePrediction = () =>
  useQuery({
    queryKey: ['match-prediction', useMock],
    queryFn: async () => {
      if (useMock) {
        await delay(800)
        return { status: 'ready', data: mockPrediction } as const
      }
      return getNextPrediction()
    },
    refetchInterval: (query) => {
      // Poll every 3 seconds if status is processing
      if (query.state.data?.status === 'processing') {
        return 3000
      }
      return false
    },
    staleTime: 0, // Always check for fresh data
    retry: false // Don't retry on 202 (it's a success in our book), only on actual errors
  })
