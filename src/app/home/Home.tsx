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

function HomePage() {
  const [scroll, setScroll] = useState(0);

  const pageHandling = () => {
    setScroll((v) => (v === 5 ? 0 : v + 1));
  };

  return (
    <div className="bg-slate-950">
      {/* ... other elements ... */}
      <ReactPageScroller
        customPageNumber={scroll}
        transitionTimingFunction="cubic-bezier(0.77, 0, 0.175, 1)"
        pageOnChange={(e) => setScroll(e)} // Use setScroll directly
      >
        <Welcome />
        <About />
        <Watch
          sections={[
            Banner,
          ]}
        />
        <div className="flex items-center justify-center h-screen"> {/* Center the content vertically */}
          <WatchHere />
        </div>
        <Watch
          sections={[
            NacreousCoffee,
          ]}
        />
        <div>
          <TouchMe />
        </div>
      </ReactPageScroller>
      <div
        className={`fixed z-10 cursor-pointer bottom-[1.8vw] flex justify-center left-0 right-0 duration-500 ${
          scroll === 5 ? "rotate-180" : ""
        }`}
        onClick={pageHandling}
      >
        <img className="w-[1.2vw]" src="/images/Arrow 1.svg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
