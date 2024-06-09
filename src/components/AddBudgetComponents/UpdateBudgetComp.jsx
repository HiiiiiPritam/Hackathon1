'use client';
import React, { useState, useEffect } from 'react';

const UpdateBudgetComponent = ({ budgetId }) => {
    const [name, setName] = useState('');
    const [dailyAssigned, setDailyAssigned] = useState(0);
    const [weeklyAssigned, setWeeklyAssigned] = useState(0);
    const [monthlyAssigned, setMonthlyAssigned] = useState(0);
    const [dailySpent, setDailySpent] = useState(0);
    const [weeklySpent, setWeeklySpent] = useState(0);
    const [monthlySpent, setMonthlySpent] = useState(0);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [message, setMessage] = useState('');
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    useEffect(() => {
        // Fetch the budget details when the component mounts
        const fetchBudgetDetails = async () => {
            const response = await fetch(`/api/GetABudget/${budgetId}`);
            const { data } = await response.json();
            if (response.ok) {
                setName(data.name);
                setDailyAssigned(data.assignedAmount.daily);
                setWeeklyAssigned(data.assignedAmount.weekly);
                setMonthlyAssigned(data.assignedAmount.monthly);
                setDailySpent(data.actualSpent.daily);
                setWeeklySpent(data.actualSpent.weekly);
                setMonthlySpent(data.actualSpent.monthly);
                setCategories(data.categories);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        };

        fetchBudgetDetails();
    }, [budgetId]);

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/UpdateBudget/${budgetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                dailyAssigned: parseFloat(dailyAssigned),
                weeklyAssigned: parseFloat(weeklyAssigned),
                monthlyAssigned: parseFloat(monthlyAssigned),
                dailySpent: parseFloat(dailySpent),
                weeklySpent: parseFloat(weeklySpent),
                monthlySpent: parseFloat(monthlySpent),
                
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Budget updated successfully!');
        } else {
            setMessage(`Error: ${data.message}`);
        }
    };


    return (
        <div className='w-[90%] h-[70vh] p-5 bg-[#331D2C] text-white flex flex-col gap-4 justify-center items-center'>
          <h1 className='text-xl font-bold'>Update Budget </h1>
            <form onSubmit={handleSubmitUpdate} className='w-[110%] h-full p-5 bg-[#3F2E3E] rounded-xl flex justify-center items-center flex-col gap-5'>
                <div className='flex flex-col'>
                    <label htmlFor="BudgetName">Budget Name</label>
                    <input
                        type="text"
                        name='BudgetName'
                        className='w-[70vw] px-2  bg-[#A78295] rounded-md h-10'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="DailyAssigned">Daily Assigned Amount</label>
                    <input
                        type="number"
                        name='DailyAssigned'
                        className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
                        value={dailyAssigned}
                        onChange={(e) => setDailyAssigned(e.target.value)}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="WeeklyAssigned">Weekly Assigned Amount</label>
                    <input
                        type="number"
                        name='WeeklyAssigned'
                        className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
                        value={weeklyAssigned}
                        onChange={(e) => setWeeklyAssigned(e.target.value)}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="MonthlyAssigned">Monthly Assigned Amount</label>
                    <input
                        type="number"
                        name='MonthlyAssigned'
                        className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
                        value={monthlyAssigned}
                        onChange={(e) => setMonthlyAssigned(e.target.value)}
                        required
                    />
                </div>
{/* 
                <div className='flex flex-col'>
                    <label htmlFor="DailySpent">Daily Spent Amount</label>
                    <input
                        type="number"
                        name='DailySpent'
                        className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
                        value={dailySpent}
                        onChange={(e) => setDailySpent(e.target.value)}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="WeeklySpent">Weekly Spent Amount</label>
                    <input                        type="number"
                        name='WeeklySpent'
                        className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
                        value={weeklySpent}
                        onChange={(e) => setWeeklySpent(e.target.value)}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="MonthlySpent">Monthly Spent Amount</label>
                    <input
                        type="number"
                        name='MonthlySpent'
                        className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
                        value={monthlySpent}
                        onChange={(e) => setMonthlySpent(e.target.value)}
                        required
                    />
                </div> */}

                <button type="submit" className='bg-[#a78295] h-10 w-36 rounded-md flex justify-center items-center'>
                    <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ "width": "25px", "height": "25px" }}>
                    </lord-icon>
                    Update Budget
                </button>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default UpdateBudgetComponent;

