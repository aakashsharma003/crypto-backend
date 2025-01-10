import { Request, Response } from "express";
import { calculatePriceDeviation, getLatestStats } from "../services/cryptoService";

export async function getStats(req: Request, res: Response): Promise<void> {
  try {
    const { coin } = req.query;

    if (!coin || typeof coin !== "string") {
      res.status(400).json({ error: "Coin parameter is required" });
      return;
    }

    const stats = await getLatestStats(coin);
    if (!stats) {
      res.status(404).json({ error: "No data found for the specified coin" });
      return;
    }

    res.json({
      price: stats.priceUSD,
      marketCap: stats.marketCapUSD,
      "24hChange": stats.change24h,
    });
  } catch (error) {
    // logger.error("Error in getStats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getDeviation(req: Request, res: Response): Promise<void> {
  try {
    const { coin } = req.query;

    if (!coin || typeof coin !== "string") {
      res.status(400).json({ error: "Coin parameter is required" });
      return;
    }

    const deviation = await calculatePriceDeviation(coin);
    res.json({ deviation: Number(deviation.toFixed(2)) });
  } catch (error) {
    // logger.error("Error in getDeviation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
