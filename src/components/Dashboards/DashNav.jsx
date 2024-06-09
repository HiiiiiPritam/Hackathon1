"use client"

import { doSocialLogout } from "@/app/actions/authActions";
import Link from "next/link";
import React from "react";

function NavigationBar() {

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
           
            const response = await doSocialLogout(formData);
            if (response.error) {
              setError(response.error.message);
            } else {
              router.push("/");
            }
        } catch (error) {
          console.error("Logout failed:", error);
          // Handle logout failure, display error message or handle as needed
        }
      };
  return (
    <div className="hidden lg:flex flex-col h-[95vh] w-[20vw] rounded-xl bg-[#3F2E3E] p-4">
      <div className="flex-grow flex flex-col gap-4 w-full">
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-[#856777] cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/vuiggmtc.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href="/AllBudgets">All Budgets</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-[#856777] cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href="/AddBudget">Add Budget</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-[#856777] cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href="/addCommunityPost">Add Post</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-[#856777] cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href="/Dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col gap-4 w-full">
        <hr className="h-1 bg-amber-800" />
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-[#856777] cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href="/FinancialTips">Finance Tips</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-[#856777] cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/lecprnjb.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href="/community">Communities</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-[#A78295] text-white hover:bg-slate-600 cursor-pointer">
          <lord-icon
            src="https://cdn.lordicon.com/lecprnjb.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <form onSubmit={handleLogout} >
          <button >Logout</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
