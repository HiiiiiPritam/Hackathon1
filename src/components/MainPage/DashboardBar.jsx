"use client";

import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BudgetComparison = ({ userEmail }) => {
  const [barData, setBarData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBar = await fetch(`/api/GetBudgetBarChart/${userEmail}`);
        const dataBar = await resBar.json();
        if (dataBar.success) {
          setBarData({
            labels: dataBar.monthlyExpenditures.map((item) => item.name),
            datasets: [
              {
                label: "Assigned",
                data: dataBar.monthlyExpenditures.map((item) => item.assigned),
                backgroundColor: "#36A2EB",
              },
              {
                label: "Spent",
                data: dataBar.monthlyExpenditures.map((item) => item.spent),
                backgroundColor: "#FF6384",
              },
            ],
          });
        } else {
          setError(dataBar.message);
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.log(err.message);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <div className="w-full max-w-[600px] h-[50vh] p-2 bg-[#331D2C] text-white flex flex-col justify-center items-center">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="w-full">
            <h2 className="text-center font-bold mb-4">Monthly Expenditure by Budget & Budgetwise Comparison (if you are not seeing anyting on pie then probably you have not spent monthly or reset )</h2>
          </div>
          <div className="w-full h-full p-2 bg-[#3F2E3E] rounded-xl">
            {barData.labels ? (
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Monthly Budget Comparison",
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetComparison;
