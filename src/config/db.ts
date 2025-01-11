import mongoose from "mongoose";
// console.log(process);
export async function connectDB(): Promise<void> {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/crypto-stats";
    await mongoose.connect(uri);
    // console.log("Connected to MongoDB");
    console.log("Connected to MongoDB instance");
  } catch (error) {
    // logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
