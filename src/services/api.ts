import axios from 'axios'
import type { MatchPrediction } from '../types/prediction'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

type ApiResponse<T> =
  | { status: 'ready'; data: T }
  | { status: 'processing'; message: string }

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 300 // Accept 202 as success
})

export const getNextPrediction = async (): Promise<ApiResponse<MatchPrediction>> => {
  const response = await api.get<MatchPrediction>('/api/predictions/next-fixture')

  if (response.status === 202) {
    return { status: 'processing', message: 'The analytics engine is computing the match model...' }
  }

  return { status: 'ready', data: response.data }
}
