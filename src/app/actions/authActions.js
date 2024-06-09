"use server"

import { signIn, signOut } from "@/auth";



export async function doSocialLogin(formData){

  let action = formData.get('action')
  console.log(action);
  await signIn(action,{redirectTo:"/"})
}

export async function doSocialLogout(formData){
  await signOut({redirectTo:"/"})
}

export async function doCredentialLogin(formData){

  try {

    const response= await signIn("credentials", {
      email:formData.get("email"),
      password:formData.get("password"),
      redirect:false
    })

    return response;
    
  } catch (error) {
    throw new Error("Error , something wentr wrong")
  }
  await signOut({redirectTo:"/"})
}