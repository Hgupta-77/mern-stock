const express = require('express');
const router = express.Router();
const { getStocks, buyStock, sellStock } = require('../controllers/StockController');
const fetchStockPrice = require('../twelveData'); // <-- Import kara API wala function

// All stock-related routes
router.get('/stocks', getStocks);
router.post('/buy', buyStock);
router.post('/sell', sellStock);

// ✅ New route to get live stock price from Twelve Data
router.get('/live/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const data = await fetchStockPrice(symbol);

    if (data.error) {
      return res.status(400).json({ success: false, message: data.error });
    }

    res.json({
      success: true,
      symbol: symbol,
      price: data.price
    });
  } catch (error) {
    console.error('Live stock price error:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
