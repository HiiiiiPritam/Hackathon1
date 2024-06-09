import { auth } from '@/auth';
import CommunityGetComp from '@/components/CommunityComps/CommunityPage'
import NavigationBar from '@/components/Dashboards/DashNav'
import { redirect } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import React from 'react'



async function CommunityPage() {

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
    <div className='flex bg-[#331D2C] bg- w-screen p-5 gap -2'>
      <NavigationBar/>
      <CommunityGetComp/>
    </div>
    </>
  )
}

export default CommunityPage