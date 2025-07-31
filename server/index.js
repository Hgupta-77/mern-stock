const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('✅ Backend is running for Stock App!');
});
