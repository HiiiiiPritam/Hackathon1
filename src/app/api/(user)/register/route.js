import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    const { email, name, password } = await req.json();

    if(!email||!name||!password){
      return NextResponse.json({
        message: "Please provide all credentials",
        success: false,
      }, {
        status: 400,
      });
    }
    
    
    await dbConnect();

    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      }, {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);
    if (!createdUser) {
      return NextResponse.json({
        message: "Some error occurred while creating the user",
        success: false,
      }, {
        status: 500,
      });
    }

    return NextResponse.json({
      message: "User is created successfully",
      success: true,
      user: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      },
    }, {
      status: 201,
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
