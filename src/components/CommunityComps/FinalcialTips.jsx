import Link from 'next/link'
import React from 'react'

const FinancialTipsComp = () => {
    return (
        <div className='w-[80vw] h-[90vh] bg-[#3F2E3E] rounded-xl p-5 flex flex-col gap-5'>
            <h1 className='text-3xl underline text-center text-white mb-4'>Some Financial Tips to Help Students</h1>
            <div className='h-[70%] flex justify-center items-center gap-4 overflow-y-auto custom-scrollbar'>
                <ul className='list-disc p-5 text-white'>
                    <li className='mb-2'>Create a Budget: Track your income and expenses to understand your financial situation and avoid overspending.</li>
                    <li className='mb-2'>Avoid Unnecessary Debt: Be cautious with credit cards and loans. Only borrow what you can afford to pay back.</li>
                    <li className='mb-2'>Save Regularly: Even small amounts saved consistently can add up over time. Aim to save a portion of your income.</li>
                    <li className='mb-2'>Cook at Home: Eating out can be expensive. Save money by cooking meals at home and bringing lunch to campus.</li>
                    <li className='mb-2'>Use Student Discounts: Take advantage of student discounts on software, subscriptions, travel, and local businesses.</li>
                    <li className='mb-2'>Limit Impulse Purchases: Avoid making impulsive purchases. Give yourself time to think before buying something non-essential.</li>
                    <li className='mb-2'>Buy Used Textbooks: Save money by purchasing used textbooks or renting them instead of buying new ones.</li>
                    <li className='mb-2'>Utilize Free Resources: Make use of free resources available to students, such as the library, academic workshops, and online courses.</li>
                    <li className='mb-2'>Plan for Emergencies: Set aside an emergency fund to cover unexpected expenses, such as medical bills or car repairs.</li>
                    <li className='mb-2'>Track Your Spending: Use apps or tools to monitor your spending habits and identify areas where you can cut back.</li>
                </ul>
            </div>
            <div className='p-2 text-white'>
                *Luckily, all the above tips can be achieved through our web app BudgetBuddy. You can discover more tips via visiting the <Link href="/community" className='underline text-blue-500'>Community Pages</Link>
            </div>
        </div>
    )
}

export default FinancialTipsComp
