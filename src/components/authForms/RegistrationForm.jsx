// "use client";

// import React from 'react';
// import { useRouter } from 'next/navigation';

// function RegistrationForm() {
//   const router = useRouter();

//   async function handleSubmit(event) {
//     event.preventDefault();
//     try {
//       const formData = new FormData(event.currentTarget);
//       const name = formData.get("name");
//       const email = formData.get("email");
//       const password = formData.get("password");


//       const response = await fetch('/api/register', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ name, email, password })
//       });
//       if (response.status === 201) {
//         alert("user cretaed successfully")
//         router.push('/login');
//       } else {
//         alert("Failed to create user")
//         console.error("Failed to create user", await response.text());
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   return (
//     <>
//       <form className='bg-black text-white' onSubmit={handleSubmit}>
//       <br/>
//         <label htmlFor="name">Name</label>
//         <input className='bg-blue-200' name='name' id='name' />
//         <br />
//         <br/>
//         <label htmlFor="email">Email Address</label>
//         <input className='bg-blue-200' name='email' id='email' />
//         <br />
//         <br/>
//         <label htmlFor="password">Password</label>
//         <input className='bg-blue-200' name='password' id='password' />
//         <br />
//         <br/>
//         <button className='bg-orange-500 rounded-md p-2' type='submit'>Signup</button>
//       </form>
//     </>
//   );
// }

// export default RegistrationForm;


"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SocialLogin from "../socialLogin/SocialLogin"; // Adjust the import path as necessary\


function RegistrationForm() {
  const router = useRouter();
  let [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      if (response.status === 201) {
        alert("User created successfully");
        router.push('/login');
      } else {
        console.log(error);
        alert("Failed to create user");
        console.error("Failed to create user", await response.text());
      }
    } catch (error) {
      setError(error)
      console.error("Error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-400 to-slate-300">
      <div className="bg-black flex flex-col flex-grow justify-center items-center shadow-lg rounded-lg p-8 h-[90vh] max-w-md w-full"></div>
      <div className="bg-white flex flex-col justify-center items-center shadow-lg rounded-lg p-8 h-[90vh] max-w-md min-w-[300px] w-full flex-shrink-0">
        <div className="flex flex-col justify-center items-center h-full mb-6">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          {error && <h3 className="text-red-500 text-center mb-4">{error}</h3>}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
            <button
              type="submit"
              className="w-[50%] py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Signup
            </button>
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

export default RegistrationForm;
