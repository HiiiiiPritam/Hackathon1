import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import credentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { dbConnect } from "./utils/dbConnect";
import { createUser } from "./queries/user";
import { User } from "./models/User";



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth ({
  session:{
    strategy:"jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    credentialProvider({
      async authorize(credentials){
        if(credentials===null) return null
        try {
       const user= await User.findOne({
        email: credentials?.email
       })
       console.log(user);
       if(user){
          if(!user.password){
            throw new Error("Earlier you logged in using some providers by this email, please use providers")
          }
        const isMatch= await bcrypt.compare(credentials.password, user.password);

        if(isMatch){
          return user;
        }else{
          throw new Error("Email or password incorrect")
        }

       }else{
        throw new Error("User not found")
       }

          
        } catch (error) {
          throw new Error(error)
        }
      }
    })
  ],
  callbacks:{
    signIn: async ({user, account,profile })=>{
      console.log(account);
      if(account?.provider === "google"){
        try {
          console.log("in google sign in ");
          let {email, name, id}= user;
          console.log("in google sign in extrA");

          await dbConnect();
          console.log("in google sign in after connecting");
          
          let alreadyUser= await User.findOne({email});
          
          if(!alreadyUser){
            let temp={
              name,
              email,
            }
            console.log("in google sign in almost done ");
            await createUser(temp)
          }
          console.log("in google sign in almost done 2 ");

          return true;

        } catch (error) {
          throw new AuthError({cause:"Error while creating user"})
        }
      }
      if(account?.provider=="credentials") {
        console.log(" I am in credentials");
        return true}
      if(account?.provider=="github") {
        try {
          let {email, name}= user;
          await dbConnect();
          console.log("in github sign in after connecting");

          let alreadyUser= await User.findOne({email});
   
          if(!alreadyUser){
            let temp={
              name,
              email,
              password:"default"
            }
            console.log("in github sign in almost done ", temp);
            await createUser(temp)
          }
          console.log("in github sign in almost done 2 ");

          return true;

        } catch (error) {
          throw new AuthError({cause:"Error while creating user"})
        }
          return true}
      return false;
    },

  //   authorized({request, auth}){
  //     const {pathname}= request.nextUrl;
  //     if(pathname=="/"||pathname=="/login"||pathname=="/signup"){
  //       return true;
  //     }
  //     return !!auth; 
  //   }
  }
});