# Red Devil Analytics - Frontend 🔴😈

A high-performance, visually stunning web dashboard providing data-driven insights and AI predictions for Manchester United fixtures.

![Dashboard Preview](public/projectpreview.png) 

## 🚀 Overview

Red Devil Analytics Frontend is a modern React-based dashboard designed for football enthusiasts and data analysts. It translates complex match data into intuitive visualizations, focusing on "Manchester United" performance metrics, AI-generated score predictions, and probability distributions.

This frontend is designed to work with the **[RedDevilAnalytics_Backend](https://github.com/Zephyrus-not-available/RedDevilAnalytics_Backend)** API service.

## ✨ Key Features

- **AI Score Prediction:** Real-time projected scores with confidence intervals (e.g., High/Medium/Low).
- **Match Insights:** Detailed breakdown of Attack Power (xG) and Defensive Strength (Clean Sheet probability).
- **Form Analysis:** Visual representation of recent match results (W/D/L).
- **Live Data Toggle:** Switch between historical data and live match updates.
- **Dynamic Probability Bar:** Visual win/draw/loss percentage breakdown.
- **Dark Mode UI:** Sleek, "Red Devil" themed aesthetic for high readability.

## 🛠️ Tech Stack

- **Frontend:** React 19 / Vite 7
- **Styling:** Tailwind CSS 3 (for modern, responsive layouts)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Data Fetching:** Axios / TanStack Query
- **Type Safety:** TypeScript 5

## 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zephyrus-not-available/RedDevilAnalytics_Frontend.git
   cd RedDevilAnalytics_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and configure:
   - `VITE_API_BASE_URL`: URL of your RedDevilAnalytics_Backend instance
   - `VITE_USE_MOCK_DATA`: Set to `false` to use real backend data

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔌 Backend Integration

This frontend connects to the **RedDevilAnalytics_Backend** for real-time match predictions and analytics.

### API Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/predictions/next-fixture` | GET | Get AI prediction for next match |
| `/api/health` | GET | Check backend health status |

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend API base URL |
| `VITE_USE_MOCK_DATA` | `true` | Enable/disable mock data mode |

### Connecting to Backend

1. **Start the backend server:**
   ```bash
   # In RedDevilAnalytics_Backend directory
   ./gradlew bootRun
   # or
   java -jar build/libs/RedDevilAnalytics_Backend.jar
   ```

2. **Configure frontend:**
   ```bash
   # .env.local
   VITE_API_BASE_URL=http://localhost:8080
   VITE_USE_MOCK_DATA=false
   ```

3. **Start frontend:**
   ```bash
   npm run dev
   ```

### Development Mode (Mock Data)

For development without the backend, the frontend includes mock data:
```bash
# .env.local
VITE_USE_MOCK_DATA=true
```

## 📦 Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 🧪 Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Loader/       # Loading animations
│   ├── MatchHero/    # Match prediction display
│   ├── StatsTable/   # Statistics tables
│   └── ui/           # Base UI components
├── context/          # React context providers
├── data/             # Mock data for development
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API service layer
└── types/            # TypeScript type definitions
```

## 🎨 Theming

The app uses a custom "Red Devil" dark theme with:
- Primary: `#DA291C` (United Red)
- Background: `#050505` (United Black)
- Accent: `#FBE122` (United Gold)

## 📄 License

This project is private and proprietary.
