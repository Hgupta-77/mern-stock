// File: src/App.js

import React, { useState } from "react";
import "./App.css";
import { FaArrowUp, FaArrowDown, FaUserCircle } from "react-icons/fa";

const stockList = [
  { symbol: "NIFTY 50", price: 22850.65, change: +125.35 },
  { symbol: "BANK NIFTY", price: 48780.15, change: -210.45 },
  { symbol: "RELIANCE", price: 2950.00, change: +32.15 },
  { symbol: "TCS", price: 3880.45, change: -18.65 },
  { symbol: "INFY", price: 1625.75, change: +7.45 },
  { symbol: "HDFC", price: 3100.50, change: +14.20 },
  { symbol: "ICICI", price: 950.75, change: -5.15 },
  { symbol: "SBI", price: 630.40, change: +12.30 },
  { symbol: "AXIS BANK", price: 1050.55, change: -8.10 },
  { symbol: "KOTAK BANK", price: 1805.60, change: +22.15 },
  { symbol: "ITC", price: 445.10, change: +5.05 },
  { symbol: "HUL", price: 2680.90, change: -15.70 },
  { symbol: "BAJAJ FINANCE", price: 7250.35, change: +120.45 },
  { symbol: "BAJAJ AUTO", price: 4980.50, change: -32.00 },
  { symbol: "LT", price: 3755.30, change: +55.25 },
  { symbol: "ADANI ENT", price: 3050.15, change: -14.10 },
  { symbol: "ADANI PORTS", price: 1280.60, change: +7.90 },
  { symbol: "MARUTI", price: 11050.80, change: -145.20 },
  { symbol: "M&M", price: 1805.40, change: +30.70 },
  { symbol: "TITAN", price: 3120.75, change: -28.60 },
  { symbol: "JSW STEEL", price: 875.65, change: +4.20 },
  { symbol: "ULTRACEMCO", price: 9650.40, change: -110.55 },
  { symbol: "ONGC", price: 265.80, change: +3.45 },
  { symbol: "COAL INDIA", price: 435.25, change: -2.15 },
  { symbol: "NTPC", price: 325.10, change: +6.30 },
  { symbol: "POWER GRID", price: 245.60, change: -1.80 },
  { symbol: "WIPRO", price: 545.40, change: +4.10 },
  { symbol: "TECH MAHINDRA", price: 1380.20, change: -7.65 },
  { symbol: "HCL TECH", price: 1510.50, change: +9.35 },
  { symbol: "BPCL", price: 520.70, change: -3.20 },
  { symbol: "IOC", price: 165.90, change: +1.45 },
  { symbol: "ASIAN PAINTS", price: 3050.10, change: -22.70 },
  { symbol: "BAJAJ FINSERV", price: 1770.85, change: +18.55 },
  { symbol: "INDUSIND BANK", price: 1555.75, change: -10.30 },
  { symbol: "CIPLA", price: 1290.45, change: +6.40 },
  { symbol: "DIVIS LAB", price: 3755.95, change: -24.60 },
  { symbol: "SUN PHARMA", price: 1225.65, change: +11.50 },
  { symbol: "NESTLE IND", price: 24550.75, change: -185.65 },
  { symbol: "TATA MOTORS", price: 1020.10, change: +19.80 },
  { symbol: "TATA STEEL", price: 165.40, change: -1.55 },
  { symbol: "GRASIM", price: 2045.30, change: +17.35 },
  { symbol: "HINDALCO", price: 635.45, change: -4.25 },
  { symbol: "BRITANNIA", price: 5055.25, change: +30.10 },
  { symbol: "EICHER MOTORS", price: 3880.90, change: -21.60 },
  { symbol: "HEROMOTOCO", price: 3885.50, change: +42.20 },
  { symbol: "SBILIFE", price: 1390.65, change: -9.30 },
  { symbol: "HDFCLIFE", price: 640.20, change: +3.85 },
  { symbol: "DR REDDY", price: 6245.75, change: -55.45 },
  { symbol: "APOLLO HOSP", price: 5250.80, change: +68.35 }
];


const StockCard = ({ symbol, price, change }) => {
  const isPositive = change >= 0;
  return (
    <div className={`stock-card ${isPositive ? "positive" : "negative"}`}>
      <h2>{symbol}</h2>
      <p>₹ {price.toFixed(2)}</p>
      <span>
        {isPositive ? <FaArrowUp /> : <FaArrowDown />} ₹ {Math.abs(change).toFixed(2)}
      </span>
    </div>
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const filteredStocks = stockList.filter((stock) =>
    stock.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>📈 Share Market</h1>
        <div className="profile-section">
          <input
            type="text"
            placeholder="Search stock..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="profile" onClick={() => setShowMenu(!showMenu)}>
            <FaUserCircle size={28} />
            <span>User</span>
            {showMenu && (
              <div className="dropdown">
                <p>👤 My Profile</p>
                <p>⚙️ Settings</p>
                <p>🚪 Logout</p>
              </div>
            )}
          </div>
        </div>
        <h2>Your Favourites here</h2>
      </header>

      <main>
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock, index) => <StockCard key={index} {...stock} />)
        ) : (
          <p className="no-result">No stocks found.</p>
        )}
      </main>

      <footer>
        <p>Harish Gupta |  UI Project</p>
      </footer>
    </div>
  );
}

export default App;
