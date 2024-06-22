

import { NextResponse } from 'next/server';
// Adjust the import path as necessary
import { dbConnect } from '@/utils/dbConnect';
import { User } from '@/model/User';


export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnect();
    const user = await User.findOne({email:id}).populate("PendingAppointments");

    if (!user) {
      return NextResponse.json({
        message: 'Appointment not found',
        success: false,
      }, {
        status: 404,
      });
    }

    return NextResponse.json({
      message: 'Appointment retrieved successfully',
      success: true,
      appointments:user.PendingAppointments,
      _id:user._id,
      email:user.email
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
