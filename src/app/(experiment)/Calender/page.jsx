import React from 'react'
import CreateAppointment from './CalenderComponent'
import { auth } from '@/auth'

async function MAkeAppointment() {

  let session= await auth();
  let user= session?.user;

  return (
    <div>
      <CreateAppointment email={user?.email}/>
    </div>
  )
}

export default MAkeAppointment