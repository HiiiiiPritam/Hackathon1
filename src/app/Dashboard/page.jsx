import { auth } from '@/auth'
import BudgetSpendingComparisonChart from '@/components/Dashboards/ABudgetBarComparison'
import ExpenditurePieChart from '@/components/Dashboards/ABudgetDAshboard'
import NavigationBar from '@/components/Dashboards/DashNav'
import BudgetComparison from '@/components/MainPage/DashboardBar'
import MonthlyExpendituresChart from '@/components/MainPage/DashboardMain'
import Navbar from '@/components/Navbar'
import { redirect } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'



async function Dashboard() {

  let session= await auth();
  let user= session?.user;
  if(!user){
    redirect("/login")
  }
  return (
    <>
          <NextTopLoader
                crawlSpeed={100}
                speed={200}
            />
    <div className="flex flex-wrap items-center justify-around w-full bg-[#331D2C] h-full min-h-dvh p-4">
      <NavigationBar />
      <div className="flex flex-col flex-wrap justify-around items-center w-full lg:w-[65vw] ">
        <BudgetComparison userEmail={user?.email} />
        <MonthlyExpendituresChart email={user?.email} />
      </div>
    </div>
    </>
  )
}

export default Dashboard