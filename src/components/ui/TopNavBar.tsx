import {
  LayoutDashboard,
  TrendingUp,
  User,
  Users
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMatchData } from '../../context/MatchDataContext'

const navItems = [
  { id: 'match-center', label: 'Match Center', icon: LayoutDashboard },
  { id: 'squad-insights', label: 'Squad Insights', icon: Users },
  { id: 'league-outlook', label: 'League Outlook', icon: TrendingUp }
]

export function TopNavBar() {
  const { live, toggleLive } = useMatchData()
  const [activeTab, setActiveTab] = useState('match-center')
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      const offset = 140 // Height of sticky headers
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="sticky top-0 z-40 w-full flex flex-col transition-all duration-300">
      {/* Tier 1: Global Header */}
      <header
        className={`w-full border-b border-white/10 transition-colors duration-300 ${
          scrolled ? 'bg-united-black/90 backdrop-blur-md' : 'bg-united-black/60 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-united-red to-red-800 grid place-items-center drop-shadow-glow overflow-hidden flex-shrink-0">
              <a href="#main" className="sr-only-focusable">
                Skip to main
              </a>
              <picture>
                <source srcSet="/logo-512.webp 512w, /logo-256.webp 256w" type="image/webp" />
                <source srcSet="/logo-512.jpg 512w, /logo-256.jpg 256w" type="image/jpeg" />
                <img
                  src="/img.png"
                  alt="Red Devil Analytics"
                  className="h-full w-full object-contain transform transition-transform duration-200 ease-out hover:scale-105 focus:scale-105"
                />
              </picture>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 leading-tight">
                Red Devil
              </span>
              <span className="text-lg font-headline leading-none text-white tracking-wide">
                Analytics
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* System Status (Desktop) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-white/80">API System Online</span>
            </div>

            {/* Live Toggle */}
            <div className="flex items-center gap-3">
              <span className="hidden xs:inline-block text-[10px] uppercase tracking-wide text-white/60 font-medium">
                Live Data
              </span>
              <button
                onClick={toggleLive}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-united-red focus-visible:ring-offset-2 focus-visible:ring-offset-united-black ${
                  live ? 'bg-united-red' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    live ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* User Profile */}
            <button className="h-9 w-9 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition-colors">
              <User className="w-4 h-4 text-white/80" />
            </button>
          </div>
        </div>
      </header>

      {/* Tier 2: Category Nav */}
      <nav className="w-full bg-united-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center gap-2 px-4 py-3 min-w-max transition-colors ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-united-red' : ''}`} />
                  <span className="text-sm font-medium tracking-wide">{item.label}</span>

                  {/* Animated Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-united-red shadow-[0_0_10px_rgba(218,41,28,0.5)]"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
