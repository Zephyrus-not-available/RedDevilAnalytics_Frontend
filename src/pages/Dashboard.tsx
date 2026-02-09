import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { MatchHero } from '../components/MatchHero/MatchHero'
import { ProbabilityBar } from '../components/MatchHero/ProbabilityBar'
import { FormGuide } from '../components/MatchHero/FormGuide'
import { LeagueTable } from '../components/StatsTable/LeagueTable'
import { PlayerStatGrid } from '../components/StatsTable/PlayerStatGrid'
import { SkeletonBlock } from '../components/ui/Skeleton'
import { useMatchData } from '../context/MatchDataContext'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-72 rounded-3xl" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <SkeletonBlock className="h-44 rounded-2xl" />
        <SkeletonBlock className="h-44 rounded-2xl" />
      </div>
      <SkeletonBlock className="h-52 rounded-2xl" />
      <SkeletonBlock className="h-72 rounded-2xl" />
    </div>
  )
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10">
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
  const { data, isLoading, isError, refetch } = useMatchData()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (isError || !data) {
    return <DashboardError onRetry={refetch} />
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <MatchHero data={data} />
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={itemVariants}>
          <ProbabilityBar probabilities={data.probabilities} confidence={data.aiConfidence} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormGuide />
        </motion.div>
      </div>
      <motion.div variants={itemVariants}>
        <LeagueTable />
      </motion.div>
      <motion.div variants={itemVariants}>
        <PlayerStatGrid />
      </motion.div>
    </motion.div>
  )
}
