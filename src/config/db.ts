import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/crypto-stats";
    await mongoose.connect(uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
