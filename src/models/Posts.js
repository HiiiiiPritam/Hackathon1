import { Schema } from "mongoose";
import mongoose from "mongoose";

const PostSchema = new Schema({
  content:{
    type:String,
    required:true,
    default:""
  },
  user:{
    type:String,
    required:true,
  }
}, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
