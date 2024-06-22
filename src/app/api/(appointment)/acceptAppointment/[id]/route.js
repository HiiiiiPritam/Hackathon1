// import { NextResponse } from 'next/server';
// import { dbConnect } from '@/utils/dbConnect';
// import { Appointment } from '@/model/Appointments';

// export const PUT = async (req, { params }) => {
//   const { id } = params;

//   try {
//     await dbConnect();

//     // Find the appointment by ID
//     const appointment = await Appointment.findById(id).populate("withWhom", "name email PendingAppointments AcceptedAppointments").populate("byWhom", "name email");
    
//     if (!appointment) {
//       return NextResponse.json({
//         message: 'Appointment not found',
//         success: false,
//       }, {
//         status: 404,
//       });
//     }

//     // Ensure the withWhom fields are arrays
//     if (!appointment.withWhom.PendingAppointments) {
//       appointment.withWhom.PendingAppointments = [];
//     }
//     if (!appointment.withWhom.AcceptedAppointments) {
//       appointment.withWhom.AcceptedAppointments = [];
//     }

//     // Toggle the isAccepted field
//     appointment.isAccepted = !appointment.isAccepted;
//     console.log(appointment.isAccepted);

//     if (appointment.isAccepted) {
//       try {
//         appointment.withWhom.PendingAppointments = appointment.withWhom.PendingAppointments.filter(
//           (appId) => appId.toString() !== appointment._id.toString()
//         );
//         appointment.withWhom.AcceptedAppointments.push(appointment._id);

//         await appointment.withWhom.save();
//         console.log("In acceptAppointment Block 1");
//       } catch (error) {
//         console.log("Error in acceptAppointment Block 1", error);
//       }
//     } else {
//       try {
//         appointment.withWhom.AcceptedAppointments = appointment.withWhom.AcceptedAppointments.filter(
//           (appId) => appId.toString() !== appointment._id.toString()
//         );
//         appointment.withWhom.PendingAppointments.push(appointment._id);

//         await appointment.withWhom.save();
//       } catch (error) {
//         console.log("Error in acceptAppointment Block 2", error);
//       }
//     }

//     await appointment.save();

//     // Create a simplified version of the appointment object to return
//     const simplifiedAppointment = {
//       id: appointment._id,
//       isAccepted: appointment.isAccepted,
//       withWhom: {
//         name: appointment.withWhom.name,
//         email: appointment.withWhom.email,
//       },
//       byWhom: {
//         name: appointment.byWhom.name,
//         email: appointment.byWhom.email,
//       }
//     };

//     return NextResponse.json({
//       message: 'Appointment isAccepted state toggled successfully',
//       success: true,
//       appointment: simplifiedAppointment,
//     }, {
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       message: error.message,
//       success: false,
//     }, {
//       status: 500,
//     });
//   }
// };

import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';
import { Appointment } from '@/model/Appointments';

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    await dbConnect();

    // Find the appointment by ID and populate related fields
    const appointment = await Appointment.findById(id).populate("withWhom", "name email PendingAppointments AcceptedAppointments").populate("byWhom", "name email");
    
    if (!appointment) {
      return NextResponse.json({
        message: 'Appointment not found',
        success: false,
      }, {
        status: 404,
      });
    }

    // Ensure the withWhom fields are arrays
    if (!appointment.withWhom.PendingAppointments) {
      appointment.withWhom.PendingAppointments = [];
    }
    if (!appointment.withWhom.AcceptedAppointments) {
      appointment.withWhom.AcceptedAppointments = [];
    }

    // Toggle the isAccepted field
    appointment.isAccepted = !appointment.isAccepted;

    if (appointment.isAccepted) {
      try {
        // Using Mongoose's pull method to remove from PendingAppointments
        appointment.withWhom.PendingAppointments.pull(appointment._id.toString());
        // Using standard JS method to add to AcceptedAppointments
        appointment.withWhom.AcceptedAppointments.push(appointment._id.toString());

        await appointment.withWhom.save();
      } catch (error) {
        console.log("Error in acceptAppointment Block 1", error);
      }
    } else {
      try {
        // Using standard JS method to remove from AcceptedAppointments
        appointment.withWhom.AcceptedAppointments = appointment.withWhom.AcceptedAppointments.filter(
          (appId) => appId.toString() !== appointment._id.toString()
        );
        // Using standard JS method to add to PendingAppointments
        appointment.withWhom.PendingAppointments.push(appointment._id.toString());

        await appointment.withWhom.save();
      } catch (error) {
        console.log("Error in acceptAppointment Block 2", error);
      }
    }

    await appointment.save();

    // Create a simplified version of the appointment object to return
    const simplifiedAppointment = {
      id: appointment._id,
      isAccepted: appointment.isAccepted,
      withWhom: {
        name: appointment.withWhom.name,
        email: appointment.withWhom.email,
      },
      byWhom: {
        name: appointment.byWhom.name,
        email: appointment.byWhom.email,
      }
    };

    return NextResponse.json({
      message: 'Appointment isAccepted state toggled successfully',
      success: true,
      appointment: simplifiedAppointment,
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
