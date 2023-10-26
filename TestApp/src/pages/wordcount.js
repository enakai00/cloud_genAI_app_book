import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth, signInWithGoogle } from "lib/firebase";
import { signOut } from "firebase/auth";
import Wordcount from "components/Wordcount";


export default function WordcountPage() {
  const [loginUser, setLoginUser] = useState(null);

  // Register login state change handler
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoginUser(user);
    });
    return unsubscribe;
  }, []);

  let element;

  if (loginUser) {
    element = (
      <>
        <Wordcount />
        <br/>
	<button onClick={() => signOut(auth)}>Logout</button>
      </>
    );
  } else {
    element = (
      <>
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Word Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {element}
    </>
  );
}
