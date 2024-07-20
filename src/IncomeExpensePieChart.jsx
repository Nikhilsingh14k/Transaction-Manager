import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

function IncomeExpensePieChart({ totalIncome, totalExpense }) {
  const data = {
    labels: ['Total Income', 'Total Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
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
    <div className='chart1'>
      <Pie data={data} options={options} />
    </div>
  );
}

export default IncomeExpensePieChart;
