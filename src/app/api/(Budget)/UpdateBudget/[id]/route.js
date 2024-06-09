import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { name=undefined, dailyAssigned=undefined, weeklyAssigned=undefined, monthlyAssigned=undefined, dailySpent=undefined, weeklySpent=undefined, monthlySpent=undefined, categories=undefined } = await req.json();

    await dbConnect();

    const updateData = {};
    if (name !== undefined) updateData.name = name;

    if (dailyAssigned !== undefined) updateData['assignedAmount.daily'] = dailyAssigned;
    if (weeklyAssigned !== undefined) updateData['assignedAmount.weekly'] = weeklyAssigned;
    if (monthlyAssigned !== undefined) updateData['assignedAmount.monthly'] = monthlyAssigned;

    if (dailySpent !== undefined) updateData['actualSpent.daily'] = dailySpent;
    if (weeklySpent !== undefined) updateData['actualSpent.weekly'] = weeklySpent;
    if (monthlySpent !== undefined) updateData['actualSpent.monthly'] = monthlySpent;

    if (categories !== undefined) updateData.categories = categories;

    const updatedBudget = await Budget.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updatedBudget) {
      return NextResponse.json(
        {
          message: "Budget not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Budget updated successfully",
        success: true,
        budget: updatedBudget,
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
