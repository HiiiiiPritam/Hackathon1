import { Budget } from "@/models/Budget";
import { User } from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const email = req.nextUrl.searchParams.get("email");

  let user= await User.findOne({email})
  if (!user){
    return NextResponse.json(
      {
        message: "User not found",
        success: false,
      },
      { status: 400 }
    );
  }

  let userId= user?._id

  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required",
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const budgets = await Budget.find({ userId });
    return NextResponse.json(
      {
        success: true,
        data: budgets,
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
