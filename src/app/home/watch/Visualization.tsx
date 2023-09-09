/* eslint-disable @next/next/no-img-element */
import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";

function Visualization() {
  return (
    <Card3D>
      <div className="w-full max-w-[70vw] mx-auto aspect-[1800/1012]">
        <img className="w-full" src="/images/Comp 1 (1) 1.jpg" alt="" />
      </div>
    </Card3D>
  );
}

export default Visualization;
