///http://localhost:3000/api/getCommunityPosts


import { Budget } from "@/models/Budget";
import { Post } from "@/models/Posts";
import { User } from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";


export const GET = async (req) => {

  try {
    await dbConnect();

    const posts = await Post.find();
    return NextResponse.json(
      {
        message:"got posts successfully",
        success: true,
        data: posts,
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
