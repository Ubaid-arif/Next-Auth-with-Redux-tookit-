import { useDispatch, useSelector } from 'react-redux'; //updated
import { Decrement , Increment , ReduxCounterState} from '../Store/CountSlice'; // updated
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Todos } from '../Store/TodoSlice';

const counter = () => {
  const dispatch = useDispatch();
  const Data = useSelector(ReduxCounterState); 
  const ReduxTodoData = useSelector(Todos); 
  console.log("ReduxTodoData===>" , ReduxTodoData)

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
        <div>
          <Link href="/cart"> Cart </Link>
          <Link href="/"> Home </Link>
          <button onClick={signOut}> Signout</button>
        </div>
        <div>
  
 
          <h1>{Data}</h1>
          <button onClick={()=>{dispatch(Increment(Data))}}> Increment button </button>
          <br/> <br/>
          <button onClick={()=>{dispatch(Decrement(Data))}}> Decrement button </button>
          {/* <button onClick={()=>{setCount(count + 5)}}>  5 Increment button </button> */}


        </div>
      </>
    );
  }
};

export default counter;
