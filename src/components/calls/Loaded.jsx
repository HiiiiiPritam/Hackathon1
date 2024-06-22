
///I have given this folder and file stupid names which makes no sense , please dont judge ,I will highly appreciate if you change it

"use client";
import { doSocialLogout } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function HomeComp({ email }) {
  const router = useRouter();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    if (email) {
      const res = await fetch(`/api/getUserByEmail?email=${email}`);
      const data = await res.json();
      setUser(data.user);
      console.log(data.user); // Log the fetched user data
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    fetchUser();
    console.log("user", user);
  }, [email]); // Add email as a dependency

  const handleLogout = async (event) => {
    event.preventDefault();
    await doSocialLogout();
    router.refresh();
  };

  return (
    <>
      Home sweet Home
      {user?.id ? (
        <>
          <p>Hello, {user.name}</p>
          <p>Here's your email: {user.email}</p>
          <form onSubmit={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default HomeComp;
