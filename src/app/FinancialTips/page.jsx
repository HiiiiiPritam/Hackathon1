import { auth } from '@/auth';
import FinancialTipsComp from '@/components/CommunityComps/FinalcialTips'
import NavigationBar from '@/components/Dashboards/DashNav'
import { redirect } from 'next/navigation';
import React from 'react'


async function CommunityTips() {
  let session= await auth();
  let user= session?.user;
  if(!user){
    redirect("/login")
  }
  return (
    <div className='w-full h-screen p-8 bg-[#331D2C] text-white flex justify-center items-center gap-4'>
    <NavigationBar />
    <FinancialTipsComp />
</div>
  )
}

export default CommunityTips