import { Budget } from "@/models/Budget";
import { User } from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";


export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await dbConnect();

    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return NextResponse.json(
        {
          message: "Budget not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Populate all users to get their list of Budget
    const users = await User.find().populate('Budget');

    // Remove the deleted budget from all users' lists of Budget
    for (const user of users) {
      user.Budget = user.Budget.filter(budget => budget._id.toString() !== id);
      await user.save();
    }

    return NextResponse.json(
      {
        message: "Budget deleted successfully",
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
