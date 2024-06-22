import { auth } from '@/auth'
import React from 'react'

async function ProfilePage() {

  let session= await auth();
  let user= session?.user;
  let email=user?.email;
 
  ////a fetch request to get all users by his id
  ///stor it in users
  ///display data
  //when you click the get appointment call the api with all the data 
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage