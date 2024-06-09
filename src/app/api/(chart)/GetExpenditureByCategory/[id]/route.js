// pages/api/GetExpenditureByCategory/[id].js
import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await dbConnect();

    const budget = await Budget.findById(id).populate('expenses');
    if (!budget) {
      return NextResponse.json(
        {
          message: "Budget not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const expendituresByCategory = {};

    budget.expenses.forEach(expense => {
      const { category, amount } = expense;
      if (!expendituresByCategory[category]) {
        expendituresByCategory[category] = 0;
      }
      expendituresByCategory[category] += amount;
    });

    return NextResponse.json(
      {
        message: "Data fetched successfully",
        success: true,
        data: expendituresByCategory,
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
