import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
