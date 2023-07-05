import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MaticCryptoChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/polygon/market_chart?vs_currency=usd&days=7&interval=daily')
      .then(response => response.json())
      .then(responseData => {
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
    <LineChart width={900} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  );
};

export default MaticCryptoChart;
