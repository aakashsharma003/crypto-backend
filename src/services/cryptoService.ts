
import cryptoPrice, { ICryptoPrice } from "../model/cryptoPrice";
import { getCoinData } from "./coinGeckoService";

const SUPPORTED_COINS = ["bitcoin", "matic-network", "ethereum"];

export async function updateCryptoPrices(): Promise<void> {
  try {
    for (const coin of SUPPORTED_COINS) {
      const data = await getCoinData(coin);
      // console.log("data aya",data);
      await cryptoPrice.create({
        coin,
        priceUSD: data.priceUSD,
        marketCapUSD: data.marketCapUSD,
        change24h: data.change24h,
      });
    //   console.log(`Updated price data for ${coin}`);
    }
  } catch (error) {
    // logger.error("Error updating crypto prices:", error);
    throw error;
  }
}

export async function getLatestStats(
  coin: string
): Promise<ICryptoPrice | null> {
  return cryptoPrice.findOne({ coin }).sort({ timestamp: -1 });
}



export async function calculatePriceDeviation(coin: string): Promise<number> {
  const prices = await cryptoPrice.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100)
    .select("priceUSD");

  if (prices.length === 0) {
    return 0;
  }

  const priceValues = prices.map((p) => p.priceUSD);
  const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
  const squaredDiffs = priceValues.map((price) => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b) / priceValues.length;

  return Math.sqrt(variance);
}
