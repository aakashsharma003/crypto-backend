import "dotenv/config";
import express from "express";
import cron from "node-cron";
import router from "./routes/cryptoRoutes";
import { updateCryptoPrices } from "./services/cryptoService";
import { connectDB } from "./config/db";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1",router);

// Schedule background job to run every 2 hours
cron.schedule("0 */2 * * *", async () => {
  try {
    await updateCryptoPrices();
    console.log("Successfully updated crypto prices");
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

async function startServer(): Promise<void> {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    // console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
