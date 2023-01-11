import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const cart = () => {

  const session = useSession();
  if (session.data === null) {
    return (
      <>
        <h3> Please Login </h3>
        <br />
        <button onClick={signIn}> Login</button>
      </>
    );
  } else {
    return (
      <>
        <h1> This is cart </h1>
        <br />

        <Link href="/counter"> counter</Link>

        <Link href="/"> Home </Link>
        <button onClick={signOut}> Signout</button>
      
      </>
    );
  }
};

export default cart;
