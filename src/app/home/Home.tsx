/* eslint-disable @next/next/no-img-element */
"use client";
import React, {useEffect, useState} from "react";
import ReactPageScroller from "react-page-scroller";
import Welcome from "./Welcome";
import About from "./About";
import WatchHere from "./watch/WatchHere";
import Banner from "./photography/Banner";
import NacreousCoffee from "./nacreous/NacreousCoffee";
import TouchMe from "./TouchMe";
import Watch from "./watch/Watch";
import Rebranding from "./nacreous/Rebranding";
import Logos from "./nacreous/Logos";
import AsideScrollbar from "./AsideScrollbar";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function HomePage() {
  const [scroll, setScroll] = useState(0);
  const handleScroll = (e: number) => {
    setScroll(e);
  };

  const pageHandling = () => {
    setScroll((v) => (v === 5 ? 0 : v + 1));
  };

  return (
    <div className="bg-slate-950">
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
      pageOnChange={handleScroll}
      >
        <Welcome />
        <About />
        <Watch
          skipFirstPaginate
          sections={[WatchHere]}
        />

<Watch
  sections={[
    Banner,
  ]}
/>
<Watch
  sections={[
    NacreousCoffee,
    Rebranding,
    Logos
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
