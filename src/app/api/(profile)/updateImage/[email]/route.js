import { Image } from "@/model/ImageModel";
import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { UploadImage, deleteImage } from "@/utils/upload-image";
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

    //new 
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
      }, { status: 404 });
    }
    //

      // Upload new image to Cloudinary
      const uploadResult = await UploadImage(image, "nextjs-image-gallery");
      const newImageUrl = uploadResult.secure_url;
      const newPublicId = uploadResult.public_id;
      console.log("in updateUser profile1",uploadResult);

    if (user.imagePublicId) {
      await deleteImage(user.imagePublicId);
    }

    // Update user image data
    user.image = newImageUrl;
    user.imagePublicId = newPublicId;
    await user.save();

    return NextResponse.json({
      message: "Image uploaded and user updated successfully",
      success: true,
      msg: uploadResult
    }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image", error);
    return NextResponse.json({
      message: "An error occurred while uploading the image",
      error: error.message,
    }, { status: 500 });
  }
};
