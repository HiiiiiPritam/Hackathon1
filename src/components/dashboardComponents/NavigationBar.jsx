import Link from "next/link";
import React from "react";

function NavigationBar() {
  return (
    <div className="h-[90vh] w-[20vw] rounded-xl  bg-green-200 p-4 ">
      <div className="h-[50%] flex flex-col gap-4   w-full">
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-slate-700 text-white">
          <lord-icon
            src="https://cdn.lordicon.com/vuiggmtc.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href={"/"}>History</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-slate-700 text-white">
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href={"/pendingAppointments"}>Pending Appointments</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-slate-700 text-white">
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href={"/"}>New Appointment</Link>
        </div>
      </div>
      <div className="h-[50%] flex flex-col gap-4  justify-end  w-full">
        <hr className="h-1 bg-amber-800" />
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-slate-700 text-white">
          <lord-icon
            src="https://cdn.lordicon.com/lecprnjb.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href={"/"}>Communities</Link>
        </div>
        <div className="flex p-2 rounded-md justify-center items-center gap-2 bg-slate-700 text-white">
          <lord-icon
            src="https://cdn.lordicon.com/lecprnjb.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <Link href={"/"}>Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
