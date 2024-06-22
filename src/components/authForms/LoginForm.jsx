// "use client"

// import { doCredentialLogin } from "@/app/actions/authActions";
// import { useRouter } from 'next/navigation'
// import SocialLogin from "../socialLogin/SocialLogin";
// import React, { useState } from 'react'

// function LoginForm() {

//   let [error, setError]= useState("")
//     let router= useRouter();
//   async function handelFormSubmit(e){
//     e.preventDefault();
//     try {
//       const formData= new FormData(e.currentTarget);
//       const response= await doCredentialLogin(formData)
//       if(!!response.error){
//         setError(response.error.message)
//       }else{
//         router.push('/')
//       }

//     } catch (error) {
//       setError("Check your credentials")
//     }
//   }
//   return (
//     <>
//     {<h3 className="text-red-500">{error}</h3>}
//     <form onSubmit={handelFormSubmit}>
//     <label htmlFor="email">Email Address</label>
//     <input name='email' id='email' />
//     <br />
//     <label htmlFor="password">Password</label>
//     <input name='password' id='password' />
//     <br />
//     <button >Login</button>
//     </form>

//     <SocialLogin/>
//     </>
//   )
// }

// export default LoginForm

"use client";

import { doCredentialLogin } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import SocialLogin from "../socialLogin/SocialLogin";
import React, { useState } from "react";

function LoginForm() {
  let [error, setError] = useState("");
  let router = useRouter();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await doCredentialLogin(formData);
      if (response.error) {
        setError(response.error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Check your credentials");
    }
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-400 to-slate-300 overflow-hidden">
      <div className="bg-black flex flex-col flex-grow justify-center items-center shadow-lg rounded-lg p-8 h-[90vh] max-w-md w-full"></div>
      <div className="bg-white flex flex-col justify-center items-center shadow-lg rounded-lg p-8 h-[90vh] max-w-md min-w-[300px] w-full flex-shrink-0">
        <div className="flex flex-col justify-center items-center h-full mb-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {error && <h3 className="text-red-500 text-center mb-4">{error}</h3>}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-[50%] py-2 px-4 bg-slate-600 text-white font-semibold rounded-md shadow-md hover:bg-slate-700 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <hr className="mt-7 h-1 w-full bg-red-900" />
          <p className="mt-5">OR</p>
          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>
      </div>
      <div className="bg-black flex flex-col flex-grow justify-center items-center shadow-lg rounded-lg p-8 h-[90vh] max-w-md w-full"></div>
    </div>
  );
}

export default LoginForm;


