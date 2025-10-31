declare module 'yfinance' {
  export interface YFQuote {
    displayName?: string;
    shortName?: string;
    longName?: string;
    regularMarketPrice?: number;
    regularMarketChange?: number;
    regularMarketChangePercent?: number;
    regularMarketVolume?: number;
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
  }

  export function quote(symbol: string): Promise<YFQuote>;
}
