const Stock = require('../models/Stock');

exports.getStocks = async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

exports.buyStock = async (req, res) => {
  const { symbol, quantity } = req.body;
  const stock = await Stock.findOne({ symbol });

  if (!stock) return res.status(404).json({ message: "Stock not found" });

  stock.quantity += parseInt(quantity);
  await stock.save();
  res.json({ message: "Stock bought successfully" });
};

exports.sellStock = async (req, res) => {
  const { symbol, quantity } = req.body;
  const stock = await Stock.findOne({ symbol });

  if (!stock || stock.quantity < quantity)
    return res.status(400).json({ message: "Not enough stock to sell" });

  stock.quantity -= parseInt(quantity);
  await stock.save();
  res.json({ message: "Stock sold successfully" });
};
