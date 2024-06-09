// "use client";
// import React, { useState, useEffect } from "react";

// const AddExpenseComponent = ({id}) => {
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState(0);
//   const [category, setCategory] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [updateDaily, setUpdateDaily] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState("");
//   const [budgetId, setBudgetId] = useState(id); // Assume budgetId is known or fetched earlier
//   const [showCategoryForm, setShowCategoryForm] = useState(false);

//   useEffect(() => {
//     // Fetch categories for the budget when the component mounts
//     const fetchCategories = async () => {
//       const response = await fetch(`/api/GetABudget/${budgetId}`);
//       const { data } = await response.json();
//       if (response.ok) {
//         setCategories(data.categories);
//         console.log(data.categories);
//       } else {
//         setMessage(`Error: ${data.message}`);
//       }
//     };

//     fetchCategories();
//   }, [budgetId]);

//   const handleIncrement = () => {
//     setAmount(amount + 1);
//   };

//   const handleDecrement = () => {
//     setAmount(amount > 0 ? amount - 1 : 0);
//   };

//   const handleSubmitExpense = async (e) => {
//     e.preventDefault();

//     console.log("category", category);

//     const response = await fetch("/api/CreateExpense", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         budgetId,
//         category,
//         name: title,
//         amount: parseFloat(amount),
//         updateDaily,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage("Expense added successfully!");
//       setTitle("");
//       setAmount(0);
//       setCategory("");
//     } else {
//       setMessage(`Error: ${data.message}`);
//     }
//   };

//   const handleSubmitCategory = async (e) => {
//     e.preventDefault();

//     const response = await fetch(`/api/AddCategory/${budgetId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         // budgetId,
//         category: newCategory,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage("Category added successfully!");
//       setCategories([...categories, newCategory]);
//       setNewCategory("");
//     } else {
//       setMessage(`Error: ${data.message}`);
//     }
//   };

//   return (
//     <div className="w-full h-screen  p-5 bg-[#331D2C] text-white flex flex-col gap-5  justify-center items-center">
//         <h1 className="text-xl font-bold">Add a New Expense{budgetId}</h1>
//       <form
//         onSubmit={handleSubmitExpense}
//         className="w-[90vw] h-[80vh] p-5 bg-[#3F2E3E] rounded-xl flex justify-center items-center flex-col gap-5"
//       >
//         <div className="flex flex-col">
//           <label htmlFor="ExpenseTitle">Title of Expense</label>
//           <input
//             type="text"
//             name="ExpenseTitle"
//             className="w-[70vw] bg-[#A78295] rounded-md h-10"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col justify-center items-center w-full">
//           <label htmlFor="amt">Amount</label>
//           <div className="w-[20%] h-10 border flex rounded-md justify-evenly">
//             <div
//               className="border-r flex justify-center items-center cursor-pointer"
//               onClick={handleDecrement}
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect x="5" y="11" width="14" height="2" fill="currentColor" />
//               </svg>
//             </div>
//             <input
//               className="w-[60%] flex justify-center items-center text-center bg-[#A78295] placeholder:text-center placeholder:text-white"
//               placeholder="0"
//               name="amt"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />

//             <div
//               className="border-l flex justify-center items-center cursor-pointer"
//               onClick={handleIncrement}
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect x="9" y="5" width="2" height="14" fill="currentColor" />
//                 <rect x="3" y="11" width="14" height="2" fill="currentColor" />
//               </svg>
//             </div>

//           </div>
//           <br />
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="updateDaily"
//               checked={updateDaily}
//               onChange={(e) => setUpdateDaily(e.target.checked)}
//             />
            
//             <label htmlFor="updateDaily" className="ml-2">
//               Add to daily expense instead of replacing<br/>
//               (check if same day else don't)
//             </label>
//           </div>
//         </div>

//         <div className="w-4/5">
//           <label
//             htmlFor="type"
//             className="block mb-2 text-sm font-medium text-black-900 text-white"
//           >
//             Expense Category
//           </label>
//           <select
//             id="type"
//             name="type"
//             className="bg-[#A78295] h-10 w-full rounded-md p-2"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             {categories.map((cat, index) => (
//               <option key={index} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-[#A78295] h-10 w-36 rounded-md flex justify-center items-center"
//         >
//           <lord-icon
//             src="https://cdn.lordicon.com/hqymfzvj.json"
//             trigger="hover"
//             colors="primary:#ffffff"
//             style={{ width: "25px", height: "25px" }}
//           ></lord-icon>
//           Add Expense
//         </button>


       
//        <button
//           onClick={()=>{
//             setShowCategoryForm(!showCategoryForm)
//           }}
//           className="bg-[#A78295] h-12 w-44 rounded-md flex justify-center items-center"
//         >
//           <lord-icon
//             src="https://cdn.lordicon.com/hqymfzvj.json"
//             trigger="hover"
//             colors="primary:#ffffff"
//             style={{ width: "25px", height: "25px" }}
//           ></lord-icon>
//           Add new Category
//         </button>
//         {message && <p>{message}</p>}


//       </form>


//       {showCategoryForm && (
//         <form
//           onSubmit={handleSubmitCategory}
//           className="w-[90vw] h-[20vh] p-5 bg-[#3F2E3E] rounded-xl flex justify-center items-center flex-col gap-5 mt-5"
//         >
//           <div className="flex flex-col">
//             <label htmlFor="NewCategory">New Category</label>
//             <input
//               type="text"
//               name="NewCategory"
//               className="w-[70vw] bg-[#A78295] rounded-md h-10"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-[#A78295] h-10 w-36 rounded-md flex justify-center items-center"
//           >
//             <lord-icon
//               src="https://cdn.lordicon.com/hqymfzvj.json"
//               trigger="hover"
//               colors="primary:#ffffff"
//               style={{ width: "25px", height: "25px" }}
//             ></lord-icon>
//             Add Category
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AddExpenseComponent;


"use client";

import React, { useState, useEffect } from "react";

const AddExpenseComponent = ({ id }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [updateDaily, setUpdateDaily] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [budgetId, setBudgetId] = useState(id); 
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/GetABudget/${budgetId}`);
      const { data } = await response.json();
      if (response.ok) {
        setCategories(data.categories);
        console.log(data.categories);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    };

    fetchCategories();
  }, [budgetId]);

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    setAmount(amount > 0 ? amount - 1 : 0);
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();

    // console.log("Selected category:", category); // Debugging log

    const response = await fetch("/api/CreateExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetId,
        category,
        name: title,
        amount: parseFloat(amount),
        updateDaily,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Expense added successfully!");
      setTitle("");
      setAmount(0);
      setCategory("");
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/AddCategory/${budgetId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // budgetId,
        category: newCategory,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Category added successfully!");
      setCategories([...categories, newCategory]);
      setNewCategory("");
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className="w-full h-screen p-5 bg-[#331D2C] text-white flex flex-col gap-5 justify-center items-center">
      <h1 className="text-xl font-bold">Add a New Expense </h1>
      <form
        onSubmit={handleSubmitExpense}
        className="w-[90vw] h-[80vh] p-5 bg-[#3F2E3E] rounded-xl flex justify-center items-center flex-col gap-5"
      >
        <div className="flex flex-col">
          <label htmlFor="ExpenseTitle">Title of Expense</label>
          <input
            type="text"
            name="ExpenseTitle"
            className="w-[70vw] bg-[#A78295] rounded-md h-10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <label htmlFor="amt">Amount</label>
          <div className="w-[20%] h-10 border flex rounded-md justify-evenly">
            <div
              className="border-r flex justify-center items-center cursor-pointer"
              onClick={handleDecrement}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="11" width="14" height="2" fill="currentColor" />
              </svg>
            </div>
            <input
              className="w-[60%] flex justify-center items-center text-center bg-[#A78295] placeholder:text-center placeholder:text-white"
              placeholder="0"
              name="amt"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div
              className="border-l flex justify-center items-center cursor-pointer"
              onClick={handleIncrement}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="9" y="5" width="2" height="14" fill="currentColor" />
                <rect x="3" y="11" width="14" height="2" fill="currentColor" />
              </svg>
            </div>
          </div>
          <br />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="updateDaily"
              checked={updateDaily}
              onChange={(e) => setUpdateDaily(e.target.checked)}
            />

            <label htmlFor="updateDaily" className="ml-2">
              Add to daily expense instead of replacing
              <br />
              (check if same day else don't)
            </label>
          </div>
        </div>

        <div className="w-4/5">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-black-900 text-white"
          >
            Expense Category
          </label>
          <select
            id="type"
            name="type"
            className="bg-[#A78295] h-10 w-full rounded-md p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option> {/* Ensure the default value is clear */}
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#A78295] h-10 w-36 rounded-md flex justify-center items-center"
        >
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          Add Expense
        </button>

        <button
          onClick={() => {
            setShowCategoryForm(!showCategoryForm);
          }}
          className="bg-[#A78295] h-12 w-44 rounded-md flex justify-center items-center"
        >
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          Add new Category
        </button>
        {message && <p>{message}</p>}
      </form>

      {showCategoryForm && (
        <form
          onSubmit={handleSubmitCategory}
          className="w-[90vw] h-[20vh] p-5 bg-[#3F2E3E] rounded-xl flex justify-center items-center flex-col gap-5 mt-5"
        >
          <div className="flex flex-col">
            <label htmlFor="NewCategory">New Category</label>
            <input
              type="text"
              name="NewCategory"
              className="w-[70vw] bg-[#A78295] rounded-md h-10"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#A78295] h-10 w-36 rounded-md flex justify-center items-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            Add Category
          </button>
        </form>
      )}
    </div>
  );
};

export default AddExpenseComponent;
