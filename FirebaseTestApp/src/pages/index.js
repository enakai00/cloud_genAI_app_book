import Head from "next/head";

export default function HomePage() {
  const element = (
    <>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>My First Next.js Application</h1>
    </>
  );

  return element;
}
