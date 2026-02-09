import { motion } from 'framer-motion'
import { ChevronRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="relative h-screen w-full overflow-hidden bg-united-black font-headline text-white selection:bg-united-red selection:text-white"
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="h-full w-full"
          style={{
            backgroundImage: "url('/landing-pinterest.jpg'), url('https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=2560&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-united-black via-united-black/80 to-united-red/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <div className="grid-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex h-full flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="max-w-4xl space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-united-red opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-united-red"></span>
            </span>
            <span className="text-xs uppercase tracking-widest text-white/80 font-body">
              Live Match Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] tracking-tighter">
            Theatre of <br />
            <span className="text-transparent stroke-text">Dreams</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-white/70 font-body leading-relaxed border-l-2 border-united-red pl-6">
            Advanced metrics, real-time probability models, and AI-driven predictions for Manchester United fixtures.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-united-red px-8 py-4 text-lg font-bold uppercase tracking-widest text-white transition-all hover:bg-red-700 hover:shadow-[0_0_40px_-10px_rgba(218,41,28,0.5)]"
              >
                <span className="relative z-10">Explore Analytics</span>
                <ChevronRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-0 translate-y-[100%] bg-gradient-to-t from-black/20 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 z-20 p-12 hidden lg:block">
        <Zap className="h-96 w-96 text-united-red/5 stroke-[0.5]" />
      </div>
    </motion.div>
  )
}
