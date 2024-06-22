"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateAppointment({ email }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCreateAppointment = async () => {
    try {
      const res = await fetch("/api/AddNewAppointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          appointmentDate,
          start:startTime,
          end:endTime,
          ByWhomemail:email,
          withWhomID:"665e87d576f2d278d290d307"
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("appointment created successfully")
      } else {
       alert("some error line 34")
      }
    } catch (error) {
      alert("Error creating appointment:", error)
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="h-[90vh] w-[60vw] rounded-xl bg-green-200 p-4">
      <h1>Create Appointment</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Appointment Date</label>
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          minDate={new Date()}
          className="border p-2"
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2"
        />
      </div>
      <button onClick={handleCreateAppointment} className="mt-4 p-2 bg-blue-500 text-white">
        Create Appointment
      </button>
    </div>
  );
}

export default CreateAppointment;
