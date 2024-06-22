import { Schema } from "mongoose";
import mongoose from "mongoose";

const ImageSchema= new Schema({

  image_url:{
    type:String,
    required:true
  },
  public_id:{
    type:String,
    required:true
  }

},{timestamps:true})

export const Image= mongoose.models.Image ?? mongoose.model("Image", ImageSchema)