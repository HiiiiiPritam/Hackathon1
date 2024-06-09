import mongoose from "mongoose";

export async function dbConnect(){
  try {
    
    let conn = await mongoose.connect("mongodb+srv://ratsdust4226:budgetbuddydatabase@clusterbb.n3tlc9f.mongodb.net/?retryWrites=true&w=majority&appName=Clusterbb")
    return conn
  } catch (error) {
    throw new Error(e)
  }
}