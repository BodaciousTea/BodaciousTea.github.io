/* eslint-disable @next/next/no-img-element */
"use client"; // Mark the entire component as a client component
import React, { useEffect, useState } from "react";
import ReactPageScroller from "react-page-scroller";
import Welcome from "./Welcome";
import About from "./About";
import TickleMe from "./TouchMe";

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const checkIfMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkIfMobile);

    if (checkIfMobile) {
      import('../../styles/main.mobile.css');
    } else {
      import('../../styles/main.css');
    }
  }, []);

  const pageHandling = () => {
    setScroll((v) => (v === 2 ? 0 : v + 1)); // Adjust the maximum scroll value
  };

  return (
    <div className="bg-slate-950">


      <ReactPageScroller
        customPageNumber={scroll}
        transitionTimingFunction="cubic-bezier(0.77, 0, 0.175, 1)"
        pageOnChange={setScroll}
      >
        <div>
          <Welcome />
        </div>
        <div>
          <About />
        </div>
        <div>
          <TickleMe />
        </div>
      </ReactPageScroller>

      <div
        className={`fixed z-10 cursor-pointer bottom-[1.8vw] flex justify-center left-0 right-0 duration-500 ${
          scroll === 2 ? "rotate-180" : "" // Adjust the maximum scroll value
        }`}
        onClick={pageHandling}
      >
        <img className="w-[1.2vw]" src="/images/Arrow 1.svg" alt="Scroll Arrow" />
      </div>
    </div>
  );
}

export default HomePage;
