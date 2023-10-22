import Head from "next/head";
import Header from "components/HomePageTitle";
import Message from "components/HomePageMessage";

export default function ApplicationMenuPage() {
  const element = (
    <>
      <Head>
        <title>My Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Message />
    </>
  );

  return element;
}
