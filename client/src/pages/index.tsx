import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { DropzoneButton } from "~/components/Dropzone";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Video Streaming App</title>
        <meta name="description" content="Video Streaming App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full p-10">
        <DropzoneButton />
      </div>
    </>
  );
};

export default Home;
