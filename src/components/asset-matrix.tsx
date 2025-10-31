"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { marketDataService, MarketData, TRADING_SYMBOLS } from "@/lib/market-data"
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react"

// Client-only time display to avoid hydration mismatch
function TimeDisplay({ timestamp }: { timestamp: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-xs text-muted-foreground">--:--:--</span>;
  }

  return (
    <span className="text-xs text-muted-foreground">
      {timestamp.toLocaleTimeString()}
    </span>
  );
}

interface AssetRowProps {
  symbol: string
  price: number
  change?: number
  changePercent?: number
  state: 'BULLISH_BREAKOUT' | 'TRENDING_UP' | 'RANGING' | 'TRENDING_DOWN' | 'BEARISH_BREAKOUT'
  confirmation: number
  isLoading?: boolean
}

function AssetRow({ symbol, price, change, changePercent, state, confirmation, isLoading }: AssetRowProps) {
  const getStateColor = () => {
    switch (state) {
      case 'BULLISH_BREAKOUT':
      case 'TRENDING_UP':
        return 'bullish'
      case 'TRENDING_DOWN':
      case 'BEARISH_BREAKOUT':
        return 'bearish'
      case 'RANGING':
        return 'neutral'
      default:
        return 'secondary'
    }
  }

  const getStateLabel = () => {
    return state.replace(/_/g, ' ')
  }

  const isPositive = change && change > 0;

  return (
    <tr className="border-b border-border-slate hover:bg-card-navy/50 transition-all duration-200 animate-fade-in">
      <td className="py-3 px-4">
        <span className="font-medium text-text-primary">{symbol}</span>
      </td>
      <td className="py-3 px-4">
        {isLoading ? (
          <div className="skeleton h-4 w-16 rounded"></div>
        ) : (
          <span className="text-text-secondary font-mono">{price.toFixed(2)}</span>
        )}
      </td>
      <td className="py-3 px-4">
        {isLoading ? (
          <div className="skeleton h-4 w-12 rounded"></div>
        ) : (
          <div className="flex items-center gap-1">
            {changePercent !== undefined && (
              <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
            )}
          </div>
        )}
      </td>
      <td className="py-3 px-4">
        {isLoading ? (
          <div className="skeleton h-5 w-20 rounded-full"></div>
        ) : (
          <Badge variant={getStateColor()} className="transition-all duration-300 hover:scale-105">
            {getStateLabel()}
          </Badge>
        )}
      </td>
      <td className="py-3 px-4">
        {isLoading ? (
          <div className="flex gap-1">
            <div className="skeleton h-3 w-3 rounded-full"></div>
            <div className="skeleton h-3 w-3 rounded-full"></div>
            <div className="skeleton h-3 w-3 rounded-full"></div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-text-primary font-medium">{confirmation}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    i < confirmation
                      ? confirmation >= 2
                        ? 'bg-bullish-green animate-pulse'
                        : confirmation === 1
                        ? 'bg-warning-amber animate-pulse'
                        : 'bg-text-tertiary'
                      : 'bg-text-tertiary'
                  }`}
                  style={{
                    animationDelay: `${i * 200}ms`,
                    animationDuration: confirmation >= 2 ? '1.5s' : '2s'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </td>
    </tr>
  )
}

interface ScenarioStrengthProps {
  score: number
  confirming: number
  conflicting: number
}

function ScenarioStrength({ score, confirming, conflicting }: ScenarioStrengthProps) {
  const getScoreColor = () => {
    if (score >= 80) return 'bullish'
    if (score >= 60) return 'neutral'
    return 'bearish'
  }

  return (
    <div className="mt-4 p-3 rounded-lg bg-card-navy border border-border-slate">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-secondary">Scenario Strength</span>
        <Badge variant={getScoreColor()}>{score}%</Badge>
      </div>
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-bullish-green" />
          <span className="text-text-tertiary">Confirming: {confirming}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-bearish-red" />
          <span className="text-text-tertiary">Conflicting: {conflicting}</span>
        </div>
      </div>
    </div>
  )
}

interface AssetData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  state: 'BULLISH_BREAKOUT' | 'TRENDING_UP' | 'RANGING' | 'TRENDING_DOWN' | 'BEARISH_BREAKOUT';
  confirmation: number;
  isLoading?: boolean;
  lastUpdate?: Date;
}

export function AssetMatrix() {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Initialize with loading state
  useEffect(() => {
    const initialAssets = TRADING_SYMBOLS.futures.map(symbol => ({
      symbol,
      price: 0,
      change: 0,
      changePercent: 0,
      state: 'RANGING' as const,
      confirmation: 0,
      isLoading: true,
    }));
    setAssets(initialAssets);
    fetchMarketData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMarketData(true); // Silent refresh
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async (silent = false) => {
    if (!silent) setIsRefreshing(true);

    try {
      const symbols = TRADING_SYMBOLS.futures;
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols, assetType: 'futures' }),
      });

      const result = await response.json();

      if (result.success) {
        const updatedAssets = result.data.map((data: MarketData) => ({
          symbol: data.symbol,
          price: data.price,
          change: data.change,
          changePercent: data.changePercent,
          state: getAssetState(data.changePercent),
          confirmation: getConfirmationLevel(data.changePercent),
          isLoading: false,
          lastUpdate: new Date(),
        }));

        setAssets(updatedAssets);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      // Keep existing data on error
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  const getAssetState = (changePercent: number): AssetData['state'] => {
    if (changePercent > 0.5) return 'BULLISH_BREAKOUT';
    if (changePercent > 0.1) return 'TRENDING_UP';
    if (changePercent < -0.5) return 'BEARISH_BREAKOUT';
    if (changePercent < -0.1) return 'TRENDING_DOWN';
    return 'RANGING';
  };

  const getConfirmationLevel = (changePercent: number): number => {
    const absChange = Math.abs(changePercent);
    if (absChange > 1.0) return 3;
    if (absChange > 0.5) return 2;
    if (absChange > 0.1) return 1;
    return 0;
  };

  const totalConfirming = assets.filter(a => a.confirmation >= 2).length;
  const totalConflicting = assets.filter(a => a.confirmation === 1).length;
  const averageScore = assets.length > 0 ? Math.round(
    assets.reduce((sum, asset) => sum + (asset.confirmation * 33.33), 0) / assets.length
  ) : 0;

  return (
    <Card className="bg-white/5 border-white/10 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🔄 Cross-Asset Scenario Matrix
          </CardTitle>
          <div className="flex items-center gap-2">
            <TimeDisplay timestamp={lastRefresh} />
            <button
              onClick={() => fetchMarketData()}
              disabled={isRefreshing}
              className="p-1 rounded hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-text-tertiary border-b border-border-slate">
              <th className="text-left py-2 px-4 font-medium">Asset</th>
              <th className="text-left py-2 px-4 font-medium">Price</th>
              <th className="text-left py-2 px-4 font-medium">Change</th>
              <th className="text-left py-2 px-4 font-medium">State</th>
              <th className="text-left py-2 px-4 font-medium">Confirm</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <AssetRow
                key={asset.symbol}
                symbol={asset.symbol}
                price={asset.price}
                change={asset.change}
                changePercent={asset.changePercent}
                state={asset.state}
                confirmation={asset.confirmation}
                isLoading={asset.isLoading}
              />
            ))}
          </tbody>
        </table>

        <ScenarioStrength
          score={averageScore}
          confirming={totalConfirming}
          conflicting={totalConflicting}
        />
      </CardContent>
    </Card>
  );
}
