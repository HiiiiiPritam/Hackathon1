import { Budget } from "@/models/Budget";
import { Expense } from "@/models/Expense";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await dbConnect();

    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return NextResponse.json(
        {
          message: "Expense not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Find the budget to which the deleted expense belongs
    const budget = await Budget.findById(deletedExpense.budgetId);
    if (!budget) {
      return NextResponse.json(
        {
          message: "Budget not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Remove the deleted expense from the expenses array of the budget
    budget.expenses = budget.expenses.filter(expenseId => expenseId.toString() !== id);
    await budget.save();

    return NextResponse.json(
      {
        message: "Expense deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};

