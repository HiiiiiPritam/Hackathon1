import { Expense } from "@/models/Expense";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { category, name, amount } = await req.json();

    await dbConnect();

    const updateData = {};
    if (category !== undefined) updateData.category = category;
    if (name !== undefined) updateData.name = name;
    if (amount !== undefined) updateData.amount = amount;

    const updatedExpense = await Expense.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedExpense) {
      return NextResponse.json(
        {
          message: "Expense not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Expense updated successfully",
        success: true,
        expense: updatedExpense,
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
