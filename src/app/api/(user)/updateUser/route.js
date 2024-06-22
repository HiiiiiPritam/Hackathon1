import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = async (req) => {
  try {
    const { email, name, newEmail, password } = await req.json();

    if (!email || (!name && !newEmail && !password)) {
      return NextResponse.json({
        message: "Email and at least one field to update are required",
        success: false,
      }, {
        status: 400,
      });
    }

    await dbConnect();

    // Prepare the fields to update
    const updateFields = {};
    if (name) updateFields.name = name;
    if (newEmail) updateFields.email = newEmail;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({
        message: "No user exists with this email",
        success: false,
      }, {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
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
