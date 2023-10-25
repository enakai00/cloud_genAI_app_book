import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  const element = (
    <>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>My First Next.js Application</h1>
      <h2><Link href="./currentTime">Current Time</Link></h2>
      <h2><Link href="./loginMenu">Login Menu</Link></h2>
    </>
  );

  return element;
}
