import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { Appointment } from "@/model/Appointments";


export const POST = async (req) => {
  try {

    const { title, description, appointmentDate, start, end, ByWhomemail,withWhomID } = await req.json();

    if(!description||!title||!withWhomID||!ByWhomemail||!start||!end){
      console.log("in block 1");
      return NextResponse.json({
        
        message: "Please provide all credentials",
        success: false,
      }, {
        status: 400,
      });
    }
    
    
    await dbConnect();

    /////get the user

let user= await User.findOne({email:ByWhomemail});
if (!user) {
  console.log("in block 3");

  return NextResponse.json({
    message: "couldnotFind user with the email",
    success: false,
  }, {
    status: 400,
  });
  
}
/////create new appointment

const appointment = await Appointment.create({
  title,
  description,
  withWhom:withWhomID,
  byWhom:user._id,
  appointmentDate,
  startTime:start,
  endTime:end
});

if(!appointment){
  console.log("in block 2");

  return NextResponse.json({
    message: "Some error occurred while creating the appointment",
    success: false,
  }, {
    status: 500,
  });
}

//////////////////////////////////////////////
/////get the one to make appointment with

let Appointee= await User.findById(withWhomID)
if(!Appointee){
  console.log("in block 4");

  return NextResponse.json({
    message: "couldnotFind user with the ID",
    success: false,
  }, {
    status: 400,
  });
}
////push to secons pending appointments
Appointee.PendingAppointments.push(appointment)
await Appointee.save();

/////pushh to firsts my appointments
user.MyAppointments.push(appointment)
await user.save();

////done
console.log("in block 5 hurray");

    return NextResponse.json({
      message: "Appointment is created successfully",
      success: true,
      appointment: appointment,
    }, {
      status: 201,
    });

  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 500,
    });
  }
};
