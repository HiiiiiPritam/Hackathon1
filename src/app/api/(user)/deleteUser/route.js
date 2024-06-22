import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    // Extract the email from the query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        message: "Email query parameter is missing",
        success: false,
      }, {
        status: 400,
      });
    }

    await dbConnect();

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return NextResponse.json({
        message: "No user exists with this email",
        success: false,
      }, {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
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
