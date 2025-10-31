import { NextRequest, NextResponse } from "next/server";
import { marketDataService, AssetType } from "@/lib/market-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");
    const assetType = (searchParams.get("assetType") || "stock") as AssetType;

    if (!symbol) {
      return NextResponse.json(
        { error: "Symbol parameter is required" },
        { status: 400 }
      );
    }

    console.log(`🌐 API Request: Fetching ${assetType} data for ${symbol}`);

    // Fetch market data using the service
    const marketData = await marketDataService.fetchMarketData(symbol, assetType);

    return NextResponse.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Market data API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// Batch market data endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbols, assetType = "stock" } = body;

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json(
        { error: "Symbols array is required" },
        { status: 400 }
      );
    }

    console.log(`🌐 API Request: Batch fetching ${assetType} data for ${symbols.length} symbols`);

    // Fetch batch market data
    const marketData = await marketDataService.fetchBatchMarketData(symbols, assetType as AssetType);

    return NextResponse.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Batch market data API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
