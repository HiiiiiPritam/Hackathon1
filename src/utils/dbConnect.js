import mongoose from "mongoose";

export async function dbConnect(){
  try {
    
    let conn = await mongoose.connect("mongodb://127.0.0.1:27017/hopefully2")
    return conn
  } catch (error) {
    throw new Error(e)
  }
}