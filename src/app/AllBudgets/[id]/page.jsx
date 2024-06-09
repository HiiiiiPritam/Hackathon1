import React from 'react';
import Link from 'next/link';
import BudgetSpendingComparisonChart from '@/components/Dashboards/ABudgetBarComparison';
import ExpenditurePieChart from '@/components/Dashboards/ABudgetDAshboard';
import UpdateBudgetComponent from '@/components/AddBudgetComponents/UpdateBudgetComp';
import ResetData from '@/components/MainPage/ResetData';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import BackToAllBudgets from '@/components/utility/BackToAllBudgets';


const BudgetDetailPage =async  ({params}) => {
  let id= params.id
  // Get the budget ID from the router query
  let session= await auth();
  let user= session?.user;
  if(!user){
    redirect("/login")
  }

  return (
    <div className='w-dvw h-full bg-[#331D2C]'>
    <BackToAllBudgets/>
    <div className="container text-white  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Budget Details</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 mb-8">
          <BudgetSpendingComparisonChart budgetId={id}/>
        </div>
        <div className="w-full md:w-1/2 mb-8">
        <ExpenditurePieChart budgetId={id} />
        </div>
      </div>

      <div className="mb-8">

        <UpdateBudgetComponent budgetId={id} />
      </div>
      <p>New month / Week ?</p>
      <div className=" flex gap-4">
        
      <ResetData budgetId={id} />
        <Link className="bg-[#917081] hover:bg-[#856676] transition-colors h-full duration-300 text-white font-bold py-2 px-4 rounded" href={`/AllBudgets/${id}/expense`}>
          
            Add Expense
          
        </Link>
      </div>
    </div>
    </div>
  );
};

export default BudgetDetailPage;
