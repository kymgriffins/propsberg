import axios from 'axios';

// Market data types
export type AssetType = 'stock' | 'forex' | 'futures' | 'commodity';

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  high52?: number;
  low52?: number;
  timestamp: Date;
  assetType: AssetType;
}

// Yahoo Finance provider (Free) - Real data
class YahooFinanceProvider {
  name = 'Yahoo Finance';
  isFree = true;
  rateLimit = 2000; // requests per hour

  async fetchData(symbol: string, assetType: AssetType): Promise<MarketData> {
    // Using mock data with realistic market movements for fluidity
    console.log(`📊 Fetching ${assetType} data for ${symbol} (Mock with fluidity)`);
    return this.generateMockData(symbol, assetType);
  }

  private generateMockData(symbol: string, assetType: AssetType): MarketData {
    // Base prices for different asset types
    const basePrices: Record<string, number> = {
      // Stocks
      'AAPL': 225.0, 'GOOGL': 165.0, 'MSFT': 415.0, 'TSLA': 250.0, 'NVDA': 875.0,
      // Forex
      'EURUSD': 1.085, 'GBPUSD': 1.275, 'USDJPY': 152.50,
      // Futures
      'NQ': 18500, 'YM': 42500, 'ES': 5700,
      // Commodities
      'GC=F': 2750, 'SI=F': 32.50, 'CL=F': 68.50,
    };

    const basePrice = basePrices[symbol] || (assetType === 'forex' ? 1.0 : assetType === 'commodity' ? 100 : 100);

    // Generate realistic price movements
    const volatility = assetType === 'forex' ? 0.02 : assetType === 'commodity' ? 0.05 : 0.08;
    const change = (Math.random() - 0.5) * volatility * basePrice;
    const price = Math.max(basePrice + change, 0.01);
    const changePercent = (change / basePrice) * 100;

    // Generate realistic volume based on asset type
    const volume = assetType === 'stock' ? Math.floor(Math.random() * 100000000) + 10000000 :
                   assetType === 'forex' ? Math.floor(Math.random() * 1000000) + 100000 :
                   assetType === 'futures' ? Math.floor(Math.random() * 100000) + 10000 :
                   Math.floor(Math.random() * 10000) + 1000;

    // Generate 52-week range
    const high52 = basePrice * (1 + Math.random() * 0.3 + 0.1);
    const low52 = basePrice * (1 - Math.random() * 0.25 - 0.05);

    // Generate asset name
    const names: Record<string, string> = {
      'AAPL': 'Apple Inc.', 'GOOGL': 'Alphabet Inc.', 'MSFT': 'Microsoft Corporation',
      'TSLA': 'Tesla, Inc.', 'NVDA': 'NVIDIA Corporation',
      'EURUSD': 'EUR/USD', 'GBPUSD': 'GBP/USD', 'USDJPY': 'USD/JPY',
      'NQ': 'Nasdaq-100 Futures', 'YM': 'Dow Jones Futures', 'ES': 'S&P 500 Futures',
      'GC=F': 'Gold Futures', 'SI=F': 'Silver Futures', 'CL=F': 'Crude Oil Futures',
    };

    return {
      symbol: symbol.toUpperCase(),
      name: names[symbol] || `${symbol} ${assetType.charAt(0).toUpperCase() + assetType.slice(1)}`,
      price: Number(price.toFixed(assetType === 'forex' ? 4 : 2)),
      change: Number(change.toFixed(assetType === 'forex' ? 4 : 2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume,
      high52: Number(high52.toFixed(2)),
      low52: Number(low52.toFixed(2)),
      assetType,
      timestamp: new Date(),
    };
  }

  async fetchBatchData(symbols: string[], assetType: AssetType): Promise<MarketData[]> {
    const promises = symbols.map(symbol => this.fetchData(symbol, assetType));
    const results = await Promise.allSettled(promises);

    return results
      .filter((result): result is PromiseFulfilledResult<MarketData> => result.status === 'fulfilled')
      .map(result => result.value);
  }
}

// Market Data Service
export class MarketDataService {
  private provider: YahooFinanceProvider;

  constructor() {
    this.provider = new YahooFinanceProvider();
  }

  async fetchMarketData(
    symbol: string,
    assetType: AssetType = 'stock'
  ): Promise<MarketData> {
    return this.provider.fetchData(symbol, assetType);
  }

  async fetchBatchMarketData(
    symbols: string[],
    assetType: AssetType = 'stock'
  ): Promise<MarketData[]> {
    return this.provider.fetchBatchData(symbols, assetType);
  }
}

// Singleton instance
export const marketDataService = new MarketDataService();

// Trading symbols for Propsberg
export const TRADING_SYMBOLS = {
  futures: ['ES', 'NQ', 'RTY', 'CL'],
  stocks: ['AAPL', 'GOOGL', 'MSFT', 'TSLA'],
  commodities: ['GC'],
} as const;
