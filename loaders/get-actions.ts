import { api } from "../lib/axios";

export interface Action {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number;
  logo: string;
  sector: string;
  type: string;
}

export async function getActions(): Promise<Action[]> {
  try {
    const response = await api.get("/quote/list");
    return response.data.stocks;
  } catch (error) {
    console.error("Error fetching actions:", error);
    throw error;
  }
}