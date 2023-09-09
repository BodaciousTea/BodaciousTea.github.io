/* eslint-disable @next/next/no-img-element */
import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";

function Logos() {
  return (
    <Card3D>
      <div className="flex flex-col justify-center px-[10vw]">
        <div className="w-full max-w-[70vw] mx-auto h-[39vw] bg-white p-[1.4vw] flex">
          <img
            className="w-full object-cover"
            src="/images/Group 2.jpg"
            alt=""
          />
        </div>
      </div>
    </Card3D>
  );
}

export default Logos;
