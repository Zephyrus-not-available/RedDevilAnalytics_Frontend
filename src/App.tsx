import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import { Navbar } from './components/ui/Navbar'
import { SideNav } from './components/ui/SideNav'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-united-black text-white flex">
      {/* Sidebar for Desktop */}
      <SideNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen relative">
        {/* Navbar for Mobile (hidden on desktop) */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        <main id="main" className="relative overflow-hidden w-full">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="grid-overlay" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
