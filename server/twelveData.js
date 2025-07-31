// server/twelveData.js

const axios = require('axios');
require('dotenv').config();

const fetchStockPrice = async (symbol = 'AAPL') => {
  try {
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_API_KEY}`;
    const response = await axios.get(url);

    if (response.data && response.data.price) {
      console.log(`📈 ${symbol} Price: ₹${response.data.price}`);
      return response.data;
    } else {
      console.log("⚠️ No data received:", response.data);
      return { error: "No price data received." };
    }
  } catch (error) {
    console.error("❌ Error fetching stock price:", error.message);
    return { error: error.message };
  }
};

// Call this function directly for test
fetchStockPrice('RELIANCE.BSE'); // Example: Reliance stock from BSE

// Export for use in routes
module.exports = fetchStockPrice;
