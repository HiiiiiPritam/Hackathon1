import { auth } from '@/auth';
import AddExpenseComponent from '@/components/AddExpenseCOmp/AddExpenseComp'
import BackToAllBudgets from '@/components/utility/BackToAllBudgets';
import { redirect } from 'next/navigation';
import React from 'react'


async function Expense({params}) {
  let id= params.id
  let session= await auth();
  let user= session?.user;
  if(!user){
    redirect("/login")
  }

  return (
    <div>
      <BackToAllBudgets/>
      <AddExpenseComponent id={id}/>
    </div>
  )
}

export default Expense