import axios from "axios";

const COINGECKO_API = process.env.COINGECKO_API;

export interface CoinData {
  priceUSD: number;
  marketCapUSD: number;
  change24h: number;
}

// const API_KEY: string = process.env.API_KEY as string;
export async function getCoinData(coinId: string): Promise<CoinData> {
  try {
    //  const headers = API_KEY
    //    ? {
    //        "x-cg-pro-api-key": API_KEY,
    //      }
    //    : {};
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    const data = response.data[coinId];
    return {
      priceUSD: data.usd,
      marketCapUSD: data.usd_market_cap,
      change24h: data.usd_24h_change,
    };
  } catch (error) {
    // logger.error(`Error fetching data for ${coinId}:`, error);
    throw error;
  }
}
