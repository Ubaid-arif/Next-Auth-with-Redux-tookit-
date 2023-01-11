import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Phone Number",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          Phone_Number: { label: "Phone Number", type: "text", placeholder: "03*********" },
        //   password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            if(credentials.Phone_Number === "03212478789" ){
                return(
                     {
                        id : "2",
                        Phone_Number: "03212478789",
                        name:"Ubaid",
                         
                     }
                )
            }
        }
    }),
    GitHubProvider({
        clientId:"c229adc2d57634d5fadb",
        clientSecret:"8ca81811ed93f4be5b0bfd55419594d1c6dcaab3",
    }),
  ],
  callbacks: {
 jwt :  ({ token , user }) => {
    if(user){
        token.id = user.id
    }
    // console.log("token========>" , token)
    return token;
 } ,

 session : ({session , token}) => {
    if(token ){
        session.id = token.id
    }
    // console.log("session========>" , session)
    return session;
 }
  },
secret : "test",
jwt : {
    secret : "test",
    encryption : true,
}




};

export default NextAuth(authOption);

//   // Add logic here to look up the user from the credentials supplied
//   const user = {Phone_Number: "03212478789", password: "123456789" }

//   if (user) {
//     console.log("------user------" , credentials.Phone_Number )
//     // Any object returned will be saved in `user` property of the JWT
//     return user
//   } else {
//     // If you return null then an error will be displayed advising the user to check their details.
//     return null

//     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//   }