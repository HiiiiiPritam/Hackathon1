'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const AllBudgetsPage = ({ email }) => {
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch(`/api/GetAllBudgets?email=${email}`);
        const data = await response.json();
        if (data.success) {
          setBudgets(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching budgets.');
      }
    };

    fetchBudgets();
  }, [email]);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 w-full lg:w-[75%]">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        budgets.map(budget => (
          <Link key={budget._id} href={`/AllBudgets/${budget._id}`}>
            <div className="bg-[#453344] p-4 rounded-lg shadow-md w-full sm:w-64">
              <h2 className="text-white text-lg font-bold mb-2">{budget.name}</h2>
              <p className="text-gray-300">{`Assigned: ${budget.assignedAmount.monthly}`}</p>
              <p className="text-gray-300">{`Spent: ${budget.actualSpent.monthly}`}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default AllBudgetsPage;
