import { Budget } from "@/models/Budget";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

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

    return NextResponse.json(
      {
        success: true,
        data: budget,
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
