// components/ExpenditurePieChart.js
'use client';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenditurePieChart = ({ budgetId }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/GetExpenditureByCategory/${budgetId}`);
            const result = await response.json();
            if (response.ok) {
                const categories = Object.keys(result.data);
                const amounts = Object.values(result.data);

                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Expenditure by Category',
                            data: amounts,
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#FF9F40',
                                '#FFCD56',
                                '#4BC0C0',
                                '#3FC0C0',
                                '#8FC0C0',
                                '#4FC0C0',
                                '#5CC0C0',
                            ],
                            hoverOffset: 4,
                        },
                    ],
                });
            }
        };

        fetchData();
    }, [budgetId]);

    return (
       
      <div className='w-full h-full py-5 text-white flex justify-center items-center'>
        <div className='w-full py-5 h-[80vh] bg-[#3F2E3E] rounded-xl'>
  
  {chartData.labels && chartData.labels.length > 0 ? (
    <Pie data={chartData} 
    options={{
      
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
          text: 'All categories comparison',
          font: {
            size: 20,
            weight: 'bold'
          }
        }
      },
      maintainAspectRatio: false, // Disable aspect ratio to allow custom height
              aspectRatio: 2, // Set the aspect ratio (width/height)
              height: 400, // Set the height of the chart
    }} 
     />
  ) : (
    <p className='text-center'>No data available(probably you dont have categories)</p>
  )}
  </div>
</div>
        
    );
};

export default ExpenditurePieChart;
