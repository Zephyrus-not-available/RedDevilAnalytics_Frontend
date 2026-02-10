import axios, { AxiosError } from 'axios'
import type { MatchPrediction } from '../types/prediction'

/**
 * Base URL for the RedDevilAnalytics_Backend API
 * Configure via VITE_API_BASE_URL environment variable
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export type ApiResponse<T> =
  | { status: 'ready'; data: T }
  | { status: 'processing'; message: string }

export type ApiErrorResponse = {
  status: 'error'
  message: string
  code?: string
}

/**
 * Axios instance configured for RedDevilAnalytics_Backend
 * Timeout set to 15s to accommodate AI model computation time
 */
export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: (status) => status >= 200 && status < 300
})

/**
 * Fetch the next fixture prediction from RedDevilAnalytics_Backend
 * Returns ready status with data or processing status when AI is computing
 */
export const getNextPrediction = async (): Promise<ApiResponse<MatchPrediction>> => {
  const response = await api.get<MatchPrediction>('/api/predictions/next-fixture')

  if (response.status === 202) {
    return { status: 'processing', message: 'The analytics engine is computing the match model...' }
  }

  return { status: 'ready', data: response.data }
}

/**
 * Check the health status of RedDevilAnalytics_Backend
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/api/health')
    return response.status === 200
  } catch {
    return false
  }
}

/**
 * Helper to extract error message from API errors
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      return 'Unable to connect to RedDevilAnalytics Backend. Please check if the server is running.'
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout. The server is taking too long to respond.'
    }
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
