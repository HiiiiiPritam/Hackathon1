"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

function BackToAllBudgets() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/AllBudgets');
  };

  return (
    <span className='absolute right-0 '>
      <button onClick={handleRedirect} className='px-3 py-1 rounded-xl bg-[#A78295] text-white'>
        Back to Budgets
      </button>
    </span>
  );
}

export default BackToAllBudgets;
