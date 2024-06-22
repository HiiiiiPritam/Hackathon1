import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';
import { User } from '@/model/User';

export const GET = async (req, { params }) => {
  const { email } = params;

  try {
    if (!email) {
      return NextResponse.json({
        message: "Email query parameter is missing",
        success: false,
      }, {
        status: 400,
      });
    }

    await dbConnect();

    const foundUser = await User.findOne({ email })
      .populate("MyAppointments", { lean: false }) // Populate 

    if (!foundUser) {
      return NextResponse.json({
        message: "No user exists with this email",
        success: false,
      }, {
        status: 404,
      });
    }

    // Filter starred appointments
    const acceptedAppointments = [
      ...foundUser.MyAppointments.filter(appointment => appointment.isAccepted ),
    ];

    return NextResponse.json({
      message: "User found",
      success: true,
      acceptedAppointments,
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
