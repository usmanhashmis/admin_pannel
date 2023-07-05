import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CryptoChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30&interval=daily')
      .then(response => response.json())
      .then(responseData => {
        // Process the data as per your requirements
        const formattedData = responseData.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp),
          price: price.toFixed(2),
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  return (
    <LineChart width={900} height={400} data={data} >
      <CartesianGrid strokeDasharray="6 6" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  );
};

export default CryptoChart;
