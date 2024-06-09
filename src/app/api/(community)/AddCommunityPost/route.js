
///http://localhost:3000/api/AddCommunityPost

import { Post } from "@/models/Posts";
import { User } from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();

    const { email, content } = await req.json();

    if (!email || !content) {
      return NextResponse.json(
        {
          message: "content and email name are required",
          success: false,
        },
        { status: 400 }
      );
    }

    let Curruser= await User.findOne({email})
    if(!Curruser){
      return NextResponse.json(
        {
          message: "Error getting user",
          success: false,
        },
        { status: 500 }
      );
    }


    const newPost = {
      content,
      user:Curruser.name,
    };

    const createdPost = await Post.create(newPost);
    if (!createdPost) {
      return NextResponse.json(
        {
          message: "Error creating post",
          success: false,
        },
        { status: 500 }
      );
    }

    

    return NextResponse.json(
      {
        message: "post created successfully",
        success: true,
        post:createdPost
      },
      { status: 201 }
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
