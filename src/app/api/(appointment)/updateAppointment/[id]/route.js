import { Appointment } from "@/model/Appointments";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const PUT= async (req, {params})=>{
  const {id}= params;
  try {
    const { title, description} = await req.json();
    await dbConnect();

    const appointment = await Appointment.findById(id);
    if(!appointment){
      return NextResponse.json({
        message: 'Appointment not found',
        success: false,
      }, {
        status: 404,
      });
    }

    if(title!=undefined) appointment.title=title;
    if (description !== undefined) appointment.description = description;

    await appointment.save()

    return NextResponse.json(
      {
        message: 'Appointment updated successfully',
        success: true,
        appointment,
      }, {
        status: 200,
      }
    )

  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 500,
    });
  }
}