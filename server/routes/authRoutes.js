const express = require('express');
const router = express.Router();
const { getStocks, buyStock, sellStock } = require('../controllers/authController');

router.get('/stocks', getStocks);
router.post('/buy', buyStock);
router.post('/sell', sellStock);

module.exports = router;
