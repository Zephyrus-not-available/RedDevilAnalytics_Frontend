/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { usePrediction } from '../hooks/usePrediction'
import type { MatchPrediction } from '../types/prediction'

type MatchDataContextValue = {
  live: boolean
  toggleLive: () => void
  selectedFormIndex: number
  setSelectedFormIndex: (index: number) => void
  data?: MatchPrediction
  isLoading: boolean
  isProcessing: boolean
  isError: boolean
  error: unknown
  refetch: () => void
}

const MatchDataContext = createContext<MatchDataContextValue | undefined>(undefined)

export function MatchDataProvider({ children }: { children: ReactNode }) {
  const [live, setLive] = useState(false)
  const [selectedFormIndex, setSelectedFormIndex] = useState(0)
  const { data: apiResponse, isLoading, isError, error, refetch } = usePrediction()

  const data = apiResponse?.status === 'ready' ? apiResponse.data : undefined
  const isProcessing = apiResponse?.status === 'processing'

  const value = useMemo(
    () => ({
      live,
      toggleLive: () => setLive((prev) => !prev),
      selectedFormIndex,
      setSelectedFormIndex,
      data,
      isLoading,
      isProcessing,
      isError,
      error,
      refetch
    }),
    [live, selectedFormIndex, data, isLoading, isProcessing, isError, error, refetch]
  )

  return <MatchDataContext.Provider value={value}>{children}</MatchDataContext.Provider>
}

export function useMatchData() {
  const context = useContext(MatchDataContext)
  if (!context) {
    throw new Error('useMatchData must be used within MatchDataProvider')
  }
  return context
}
