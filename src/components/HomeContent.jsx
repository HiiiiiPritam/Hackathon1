"use client"
import React from 'react'
import { Gwendolyn } from 'next/font/google'
import Link from 'next/link';
const gwendolyn = Gwendolyn({ weight: ['400', '700'], subsets: ["latin"] });

const HomeContent = () => {
    return (
        <>
            <div className='flex justify-center items-center flex-col gap-10'>
                <div className='flex justify-center items-center gap-4'>
                    <span className='text-5xl'>$</span>
                    <h1 className={gwendolyn.className} style={{ "fontWeight": "700", "fontSize": "5rem", "lineHeight": "1" }}>
                        BudgetBuddy
                    </h1>
                    <span className='text-5xl'>$</span>
                </div>
                <div className='text-center font-light w-[50%]'>
                    Take control of your finances with BudgetBuddy! Our user-friendly app helps students track expenses, save money, and manage budgets effortlessly. Achieve financial freedom and succeed in your academic journey.
                </div>
                <button className='flex justify-center items-center bg-slate-800 p-3 rounded-lg'><Link href={"/Dashboard"}>Get Started</Link></button>
            </div>
        </>
    )
}

export default HomeContent