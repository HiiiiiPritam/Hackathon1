'use client';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const MonthlyExpendituresChart = ({ email }) => {
  const [expenditureData, setExpenditureData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchExpenditureData = async () => {
      try {
        const response = await fetch(`/api/GetBudgetMonthlyExpenditures/${email}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch data");
        }

        const data = await response.json();
        setExpenditureData(data.data);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error("Fetching data error:", error);
      }
    };

    fetchExpenditureData();
  }, [email]);

  if (!expenditureData) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: expenditureData.map(budget => budget.name),
    datasets: [
      {
        data: expenditureData.map(budget => budget.monthlySpent),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className='w-full max-w-[600px] h-[50vh] p-2 bg-[#331D2C] text-white flex justify-center items-center'>

      <div className='w-full h-full p-2 bg-[#3F2E3E] rounded-xl'>
      
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>
      {message && <p className='text-red-500'>{message}</p>}
    </div>
  );
};

export default MonthlyExpendituresChart;
