const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Stock = require("../models/Stock");

// GET /stocks
exports.getStocks = async (req, res) => {
  try {
    // Load static symbol list
    const filePath = path.join(__dirname, "../data/indian_stocks_list.json");
    const jsonStocks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Check DB for existing stocks
    let dbStocks = await Stock.find();

    // If DB empty, insert dummy quantity for all stocks
    if (dbStocks.length === 0) {
      const dummyWithQuantity = jsonStocks.map((stock) => ({
        name: stock.name,
        symbol: stock.symbol,
        quantity: Math.floor(Math.random() * 100) + 10 // random quantity
      }));
      await Stock.insertMany(dummyWithQuantity);
      dbStocks = await Stock.find();
    }

    // Fetch live prices using Twelve Data
    const promises = jsonStocks.map((stock) =>
      axios
        .get(`https://api.twelvedata.com/price?symbol=${stock.symbol}&apikey=${process.env.TWELVE_API_KEY}`)
        .then((res) => ({
          name: stock.name,
          symbol: stock.symbol,
          price: res.data.price || "N/A"
        }))
        .catch(() => ({
          name: stock.name,
          symbol: stock.symbol,
          price: "Error"
        }))
    );

    const livePrices = await Promise.all(promises);

    // Merge quantity from DB
    const merged = livePrices.map((priceObj) => {
      const match = dbStocks.find((s) => s.symbol === priceObj.symbol);
      return {
        ...priceObj,
        quantity: match ? match.quantity : 0
      };
    });

    res.json(merged);
  } catch (err) {
    console.error("Error fetching stocks:", err);
    res.status(500).json({ error: "Server error fetching stocks" });
  }
};

// POST /buy
exports.buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    if (!symbol || !quantity || isNaN(quantity)) {
      return res.status(400).json({ message: '❌ Invalid input' });
    }

    const stock = await Stock.findOne({ symbol });

    if (!stock) {
      return res.status(404).json({ message: '❌ Stock not found' });
    }

    stock.quantity += parseInt(quantity);
    await stock.save();

    res.json({ message: '✅ Stock bought successfully', stock });
  } catch (err) {
    console.error("Error buying stock:", err);
    res.status(500).json({ error: "Server error while buying" });
  }
};

// POST /sell
exports.sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    if (!symbol || !quantity || isNaN(quantity)) {
      return res.status(400).json({ message: '❌ Invalid input' });
    }

    const stock = await Stock.findOne({ symbol });

    if (!stock) {
      return res.status(404).json({ message: '❌ Stock not found' });
    }

    if (stock.quantity < quantity) {
      return res.status(400).json({ message: '❌ Not enough stock to sell' });
    }

    stock.quantity -= parseInt(quantity);
    await stock.save();

    res.json({ message: '✅ Stock sold successfully', stock });
  } catch (err) {
    console.error("Error selling stock:", err);
    res.status(500).json({ error: "Server error while selling" });
  }
};
