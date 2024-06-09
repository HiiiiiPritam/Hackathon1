// pages/api/users/[email].js

import { User } from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { email } = params;

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
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
