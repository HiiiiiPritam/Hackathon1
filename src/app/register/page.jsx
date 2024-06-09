import RegistrationForm from '@/components/authForms/RegistrationForm'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'


function page() {
  return (
    <div>
            <NextTopLoader
                crawlSpeed={100}
                speed={200}
            />
      <RegistrationForm/>
    </div>
  )
}

export default page