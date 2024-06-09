import LoginForm from '@/components/authForms/LoginForm'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'


function Login() {
  return (
    <div>
            <NextTopLoader
                crawlSpeed={100}
                speed={200}
            />
      <LoginForm/>
    </div>
  )
}

export default Login