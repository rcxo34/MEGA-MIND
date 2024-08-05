// src/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {

  const data = {
    labels: [' 1', ' 1',' 1',' 1',' 1',' 1',' 1',' 1',' 1',' 1', ' 1',' 1',' 1',' 1',' 1',' 1',' 1',' 1'],
    datasets: [
      {
        label: 'My First dataset',
        data: [ 13, 17, 21, 19, 13, 14, 16, 18, 9, 7,11, 8, 13, 16, 18, 14, 13, 16, 21],
        fill: false,
        backgroundColor: '252525',
        borderColor: '#191919',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart Example',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2, // Set the interval between ticks to 2
          max: 24, // Set the maximum value of the y-axis
        }, 
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
