import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function WatchHere() {
  return (
    <div className="relative mx-auto w-[56vw]">
      <div className="absolute top-0 left-0 translate-x-[-20%] translate-y-[-70%] z-10">
        <h2 className="leading-none uppercase font-light" style={{ fontSize: '3rem', color: 'white' }}> {/* Inline style for white color */}
          <TextReveal>
            <span>
              2023 First Place<br />BPA National Winner
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
          className="uppercase text-md leading-none font-normal border-[0.117vw] button-style absolute bottom-[5.2vw] left-0 -translate-x-1/2 cursor-pointer"
        >
          WATCH HERE
        </a>
      </Card3D>
    </div>
  );
}

export default WatchHere;
