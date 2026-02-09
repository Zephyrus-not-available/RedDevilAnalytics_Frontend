import { SectionWrapper } from '../components/ui/SectionWrapper'
import { TopNavBar } from '../components/ui/TopNavBar'
import { MatchHero } from '../components/MatchHero/MatchHero'
import { ProbabilityBar } from '../components/MatchHero/ProbabilityBar'
import { FormGuide } from '../components/MatchHero/FormGuide'
import { LeagueTable } from '../components/StatsTable/LeagueTable'
import { PlayerStatGrid } from '../components/StatsTable/PlayerStatGrid'
import { useMatchData } from '../context/MatchDataContext'
import { Loader2 } from 'lucide-react'
import { ScanningLoader } from '../components/Loader/ScanningLoader'

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <ScanningLoader />
      {/*
      <SkeletonBlock className="h-72 rounded-3xl" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <SkeletonBlock className="h-44 rounded-2xl" />
        <SkeletonBlock className="h-44 rounded-2xl" />
      </div>
      <SkeletonBlock className="h-52 rounded-2xl" />
      <SkeletonBlock className="h-72 rounded-2xl" />
      */}
    </div>
  )
}

function ProcessingState() {
  return (
    <div className="glass-panel rounded-2xl p-10 border border-white/10 w-full max-w-full flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-united-red/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="w-12 h-12 text-united-red animate-spin relative z-10" />
      </div>
      <h3 className="text-2xl font-headline uppercase tracking-wide">
        AI Analysis in Progress
      </h3>
      <p className="text-white/60 max-w-md">
        Our neural network is currently simulating match outcomes based on real-time data. This usually takes a few seconds.
      </p>
    </div>
  )
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 w-full max-w-full">
      <p className="text-lg font-semibold">Prediction feed unavailable</p>
      <p className="text-sm text-white/70 mt-2">
        The analytics engine is still computing the match model. Try again in a moment.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 rounded-full bg-united-red text-sm font-semibold"
      >
        Retry prediction
      </button>
    </div>
  )
}

export default function Dashboard() {
  const { data, isLoading, isProcessing, isError, refetch } = useMatchData()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-united-black">
        <TopNavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-united-black">
        <TopNavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProcessingState />
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-united-black">
        <TopNavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardError onRetry={refetch} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-united-black text-white selection:bg-united-red selection:text-white">
      <TopNavBar />

      <main id="main" className="relative overflow-hidden w-full">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="grid-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 relative pb-24">

          {/* Match Center Section */}
          <div id="match-center" className="scroll-mt-40 space-y-8">
            <SectionWrapper>
              <MatchHero data={data} />
            </SectionWrapper>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <SectionWrapper delay={0.1} className="h-full">
                <ProbabilityBar probabilities={data.probabilities} confidence={data.aiConfidence} />
              </SectionWrapper>
              <SectionWrapper delay={0.2} className="h-full">
                <FormGuide />
              </SectionWrapper>
            </div>
          </div>

          {/* Squad Insights Section */}
          <div id="squad-insights" className="scroll-mt-40 space-y-6">
            <div className="flex items-center gap-3 mb-2 border-b border-white/10 pb-4">
              <h2 className="text-xl font-headline tracking-wide uppercase">Squad Insights</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-united-red/50 to-transparent" />
            </div>
            <SectionWrapper delay={0.3}>
              <PlayerStatGrid />
            </SectionWrapper>
          </div>

          {/* League Outlook Section */}
          <div id="league-outlook" className="scroll-mt-40 space-y-6">
            <div className="flex items-center gap-3 mb-2 border-b border-white/10 pb-4">
              <h2 className="text-xl font-headline tracking-wide uppercase">League Outlook</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-united-red/50 to-transparent" />
            </div>
            <SectionWrapper delay={0.4}>
              <LeagueTable />
            </SectionWrapper>
          </div>

        </div>
      </main>
    </div>
  )
}
