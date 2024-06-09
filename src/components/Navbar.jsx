import React from 'react'
import Link from 'next/link'
import { Gwendolyn } from 'next/font/google'

const gwendolyn = Gwendolyn({ weight: ['400', '700'], subsets: ["latin"] });
const Navbar = () => {
    return (
        <div>
            <div className="relative top-10 flex items-center justify-center z-50">
                <nav className="flex fixed h-14 w-11/12 items-center justify-evenly rounded-2xl bg-slate-800 opacity-95">
                    <div className={gwendolyn.className} style={{"cursor": "pointer", "fontWeight": "700", "fontSize": "1.875rem", "lineHeight": "2.25rem", "width": "50%", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>BudgetBuddy</div>
                    <div className="flex w-[50%] items-center justify-center gap-10">
                        <Link className="text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" href="/register">Register</Link>
                        <Link className="text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" href="/login">Login</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar