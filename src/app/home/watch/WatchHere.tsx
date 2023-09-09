/* eslint-disable @next/next/no-img-element */
import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";

function WatchHere() {
  return (
    <Card3D>
      <div className="ml-[14.5vw] w-[56vw] relative">
        <img className="w-full" src="/images/BPA TILE 1 1.jpg" alt="" />
        <button
          type="button"
          className="uppercase text-md leading-none font-normal border-[0.117vw] border-white px-[0.82vw] absolute bottom-[5.2vw] right-0 translate-x-1/2"
        >
          WATCH HERE
        </button>
      </div>
    </Card3D>
  );
}

export default WatchHere;
