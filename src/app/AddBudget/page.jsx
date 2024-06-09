import { auth } from '@/auth'
import React from 'react'
import AddBudgetComp from '@/components/AddBudgetComponents/AddBudgetComp'
import NavigationBar from '@/components/Dashboards/DashNav';
import { redirect } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';


async function AddBudget() {
  let session = await auth()
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
    <div className='h-full flex min-h-dvh gap-4 bg-[#331D2C]'>
      <div className='w-screen flex p-5'>
    {user ?
    <>
    <NavigationBar/>
    <AddBudgetComp userEmail={user?.email} />
    </>: <></>}

      </div>
      
    </div>
    </>
  )
}

export default AddBudget