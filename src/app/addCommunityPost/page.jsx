import { auth } from '@/auth'
import AddBudgetComp from '@/components/AddBudgetComponents/AddBudgetComp'
import AddCommunityPostPage from '@/components/CommunityComps/CreateCommunityPage'
import NavigationBar from '@/components/Dashboards/DashNav';
import { redirect } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import React from 'react'



async function AddCommunityPage() {

  let session = await auth();
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
    <div className='flex bg-[#331D2C] text-white bg- w-screen p-5 gap -2'>
      <NavigationBar/>
      <AddCommunityPostPage email={user?.email}/>
    </div>
    </>
  )
}

export default AddCommunityPage