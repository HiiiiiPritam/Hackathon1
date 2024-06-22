import mongoose from "mongoose";


const appointmentSchema= new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  description:{
    type:String,
    required: true,
  },
  withWhom:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  byWhom:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  appointmentDate: {
    type: Date, // Store the appointment date
    
  },
  startTime: {
    type: String, // Store time in "HH:mm" format
    
  },
  endTime: {
    type: String, // Store time in "HH:mm" format
    
  },
  isStarred:{
    type:Boolean,
    default:false,
  },
  isStarredByAcceptor:{
    type:Boolean,
    default:false,
  },
  isAccepted:{
    type:Boolean,
    default:false,
  },
})

export const Appointment = mongoose.models.Appointment ?? mongoose.model("Appointment", appointmentSchema)