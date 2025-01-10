import mongoose, { Document, Schema } from "mongoose";

export interface ICryptoPrice extends Document {
  coin: string;
  priceUSD: number;
  marketCapUSD: number;
  change24h: number;
  timestamp: Date;
}

const CryptoPriceSchema = new Schema({
  coin: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  marketCapUSD: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

CryptoPriceSchema.index({ coin: 1, timestamp: -1 });

export default mongoose.model<ICryptoPrice>("CryptoPrice", CryptoPriceSchema);
