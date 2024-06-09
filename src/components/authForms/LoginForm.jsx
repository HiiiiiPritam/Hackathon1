"use client";

import { doCredentialLogin } from "@/app/actions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
        router.push("/guidePage");
      }
    } catch (error) {
      setError("Check your credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#A78295] to-[#3F2E3E] overflow-hidden">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 h-[80vh] max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#3F2E3E]">Login</h2>
        {error && <h3 className="text-red-500 text-center mb-4">{error}</h3>}
        <form onSubmit={handleFormSubmit} className="space-y-6 w-full">
          <div>
            <label htmlFor="email" className="block text-[#3F2E3E]">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1  bg-[#61474f]  text-white  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A78295] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#3F2E3E]">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 w-full px-3 text-white  bg-[#61474f]   py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A78295] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#3F2E3E] text-white font-semibold rounded-md shadow-md hover:bg-[#A78295] transition duration-300"
          >
            Login
          </button>
        </form>
        <hr className="mt-7 h-1 w-full bg-[#A78295]" />
        Don't have an account?<Link href={"/register"}>Register</Link>
      </div>
    </div>
  );
}

export default LoginForm;
