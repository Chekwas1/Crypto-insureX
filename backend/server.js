const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Market data route
app.get('/api/market-data', async (req, res) => {
  try {
    const marketData = await fetchMarketDataFromCoinAPI();
    res.json(marketData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function fetchMarketDataFromCoinAPI() {
  // Fetch and return market data from CoinAPI
}
