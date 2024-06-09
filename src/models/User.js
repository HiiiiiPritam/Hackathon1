import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema= new Schema({
  name:{
    required:true,
    type:String
  }
  ,  password:{
    type:String,
    default:undefined
  }
  ,  email:{
    required:true,
    type:String
  }
  ,  
  Budget:[
    {
      type:mongoose.Types.ObjectId,
      ref:'Budget',
    }
  ],

   
},{timestamps:true})

export const User= mongoose.models.User ?? mongoose.model("User", userSchema)