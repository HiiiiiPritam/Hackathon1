import { Image } from "@/model/ImageModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { deleteImage } from "@/utils/upload-image";


export const DELETE= async (req,{params})=>{
  await dbConnect()
  try {
    let {id}= params;

    let imagePublicID= "nextjs-image-gallery/"+id;
    const result_delete= await deleteImage(imagePublicID)
  
    const images= await Image.findOneAndDelete({public_id:imagePublicID})
    return NextResponse.json({message:result_delete},{status:200})
    
  } catch (error) {
    return NextResponse.json({message:"error in deleting"},{status:400})

  }

}