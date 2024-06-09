"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

      const response = await fetch('/api/AddUsers', {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#A78295] to-[#3F2E3E]">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 h-[80vh] max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 ">Register</h2>
        {error && <h3 className="text-red-500 text-center mb-4">{error}</h3>}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label htmlFor="name" className="block ">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 w-full text-white px-3 bg-[#61474f] py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A78295] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block ">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 w-full px-3 text-white bg-[#61474f]  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A78295] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block ">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 w-full px-3 text-white bg-[#61474f]  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A78295] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#3F2E3E] text-white font-semibold rounded-md shadow-md hover:bg-[#7c616f] transition duration-300"
          >
            Signup
          </button>
        </form>
        <br />
        <br />
      Already have an account?<Link href={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default RegistrationForm;
