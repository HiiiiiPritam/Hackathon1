
import { auth } from "@/auth";
import HomeComp from "@/components/calls/Loaded";
import ProfileComp from "@/components/dashboardComponents/ProfileComp";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  
  let session = await auth();
  let user = session?.user;

 if(user){
  redirect('/dashboard')
 }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <h1 className="text-white">This is the home page</h1>
        {user ? <HomeComp email={user?.email} /> : <></>}
      </div>
    </>
  );
}
