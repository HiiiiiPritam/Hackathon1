import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {

    await dbConnect();

    const users = await User.find();

    if (!users) {
      return NextResponse.json({
        message: "No user exists with this email",
        success: false,
      }, {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      users: users,
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 500,
    });
  }
};
