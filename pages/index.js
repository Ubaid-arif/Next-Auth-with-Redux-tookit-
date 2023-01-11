import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  const session = useSession();
  // console.log("session------->", session);
  if (session.data === null) {
    return (
      <>
        <h3> Please Login </h3>
        <br />
        <button onClick={signIn}> Login</button>
      </>
    );
  }
  return (
    <>
      <h1> You are login {session?.data?.user?.name}</h1>
      <h3> Home page </h3>
      <br />
      <Link href="/cart"> cart</Link>
      <br /> <br />
      <Link href="/counter"> counter </Link>
      <br /> <br /> <br />
      <Link href="/Todo"> Todo </Link>
      <br /> <br /> <br />
      <button onClick={signOut}> Signout</button>
    </>
  );
}


