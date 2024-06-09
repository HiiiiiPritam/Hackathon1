'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BudgetSpendingComparisonChart = ({ budgetId }) => {

  const [spendingData, setSpendingData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSpendingData = async () => {
      const response = await fetch(`/api/GetBudgetComparison/${budgetId}`);
      const data = await response.json();

      if (response.ok) {
        setSpendingData(data.data);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    };

    fetchSpendingData();
  }, [budgetId]);

  if (!spendingData) {
    return <div>Loading...</div>;
  }

  const { assignedAmount, actualSpent } = spendingData;

  const data = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [
      {
        label: 'Assigned Amount',
        data: [assignedAmount.daily, assignedAmount.weekly, assignedAmount.monthly],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
      {
        label: 'Actual Spent',
        data: [actualSpent.daily, actualSpent.weekly, actualSpent.monthly],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full h-full py-5 bg-[#331D2C] text-white flex justify-center items-center'>
      <div className='w-full h-[80vh] p-5 bg-[#3F2E3E] rounded-xl'>
        <Bar data={data} options={{
          ...options,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 16
                }
              }
            },
            title: {
              display: true,
              text: 'Expectation v/s reality',
              font: {
                size: 20,
                weight: 'bold'
              }
            }
          },
          maintainAspectRatio: false, // Disable aspect ratio to allow custom height
                  aspectRatio: 2, // Set the aspect ratio (width/height)
                  height: 400, // Set the height of the chart
        }} />
      </div>
    </div>
  );
};

export default BudgetSpendingComparisonChart;
