import { auth } from '@/auth';
import UploadImage from '@/components/AddUpdateProfile/AddOrUpdatePP';
import { redirect } from 'next/navigation';
import React from 'react'


async function ProfilePage({params}) {
  let email= params.email;
  email= email.replace("%40","@")
//   let session= await auth();
// let user= session?.user;
//   if(!user){
//     redirect("/")
//   }
//   ////a fetch request to get the user by his id
  
  return (
    <>
    <div>ProfilePage</div>
    <h1>{email}</h1>
    
    </>
  )
}

export default ProfilePage