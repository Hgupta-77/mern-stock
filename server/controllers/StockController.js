const Stock = require('../models/Stock');

// GET /stocks
exports.getStocks = async (req, res) => {
  try {
    let stocks = await Stock.find();

    // If DB is empty, insert dummy data
    if (stocks.length === 0) {
      const dummyStocks = [
        { name: "Tata Motors", price: 820, symbol: "TATA", quantity: 100 },
        { name: "Infosys", price: 1510, symbol: "INFY", quantity: 200 },
        { name: "Reliance", price: 2730, symbol: "RELI", quantity: 150 }
      ];
      await Stock.insertMany(dummyStocks);
      stocks = await Stock.find(); // Re-fetch after insert
    }

    res.json(stocks);
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
