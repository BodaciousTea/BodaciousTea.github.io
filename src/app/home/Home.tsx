/* eslint-disable @next/next/no-img-element */
"use client"; // Mark the entire component as a client component
import React, { useEffect, useState } from "react";
import ReactPageScroller from "react-page-scroller";
import Welcome from "./Welcome";
import About from "./About";
import WatchHere from "./watch/WatchHere";
import Banner from "./photography/Banner";
import NacreousCoffee from "./nacreous/NacreousCoffee";
import TouchMe from "./TouchMe";
import Watch from "./watch/Watch";
import AsideScrollbar from "./AsideScrollbar";
import TextReveal from "@/components/common/text_reveal/TextReveal";
import Head from 'next/head';

function HomePage() {
  // Mobile redirection logic with replace state
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.replace("https://tedkoller.com/mobile/");
    }
  }, []);

  const [scroll, setScroll] = useState(0);

  const pageHandling = () => {
    setScroll((v) => (v === 5 ? 0 : v + 1));
  };

  const title = "Home | Ted Koller Portfolio";
  const description = "Ted Koller, Multimedia Professional | Photographer | Web Designer | Videographer | Drone Pilot and more...";
  const ogImagePath = '/images/open-graph-image.jpg';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Photography, Web Design, Videography, Drone Piloting, Multimedia" />
        <meta name="author" content="Ted Koller" />
        <link rel="icon" sizes="32x32" href="/images/favicon%2032x32.png" type="image/png" />
        <link rel="icon" sizes="192x192" href="/images/favicon%20192x192.png" type="image/png" />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImagePath} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImagePath} />
      </Head>
      <div className="bg-slate-950">
        {/* About Button */}
        <span
          onClick={() => setScroll(1)}
          className={`text-lg [writing-mode:vertical-lr] rotate-180 absolute top-1/2 left-[2.3vw] -translate-y-1/2 font-medium z-10 duration-150 cursor-pointer ${
            scroll >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          About
        </span>

        <AsideScrollbar scroll={scroll} />
        <ReactPageScroller
          customPageNumber={scroll}
          transitionTimingFunction="cubic-bezier(0.77, 0, 0.175, 1)"
          pageOnChange={setScroll}
        >
          <Welcome />
          <About />
          <Watch sections={[Banner]} />
          <div className="flex items-center justify-center h-screen">
            <WatchHere />
          </div>
          <Watch sections={[NacreousCoffee]} />
          <TouchMe />
        </ReactPageScroller>

        <div
          className={`fixed z-10 cursor-pointer bottom-[1.8vw] flex justify-center left-0 right-0 duration-500 ${
            scroll === 5 ? "rotate-180" : ""
          }`}
          onClick={pageHandling}
        >
          <img className="w-[1.2vw]" src="/images/Arrow 1.svg" alt="Scroll Arrow" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
