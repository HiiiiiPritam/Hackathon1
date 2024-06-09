import { auth } from '@/auth';
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'


async function GuidePage() {
  let session= await auth();
  let user= session?.user;
  if(!user){
    redirect("/login")
  }

  return (
    <div className="p-8 bg-[#3f2437] text-white">
      <h1 className="text-3xl font-bold mb-6">Quick Guide to Using Our Website</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. Dashboard Page</h2>
        <p>View your budget wise expenses and compare your financial goals with actual spending.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">2. Add Budget</h2>
        <p>Add a new budget to your account.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">3. All Budgets</h2>
        <p>View all the budgets you have created.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">4. Budget Details</h2>
        <p>Click on any budget to see detailed graphical category-wise distribution of expenses. Modify budget settings.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">5. Modify the Budget</h2>
        <p>On the same page as in point no. 4 you can modify your budget</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">6.Reset Monthly/Weekly Goals</h2>
        <p>In case of new Month/Week or you want to set budget goals again you ca doo it in the same page</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">7. Add Expense</h2>
        <p>Add a new expense.This is also present in the same page as above. Option to add to daily expenses under a specific budget will add that expense to your daily expense or else it will reset your daily expense under that budget</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">8. Community Page</h2>
        <p>Share financial tips and suggestions with the community.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">9. Financial Advice for Students</h2>
        <p>Get financial advice tailored for students.</p>
      </div>
      <div  className="mb-8">
        <Link className='text-2xl font-extrabold text-slate-500' href={"/Dashboard"}>Read everything? Great.... Now lets begin
        <br />
        <lord-icon
    src="https://cdn.lordicon.com/vduvxizq.json"
    trigger="hover"
    style={{"width":"50px","height":"50px","background":"white", "borderRadius": "10px" }}>
</lord-icon>
        </Link>
      </div>
    </div>
  )
}

export default GuidePage