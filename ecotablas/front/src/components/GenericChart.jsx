// src/components/GenericChart.js
import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, LinearScale, CategoryScale);

const GenericChart = ({ type, data, options }) => {
  switch (type) {
    case 'pie':
      return <Pie data={data} options={options} />;
    case 'line':
      return <Line data={data} options={options} />;
    default:
      return null;
  }
};

export default GenericChart;
