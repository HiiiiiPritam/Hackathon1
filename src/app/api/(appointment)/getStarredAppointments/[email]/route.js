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
      .populate("PendingAppointments", { lean: false }) // Populate with full documents
      .populate("MyAppointments", { lean: false }) // Populate with full documents
      .populate("AcceptedAppointments", { lean: false }); // Populate nested 'appointment' subdocument

    if (!foundUser) {
      return NextResponse.json({
        message: "No user exists with this email",
        success: false,
      }, {
        status: 404,
      });
    }

    // Filter starred appointments
    const starredAppointments = [
      ...foundUser.MyAppointments.filter(appointment => appointment.
        isStarred ),
      ...foundUser.AcceptedAppointments.filter(appointment => appointment.
isStarredByAcceptor),
      ...foundUser.PendingAppointments.filter(appointment => appointment.
isStarredByAcceptor),
    ];

    return NextResponse.json({
      message: "User found",
      success: true,
      starredAppointments,
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
