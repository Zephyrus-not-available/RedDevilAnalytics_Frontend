import type { AiConfidence, FormResult } from '../types/prediction'

export const confidenceTone: Record<AiConfidence, string> = {
  High: 'bg-green-500/15 text-green-300 border border-green-400/20',
  Medium: 'bg-amber-500/15 text-amber-200 border border-amber-300/20',
  Low: 'bg-red-500/15 text-red-200 border border-red-300/20'
}

export const formResultTone: Record<FormResult, string> = {
  W: 'bg-green-500/30 text-green-200 border border-green-400/30',
  D: 'bg-slate-500/30 text-slate-200 border border-slate-300/30',
  L: 'bg-red-500/30 text-red-200 border border-red-300/30'
}

export const formResultLabel: Record<FormResult, string> = {
  W: 'Win',
  D: 'Draw',
  L: 'Loss'
}

