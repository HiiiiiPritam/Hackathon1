
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';
import { Appointment } from '@/model/Appointments';

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnect();

    // Find the appointment by ID
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return NextResponse.json({
        message: 'Appointment not found',
        success: false,
      }, {
        status: 404,
      });
    }

    // Toggle the isStarred field
    appointment.isStarred = !appointment.isStarred;
    await appointment.save();

    return NextResponse.json({
      message: 'Appointment isStarred state toggled successfully',
      success: true,
      appointment,
    }, {
      status: 200,
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
