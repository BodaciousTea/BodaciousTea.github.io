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
import VideoProduction from "./watch/VideoProduction";
import Watch from "./watch/Watch";
import Visualization from "./watch/Visualization";
import Album from "./photography/Album";
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
          sections={[WatchHere, VideoProduction, Visualization]}
        />

        <Watch
          sections={[
            Banner,
            [
              Album,
              {
                offset: "py-[1.5vw]",
                thumbs: [
                  "/images/SNY05489 (1) 2.jpg",
                  "/images/Quinn Senior 1.jpg",
                  "/images/26 1.jpg",
                ],
              },
            ],
            [
              Album,
              {
                offset: "py-[1.5vw]",
                thumbs: [
                  "/images/NorthRelays (SNY)-11 1.jpg",
                  "/images/8 1.jpg",
                  "/images/NorthRelays (SNY)-01 1.jpg",
                ],
              },
            ],
            [
              Album,
              {
                offset: "py-[1.5vw]",
                thumbs: [
                  "/images/25 1.jpg",
                  "/images/31 1.jpg",
                  "/images/Wyoming-84 1.jpg",
                ],
              },
            ],
          ]}
        />
        <Watch
          sections={[
            NacreousCoffee,
            Rebranding,
            Logos,
            [
              Album,
              {
                offset: "py-[3vw]",
                baseTone: "bg-900",
                thumbs: [
                  "/images/3398 1.jpg",
                  "/images/24 1.jpg",
                  "/images/SNY09178 1.jpg",
                ],
              },
            ],
            [
              Album,
              {
                offset: "py-[1.5vw]",
                baseTone: "bg-900",
                thumbs: [
                  "/images/CC Graphic Design 1.jpg",
                  "/images/SNY09182 1.jpg",
                ],
              },
            ],
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
