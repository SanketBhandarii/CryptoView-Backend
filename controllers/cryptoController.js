import axios from "axios";
import Crypto from "../models/crypto.js";

export const cryptoGetter = async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);
    await Crypto.deleteMany();
    const cryptoData = tickers.map((ticker) => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));
    await Crypto.insertMany(cryptoData);
    res.status(200).json(cryptoData);
  } catch (err) {
    console.error("Error fetching or storing data:", err);
    res
      .status(500)
      .json({ message: "Server error: Unable to fetch or save data" });
  }
};
