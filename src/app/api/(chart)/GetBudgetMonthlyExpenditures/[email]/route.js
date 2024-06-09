// /pages/api/GetMonthlyExpenditures/[email].js

import { User } from "@/models/User";
import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { email } = params;

    await dbConnect();

    const user = await User.findOne({ email }).populate("Budget");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const budgets = user.Budget;
    const monthlyExpenditures = budgets.map(budget => ({
      name: budget.name,
      monthlySpent: budget.actualSpent.monthly,
    }));

    return NextResponse.json(
      {
        message: "Data fetched successfully",
        success: true,
        data: monthlyExpenditures,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
