import { motion } from 'framer-motion'

export function ScanningLoader() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-united-black group">
      {/* Ghost Image Background */}
      <div
        className="absolute inset-0 opacity-20 grayscale brightness-50 bg-cover bg-center"
        style={{ backgroundImage: "url('/oldtrafford.jpg')" }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Scanning Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-united-red shadow-[0_0_20px_rgba(218,41,28,0.8)] z-10"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
          <p className="text-united-red font-headline uppercase tracking-widest text-sm mb-2 animate-pulse">
            System Initializing
          </p>
          <h2 className="text-3xl font-bold text-white mb-1">
            Analyze Match Data
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}

