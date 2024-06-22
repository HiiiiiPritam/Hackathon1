import { Image } from "@/model/ImageModel";
import { dbConnect } from "@/utils/dbConnect";
import { UploadImage } from "@/utils/upload-image";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { email } = params;

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    console.log({ image });

    if (!image) {
      return NextResponse.json({
        message: "No image found",
      }, { status: 400 });
    }

    await dbConnect();

    const data = await UploadImage(image, "nextjs-image-gallery");
    console.log("data", data);

    await Image.create({
      image_url : data?.secure_url,
      public_id : data?.public_id
    })

    return NextResponse.json({
      message: "Image uploaded and user updated successfully",
      success: true,
      msg: data
    }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image", error);
    return NextResponse.json({
      message: "An error occurred while uploading the image",
      error: error.message,
    }, { status: 500 });
  }
};
