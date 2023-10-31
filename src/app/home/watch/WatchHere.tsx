/* eslint-disable @next/next/no-img-element */
import Card3D from "@/components/common/card_3d/Card3D";
import React, { useState } from "react";

function WatchHere() {
  const [hovered, setHovered] = useState(false);

  const hoverStyles = hovered
    ? { textDecoration: 'underline', textDecorationThickness: '1px' }
    : {};

  return (
    <Card3D>
      <div className="ml-[14.5vw] w-[56vw] relative">
        <img className="w-full" src="/images/BPA TILE 1 1.jpg" alt="" />
        <a
          href="https://www.youtube.com/watch?v=pQLBevvG9u4"
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase text-md leading-none font-normal border-[0.117vw] border-white px-[0.82vw] absolute bottom-[5.2vw] right-0 translate-x-1/2 cursor-pointer"
          style={hoverStyles}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          WATCH HERE
        </a>
      </div>
    </Card3D>
  );
}

export default WatchHere;
