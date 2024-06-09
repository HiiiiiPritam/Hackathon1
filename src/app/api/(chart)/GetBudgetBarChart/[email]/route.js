import { Budget } from "@/models/Budget";
import { User } from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { email } = params;
    await dbConnect();

    // Find the user based on the email
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

    /*
        const monthlyExpenditures = budgets.map(budget => ({
      name: budget.name,
      monthlySpent: budget.actualSpent.monthly,
    }));
    */ 

    const monthlyExpenditures = budgets.map(budget => ({
      name: budget.name,
      assigned: budget.assignedAmount.monthly,
      spent: budget.actualSpent.monthly,
    }));

    return NextResponse.json(
      {
        message: "Data fetched successfully",
        success: true,
        monthlyExpenditures,
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
