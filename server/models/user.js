const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model('Stock', stockSchema);
