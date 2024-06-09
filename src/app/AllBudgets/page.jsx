import { auth } from '@/auth'
import AllBudgetsPage from '@/components/AllBudgetsComp/LoadAllBudgets'
import NavigationBar from '@/components/Dashboards/DashNav';
import { redirect } from 'next/navigation';
import React from 'react'


async function AllBudgets() {
  let session= await auth();
  let user= session?.user;
  if(!user){
    redirect("/login")
  }
  return (
    <div className="flex w-full justify-between min-h-dvh h-full bg-[#331D2C] p-5">
    <NavigationBar />
    <div className="flex-1 justify-center p-4 overflow-y-auto">
      <h1 className='text-white text-2xl font-extrabold'>All Budgets</h1>
      <AllBudgetsPage email={user?.email} />
    </div>
  </div>
  )
}

export default AllBudgets