import { auth } from '@/auth';
import UploadImage from '@/components/AddUpdateProfile/AddOrUpdatePP'
import { redirect } from 'next/navigation';
import React from 'react'

async function MyProfile() {

  let session= await auth();
  let user= session?.user;

  return (
    <div>
      <UploadImage email={user?.email}/>
    </div>
  )
}

export default MyProfile