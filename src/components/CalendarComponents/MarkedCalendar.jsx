"use client";

// import React, { useEffect, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS file
// import moment from 'moment';

// function MarkedCalendar({ email }) {
//   const localizer = momentLocalizer(moment);
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const fetchAcceptedAppointments = async () => {
//       try {
//         const res = await fetch(`/api/getAllAcceptedAppointment/${email}`);
//         const data = await res.json();
//         if (data.success) {
//           setAppointments(data.acceptedAppointments);
//         } else {
//           console.error('Failed to fetch appointments:', data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAcceptedAppointments();
//   }, [email]);

//   const events = appointments.map(appointment => ({
//     title: appointment.title,
//     start: new Date(appointment.appointmentDate),
//     end: new Date(appointment.appointmentDate),
//   }));

//   // const eventStyleGetter = () => ({
//   //   style: {
//   //     display: 'none', // Hide event title
//   //   },
//   // });


//   return (
//     <div style={{ height: '400px',width:"400px" }}>

//       <Calendar
//       className='m-0 bg-blue-400'
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         toolbar={false} // Hide toolbar and navigation buttons
//         // eventPropGetter={eventStyleGetter} // Hide event title
//       />
//     </div>
//   );
// }

// export default MarkedCalendar;
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS file
import moment from 'moment';

function MarkedCalendar({ email }) {
  const localizer = momentLocalizer(moment);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAcceptedAppointments = async () => {
      try {
        const res = await fetch(`/api/getAllAcceptedAppointment/${email}`);
        const data = await res.json();
        if (data.success) {
          setAppointments(data.acceptedAppointments);
        } else {
          console.error('Failed to fetch appointments:', data.message);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAcceptedAppointments();
  }, [email]);

  const events = appointments.map(appointment => ({
    title: appointment.title,
    start: new Date(appointment.appointmentDate),
    end: new Date(appointment.appointmentDate),
  }));

  // Custom CSS to style the calendar
  const calendarStyles = `
    .rbc-month-header {
      background-color: red !important; /* Red background for day names */
      color: white !important;
    }

    .rbc-row-bg {
      background-color: blue !important; /* Blue background for dates */
      color: white !important;
      cursor:default;
    }
      .rbc-row-content{
            color: white !important;
        cursor:arrow;
      }
     
    .rbc-event{
          background-color: black !important; /* Blue background for dates */
          cursor:default;
    }
    
    .rbc-today{
          background-color: orange !important; /* Blue background for dates */

    }
  `;

  return (
    <div style={{ height: '400px', width: '400px' }}>
      <style jsx>{calendarStyles}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ background: 'transparent' }}
        toolbar={false} // Hide toolbar and navigation buttons
      />
    </div>
  );
}

export default MarkedCalendar;

