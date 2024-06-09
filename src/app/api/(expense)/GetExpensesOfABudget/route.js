import { Expense } from "@/models/Expense";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { budgetId } = req.nextUrl.searchParams;

    if (!budgetId) {
      return NextResponse.json(
        {
          message: "Budget ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const expenses = await Expense.find({ budgetId });
    return NextResponse.json(
      {
        success: true,
        data: expenses,
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
