import Head from "next/head";

export default function CommonTitle(props) {
  return (
    <Head>
      <title>{props.children} - Record Booth</title>
    </Head>
  );
}
