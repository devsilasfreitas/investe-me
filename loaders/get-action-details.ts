import { api } from "../lib/axios";

export interface ActionDetails {
  currency: string;
  marketCap: string;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: Date;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  symbol: string;
  priceEarnings: number;
  earningsPerShare: number;
  logourl: string;
}

export async function getActionDetails (stock: string): Promise<ActionDetails | null> {
  try {
    const response = await api.get(`/quote/${stock}`);
    return response.data.results[0];
  } catch (error) {
    console.error("Error fetching actions:", error);
    throw error;
  }
}