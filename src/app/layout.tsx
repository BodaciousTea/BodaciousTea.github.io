import React from "react";
import Head from 'next/head';
import "../styles/main.css";
import "animate.css";

export const metadata = {
  title: "TED KOLLER",
  description: "Ted Koller, Multimedia Professional | Photographer | Web Designer | Videographer | Drone Pilot and more...",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </Head>
      {/* The rest of your layout */}
      <body>{children}</body>
    </>
  );
};

export default Layout;