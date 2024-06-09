// "use client"

// import { useState } from 'react';

// const AddBudgetComp = ({ userEmail }) => {
//   const [name, setName] = useState('');
//   const [monthlyAssignedAmount, setMonthlyAssignedAmount] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name) {
//       setError('Please provide a budget name');
//       return;
//     }

//     const response = await fetch('/api/AddBudget', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: userEmail, name, monthlyAssignedAmount: parseFloat(monthlyAssignedAmount) }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setSuccess('Budget created successfully');
//       setError('');
//       setName('');
//       setMonthlyAssignedAmount('');
//     } else {
//       setError(data.message);
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="bg-[#331D2C] text-white p-8 rounded-xl">
//     <h2 className="text-2xl font-bold mb-4">Add a New Budget</h2>
//     {error && <p className="text-red-500 mb-4">{error}</p>}
//     {success && <p className="text-green-500 mb-4">{success}</p>}
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="flex flex-col">
//         <label htmlFor="name" className="text-lg mb-1">Budget Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//            className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
//         />
//       </div>
//       <div className="flex flex-col">
//         <label htmlFor="monthlyAssignedAmount" className="text-lg mb-1">Monthly Assigned Amount:</label>
//         <input
//           type="number"
//           id="monthlyAssignedAmount"
//           value={monthlyAssignedAmount}
//           onChange={(e) => setMonthlyAssignedAmount(e.target.value)}
//            className='w-[70vw] px-2 bg-[#A78295] rounded-md h-10'
//         />
//       </div>
//       <button type="submit"
//       className="bg-[#917081] hover:bg-[#856676] transition-colors duration-300 text-white font-bold py-2 px-4 rounded"
//      >Add Budget</button>
//     </form>
//   </div>
//   );
// };

// export default AddBudgetComp;

"use client"

import { useState } from 'react';

const AddBudgetComp = ({ userEmail }) => {
  const [name, setName] = useState('');
  const [monthlyAssignedAmount, setMonthlyAssignedAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please provide a budget name');
      return;
    }

    const response = await fetch('/api/AddBudget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, name, monthlyAssignedAmount: parseFloat(monthlyAssignedAmount) }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('Budget created successfully. After adding budgets please check the all budgets section for updating them');
      setError('');
      setName('');
      setMonthlyAssignedAmount('');
    } else {
      setError(data.message);
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen p-5 bg-[#331D2C] text-white">
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} className="w-[100%] bg-[#3F2E3E] rounded-xl flex justify-center items-center py-10 flex-col gap-5 max-w-md space-y-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Budget</h1>
        <div className="flex w-[70%] flex-col">
          <label htmlFor="budgetName" className="mb-1 text-lg">Budget Name:</label>
          <input
            type="text"
            id="budgetName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-10 bg-[#A78295] rounded-md px-3"
          />
        </div>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="monthlyAssignedAmount" className="mb-1 text-lg">Monthly Assigned Amount:</label>
          <input
            type="number"
            id="monthlyAssignedAmount"
            value={monthlyAssignedAmount}
            onChange={(e) => setMonthlyAssignedAmount(e.target.value)}
            className="w-[100%] h-10 bg-[#A78295] rounded-md px-3"
          />
        </div>
        <button type="submit" className="bg-[#A78295] text-white py-2 px-4 rounded-md hover:bg-opacity-70 transition-colors duration-300">
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default AddBudgetComp;
