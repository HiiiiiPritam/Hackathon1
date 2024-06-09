// pages/api/GetBudgetSpending.js
import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    
    await dbConnect();

    const budget = await Budget.findById(id);

    if (!budget) {
      return NextResponse.json({
        message: "Budget not found",
        success: false,
      }, { status: 404 });
    }

    const spendingData = {
      assignedAmount: budget.assignedAmount,
      actualSpent: budget.actualSpent,
    };

    return NextResponse.json({
      message: "Data fetched successfully",
      success: true,
      data: spendingData,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, { status: 500 });
  }
};
