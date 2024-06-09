import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { oldCategory, newCategory } = await req.json();

    if (!oldCategory || !newCategory) {
      return NextResponse.json(
        {
          message: "Both old and new categories are required",
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

    const categoryIndex = budget.categories.indexOf(oldCategory);
    if (categoryIndex === -1) {
      return NextResponse.json(
        {
          message: "Old category not found",
          success: false,
        },
        { status: 404 }
      );
    }

    budget.categories[categoryIndex] = newCategory;
    await budget.save();

    return NextResponse.json(
      {
        message: "Category updated successfully",
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
