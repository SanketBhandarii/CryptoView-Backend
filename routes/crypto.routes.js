import express from "express";
import axios from "axios";
import Crypto from "../models/crypto.js";
 // Adjust path as needed

const router = express.Router();

// Single route to fetch from API, store in DB, and return JSON
router.get("/cryptos", async (req, res) => {
  try {
    // Fetch data from WazirX API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10); // Top 10 cryptos

    // Clear existing data from MongoDB (optional)
    await Crypto.deleteMany();

    // Prepare data for MongoDB
    const cryptoData = tickers.map((ticker) => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));

    // Insert into MongoDB
    await Crypto.insertMany(cryptoData);

    // Return the data as a JSON response
    res.status(200).json(cryptoData);
  } catch (err) {
    console.error("Error fetching or storing data:", err);
    res
      .status(500)
      .json({ message: "Server error: Unable to fetch or save data" });
  }
});

export default router;
