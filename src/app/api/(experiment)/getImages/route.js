import { Image } from "@/model/ImageModel";
import { dbConnect } from "@/utils/dbConnect"
import { NextRequest, NextResponse } from "next/server";

export const GET= async (req)=>{

  try {
    await dbConnect();
   
    let images= await Image.find({})
    return NextResponse.json({message:"successfully got images",images,total:images.length},{status:200})
  } catch (error) {
    return NextResponse.json({message:"couldnot get images"},{status:400})
  }
}