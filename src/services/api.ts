import axios from 'axios'
import type { MatchPrediction } from '../types/prediction'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
})

export const getNextPrediction = async (): Promise<MatchPrediction> => {
  const response = await api.get<MatchPrediction>('/api/predictions/next-fixture')
  return response.data
}

