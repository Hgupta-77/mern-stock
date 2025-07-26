const express = require('express');
const router = express.Router();
const { getStocks, buyStock, sellStock } = require('../controllers/StockController');

// All stock-related routes
router.get('/stocks', getStocks);
router.post('/buy', buyStock);
router.post('/sell', sellStock);

module.exports = router;
