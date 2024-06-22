"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ContentSection({ email }) {
  let router = useRouter()
  let[user, setUser]= useState(null)
  let [MyAppointments, setMyAppointments] = useState([]);
  let [starresAppointments, setStarredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [aStared, setAStarred]= useState(false)
  let [aAccept ,setAAccept]= useState(false)
  const fetchStarred = async () => {

    setIsLoading(true);
    try {
      const res = await fetch(`/api/getStarredAppointments/${email}`,{
        cache: 'no-store',
      });
      const data = await res.json();
      setStarredAppointments(data.starredAppointments);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  let acceptAppointment= async (id)=>{
    try {
      let response= await fetch(`/api/acceptAppointment/${id}`, {
        method: 'PUT',
      })

      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error Accepting APPOINTMENT:', error);

    }
  }
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/getCompleteInfoOfUser/${email}`,{
        
          // Set cache-control headers to prevent response caching on the client side
          cache: 'no-store',
          // Optional: Set other cache-control directives as needed (e.g., no-store)
        
      });
      const data = await res.json();
      setMyAppointments(data.user.MyAppointments);
      setUser(data.user._id)
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  let toggleStarred= async(id)=>{
    try {
      const response = await fetch(`/api/starAnAppointment/${id}`, {
        method: 'PUT',

        // Optionally include updated data in the request body
        // body: JSON.stringify({ isStarred: !isStarred }),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
      // Update your frontend UI with the updated appointment data (data.appointment)
    } catch (error) {
      console.error('Error toggling starred:', error);
      // Handle errors in your frontend UI
    }
  }

  let toggleStarredbyAcceptor= async(id)=>{
    try {
      const response = await fetch(`/api/starByAcceptor/${id}`, {
        method: 'PUT',

        // Optionally include updated data in the request body
        // body: JSON.stringify({ isStarred: !isStarred }),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating appointment: ${response.statusText}`);
      }
      const data = await response.json();
      // Update your frontend UI with the updated appointment data (data.appointment)
    } catch (error) {
      console.error('Error toggling starred:', error);
      // Handle errors in your frontend UI
    }
  }
  

  useEffect(() => {
    fetchData();
    fetchStarred();
  }, [email,aStared,aAccept]);

  return (
    <div className="h-[90vh] w-[60vw] rounded-xl bg-green-200 p-4">
      <style jsx>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
          /* Change to match your background color */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a0a0a0; /* Change to match your background color */
          border-radius: 10px;
        }

        /* Target scrollbars inside table data */
        .custom-scrollbar td::-webkit-scrollbar {
          width: 1px;
          /* Change to match your background color */
        }
        .custom-scrollbar td::-webkit-scrollbar-thumb {
          background-color: #a0a0a0; /* Change to match your background color */
          border-radius: 1px;
        }
      `}</style>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <>
          {/* starred Appointments */}
          <section>
            <div className="text-slate-700 font-bold text-left p-2 rounded-lg">
              <h1 className="text-2xl">Starred Appointments</h1>
            </div>
            <div className="text-white mt-6 h-[26vh] rounded-lg overflow-y-auto custom-scrollbar">
              <div className="">
                <div className="">
                  <table className="flex justify-center items-center bg-transparent w-full rounded-lg border-collapse custom-scrollbar">
                    <tbody className="flex flex-col w-full gap-1 overflow-x-auto custom-scrollbar">
                      {starresAppointments.map((app) => (
                        <div
                        // onClick={()=>{
                        //   router.push(`/profile/${app._id}/`)
                        //  }}
                        key={app._id}
                        className="bg-slate-600 flex justify-evenly shadow-lg rounded-lg overflow-x-auto custom-scrollbar"
                      >
                        <div className="border-t-0 custom-scrollbar px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 w-40 overflow-hidden text-overflow-ellipsis">
                          {app.title}
                        </div>
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                          {app.startTime}
                        </div>
                        <div className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                          {app.endTime}
                        </div>

                        {/*
                        if(user !=app.withWhom){
                              await toggleStarred(app._id)
                              setAStarred(!aStared)
                            }
                            else{
                              await toggleStarredbyAcceptor(app._id)
                              setAStarred(!aStared)
                            }
                        */ }
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md  whitespace-nowrap p-4 w-20 text-left">
                          <button className="cursor-pointer" onClick={async()=>{
                            if(user !=app.withWhom){
                              console.log("inside vagaina");
                              await toggleStarred(app._id)
                              setAStarred(!aStared)
                            }
                            else{
                              console.log("inside vagaina 2");
                              await toggleStarredbyAcceptor(app._id)
                              setAStarred(!aStared)
                            }
                            }} >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="yellow"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </button>
                        </div>
                        {user==app.withWhom?<div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                          <button onClick={async()=>{
                            await acceptAppointment(app._id)
                            setAAccept(!aAccept)}}>{
                              app.isAccepted?"Reject":"Accept"
                            }</button>
                        </div>:<></>}
                      </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
         
         {/* Your appointment */}
          </section>
          <hr className="h-1 bg-amber-800 mb-4 mt-4" />
          <section className=" ">
            <div className="text-slate-700 text-left p-2 font-bold rounded-lg">
              <h1 className="text-2xl">Your Appointments</h1>
            </div>
            <div className="text-white mt-5 h-[39vh] rounded-lg overflow-y-auto custom-scrollbar">
              <div className="">
                <div className="">
                  <table className="flex justify-center items-center bg-transparent w-full rounded-lg border-collapse custom-scrollbar">
                    <tbody className="flex flex-col w-full gap-1 overflow-x-auto custom-scrollbar">
                    {MyAppointments.map((app) => (
                      
                       <div
                       key={app._id}
                      //  onClick={()=>{
                      //   router.push(`/profile/${app._id}/`)
                      //  }}
                        className="bg-slate-600 flex justify-evenly shadow-lg rounded-lg overflow-x-auto custom-scrollbar"
                      >
                        <div className="border-t-0 custom-scrollbar px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 w-40 overflow-hidden text-overflow-ellipsis">
                          {app.title}
                        </div>
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                          {app.startTime}
                        </div>
                        <div className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4 w-40 text-left">
                          {app.endTime}
                        </div>
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md  whitespace-nowrap p-4 w-20 text-left">
                          <button className="cursor-pointer" onClick={async()=>{
                            await toggleStarred(app._id)
                            setAStarred(!aStared)}} >
                              {app.isStarred?<svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="yellow"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>:<svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="currentColor"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>}
                            
                          </button>
                        </div>
                        
                      </div>
                      
                      ))}
                    </tbody>
                 
                 </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ContentSection;
