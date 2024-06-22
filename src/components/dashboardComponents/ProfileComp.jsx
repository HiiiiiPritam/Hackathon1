import React from "react";
import { Avatar } from "flowbite-react";

const ProfileComp = ({ email, name }) => {
  return (
    <div className="rounded-xl cursor-pointer hover:h-20 hover:w-52 flex justify-center items-center gap-2 bg-green-200 h-16 w-48 transition-all duration-300 ease-in-out">
      <div>
        <lord-icon
          src="https://cdn.lordicon.com/hrjifpbq.json"
          trigger="hover"
          style={{ width: "45px", height: "45px" }}
        ></lord-icon>
      </div>
      <h1>{name}</h1>
    </div>
  );
};

export default ProfileComp;
