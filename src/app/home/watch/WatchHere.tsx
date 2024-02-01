import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function WatchHere() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


  return (
    <div className="relative mx-auto w-[56vw]">
      <div className="absolute top-0 left-0 translate-x-[-30%] translate-y-[-50%] z-10">
        <h2 className="leading-none uppercase font-light text-[2.7rem] text-white"> {/* Removed inline style for color */}
          <TextReveal>
            <span>
              2023 First Place<br className={!isMobile ? 'hidden' : ''} /> BPA National Winner {/* Hide <br> on desktop */}
            </span>
          </TextReveal>
        </h2>
      </div>
      <Card3D>
        <img className="w-full" src="/images/featured-tile.jpg" alt="" />
        <a
          href="https://www.youtube.com/watch?v=pQLBevvG9u4"
          target="_blank"
          rel="noopener noreferrer"
          className={`button-style uppercase text-md leading-none font-normal border-[0.117vw] absolute left-1/2 -translate-x-1/2 cursor-pointer ${isMobile ? '' : 'bottom-[5.2vw]'}`} // Apply bottom positioning for desktop here
          style={isMobile
              ? { bottom: '-15vh', whiteSpace: 'nowrap', width: 'auto' }
              : { bottom: '[5.2vw]' }}
        >
          WATCH HERE
        </a>
      </Card3D>
    </div>
  );
}

export default WatchHere;

