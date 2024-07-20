import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

function ExpensePieChart({ categoryData }) {
  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6F61',
          '#6B5B95',
          '#88B04B',
          '#F7CAC9',
          '#92A8D1',
          '#FFB347',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      datalabels: {
        color: '#fff',
        display: true,
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ₹${value.toFixed(2)}`;
        },
        anchor: 'end',
        align: 'end',
        offset: 10,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className='chart1' >
      <Pie data={data} options={options} />
    </div>
  );
}

export default ExpensePieChart;
