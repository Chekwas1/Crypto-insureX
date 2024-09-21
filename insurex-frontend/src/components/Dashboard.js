import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio';
import Insurance from './Insurance'; // Importing Insurance component
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch market data (for example, Bitcoin to USD rates)
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/market-data');
        setMarketData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="user-section">
          <h2>Welcome, {user.displayName}</h2>
        </div>
      </header>

      <div className="dashboard-section market-data">
        <h3>Market Data Overview</h3>
        {loading ? (
          <p>Loading market data...</p>
        ) : (
          <p>Bitcoin to USD: {marketData.bitcoin ? marketData.bitcoin.toUSD : 'N/A'}</p>
        )}
      </div>

      <div className="portfolio-section">
        <Portfolio />
      </div>

      <div className="insurance-section">
        <Insurance /> {/* Added the Insurance component */}
      </div>
    </div>
  );
};

export default Dashboard;
