import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";

function WatchHere() {
  return (
    <Card3D>
      <div className="ml-[14.5vw] w-[56vw] relative">
        <img className="w-full" src="/images/BPA TILE 1 1.jpg" alt="" />
        <a
          href="https://www.youtube.com/watch?v=pQLBevvG9u4"
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase text-md leading-none font-normal border-[0.117vw] button-style absolute bottom-[5.2vw] right-0 translate-x-1/2 cursor-pointer"
        >
          WATCH HERE
        </a>
      </div>
    </Card3D>
  );
}

export default WatchHere;