'use client';
import React, { useState } from 'react';

const ResetData = ({ budgetId }) => {
  const [message, setMessage] = useState('');

  const handleResetMonthly = async () => {
    try {
      const response = await fetch(`/api/UpdateBudget/${budgetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          monthlyAssigned: 0,
          monthlySpent: 0
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message || 'Monthly data reset successfully');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleResetWeekly = async () => {
    try {
      const response = await fetch(`/api/UpdateBudget/${budgetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          weeklyAssigned: 0,
          weeklySpent: 0
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message || 'Weekly data reset successfully');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  h-full  bg-[#331D2C] text-white">
      <div className="flex flex-col gap-4">
        <button
          onClick={handleResetMonthly}
          className="bg-[#A78295] text-white py-2 px-4 rounded-md hover:bg-opacity-70 transition-colors duration-300"
        >
          Reset Monthly Data
        </button>
        <button
          onClick={handleResetWeekly}
          className="bg-[#A78295] text-white py-2 px-4 rounded-md hover:bg-opacity-70 transition-colors duration-300"
        >
          Reset Weekly Data
        </button>
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </div>
  );
};

export default ResetData;
