import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function WatchHere() {
  return (
    <div className="relative mx-auto w-[56vw]">
      <div className="absolute top-0 left-0 translate-x-[-30%] translate-y-[-50%] z-10">
        <h2 className="leading-none uppercase font-light" style={{ fontSize: '2.7rem', color: 'white' }}> {/* Inline style for white color */}
          <TextReveal>
            <span>
              2023 First Place BPA National Winner
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
  className="button-style uppercase text-md leading-none font-normal border-[0.117vw] absolute left-1/2 -translate-x-1/2 cursor-pointer"
  style={{ bottom: '-15vh', whiteSpace: 'nowrap', width: 'auto' }} // Adjust the bottom, whiteSpace, and width as needed
>
  WATCH HERE
</a>
      </Card3D>
    </div>
  );
}

export default WatchHere;