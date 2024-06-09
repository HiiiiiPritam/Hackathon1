import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    const { id } = params;
    const { category } = await req.json();

    

    if (!category) {
      return NextResponse.json(
        {
          message: "Category is required",
          success: false,
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json(
        {
          message: "Budget not found",
          success: false,
        },
        { status: 404 }
      );
    }

    budget.categories.push(category);
    await budget.save();

    return NextResponse.json(
      {
        message: "Category added successfully",
        success: true,
        categories: budget.categories,
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
