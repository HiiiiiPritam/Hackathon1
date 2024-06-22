import { auth } from '@/auth'
import MarkedCalendar from '@/components/CalendarComponents/MarkedCalendar';
import React from 'react'

async function MarkedAppointments() {
  let session = await auth();
  let user= session.user;
  return (
    <div>
      <MarkedCalendar email={user?.email}/>
    </div>
  )
}

export default MarkedAppointments