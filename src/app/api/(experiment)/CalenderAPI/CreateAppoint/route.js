// /api/CalenderAPI/CreateAppoint
import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";

import { User } from "@/model/User";
import { Experiment } from "@/model/Experiment";

export const POST = async (req) => {
  const { title, description, appointmentDate, startTime, endTime, email } = await req.json();

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      }, {
        status: 404,
      });
    }

    const newAppointment = new Experiment({
      title,
      description,
      appointmentDate,
      startTime,
      endTime,
      withWhom: user._id,
      byWhom: user._id,
    });

    await newAppointment.save();

   

    return NextResponse.json({
      message: "Appointment created successfully",
      success: true,
      appointment: newAppointment,
    }, {
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
    
      message: error.message,
      success: false,
    }, {
      status: 500,
    });
  }
};
