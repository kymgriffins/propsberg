# 🚀 Propsberg - Professional Trading Intelligence Platform

**The Professional Trading Intelligence Platform**

Propsberg delivers a professional, intuitive, and powerful trading intelligence experience that feels like a Bloomberg terminal for scenario-based trading. Built with modern React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 **Scenario Builder**: Build "If This → Then That" trading scenarios
- 🔄 **Cross-Asset Matrix**: Real-time asset correlation and state tracking
- 📰 **Live Alert Stream**: Market intelligence with real-time updates
- 📊 **Market Regime Detection**: RISK_ON/OFF state monitoring
- 🎨 **Professional UI**: Bloomberg-style interface with dark theme
- 📱 **Responsive Design**: Desktop, tablet, and mobile layouts
- ⚡ **Real-time Updates**: Live market data and scenario monitoring

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd propsberg
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

##  Project Structure

```
propsberg/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main dashboard
│   │   └── globals.css     # Global styles & design system
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Card, Badge)
│   │   ├── header.tsx     # Header with branding & market status
│   │   ├── asset-matrix.tsx # Cross-asset scenario matrix
│   │   ├── scenario-builder.tsx # Scenario building interface
│   │   └── alert-stream.tsx # Live market intelligence
│   └── lib/               # Utilities and configurations
└── public/               # Static assets
```

## 🎯 Core Components

### Header Component
- **Branding**: Propsberg logo with gradient text
- **Market Status**: Live indicator, regime detection, readiness score
- **Asset Tickers**: Real-time ES, NQ, CL price feeds
- **Time & Actions**: Current time, refresh, settings

### Asset Matrix Component
- **Cross-Asset Analysis**: ES, NQ, RTY, CL, GC tracking
- **State Indicators**: BULLISH_BREAKOUT, TRENDING_UP, RANGING, etc.
- **Confirmation Levels**: 0-3 dot indicators
- **Scenario Strength**: Confidence scoring and correlation metrics

### Scenario Builder Component
- **Progress Tracking**: Visual progress bars with confidence scores
- **Condition Checklist**: Time, price, volume, liquidity conditions
- **Interactive States**: Met/unmet conditions with icons
- **Action Buttons**: Add conditions, save scenarios, set alerts

### Alert Stream Component
- **Live Intelligence**: Real-time market alerts
- **Urgency Levels**: High, medium, low priority alerts
- **Type Categories**: Compression, volume, conflict, breakout, liquidity
- **Control Actions**: Pause, filter, export functionality

## 🎨 Design System

### Color Palette
```css
--primary-blue: #2563eb      /* Brand blue */
--deep-navy: #0f172a         /* Main background */
--card-navy: #1e293b         /* Card backgrounds */
--border-slate: #334155      /* Borders */
--bullish-green: #10b981     /* Positive indicators */
--bearish-red: #ef4444       /* Negative indicators */
--warning-amber: #f59e0b     /* Caution states */
--info-cyan: #06b6d4         /* Information */
```

### Typography Scale
- **Inter Font Family**: Clean, professional typography
- **Text Sizes**: xs (12px) to 2xl (24px) scale
- **Text Hierarchy**: Primary, secondary, tertiary colors

### Layout Architecture
- **3-Column Grid**: Left (context), Center (analysis), Right (intelligence)
- **Responsive Breakpoints**: Desktop (1024px+), Tablet (768-1023px), Mobile (<768px)
- **Spacing System**: Consistent 4px-24px scale

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Custom design system
- **UI Components**: Radix UI primitives, Custom components
- **Icons**: Lucide React
- **Build**: Next.js with app router

## 📱 Responsive Behavior

### Desktop (1024px+)
- Full 3-column layout with complete information density
- Hover interactions and detailed tooltips
- Side-by-side scenario comparison

### Tablet (768px - 1023px)
- 2-column grid with stacked components
- Optimized spacing and component sizing
- Touch-friendly interactions

### Mobile (< 768px)
- Single column layout
- Carousel-style component navigation
- Essential information prioritization

## 🎯 User Experience Flows

### Scenario Building Flow
1. User clicks "New Scenario" button
2. Modal opens with scenario template selection
3. User selects scenario type (Breakout/Reversal/Range)
4. System suggests common conditions based on type
5. User customizes conditions using visual builder
6. System calculates confidence score in real-time
7. User saves scenario to personal playbook

### Alert Monitoring Flow
1. System continuously monitors market conditions
2. When scenario conditions are met → generates alert
3. Alert appears in stream with color-coded urgency
4. User can click alert for detailed analysis
5. System shows confidence score and recommended action
6. User can set reminder or add to watchlist

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and build
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎯 Professional trading intelligence, reimagined.**
