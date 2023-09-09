/* eslint-disable @next/next/no-img-element */
import React, {Fragment} from "react";
import Layout from "./Layout";
import Pagination from "./Pagination";
import Card3D from "@/components/common/card_3d/Card3D";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function VideoProduction() {
  return (
    <Card3D>
      <div>
        <h2 className="text-base leading-[100%] font-bold absolute left-[6.2vw] top-1/2 -translate-y-1/2">
          <TextReveal>
            <span className="text-linear bg-500">
              VIDEO <br /> PRODUCTION
            </span>
          </TextReveal>
        </h2>
        <div className="flex flex-col justify-center px-[10vw]">
          <div className="w-full max-w-[70vw] mx-auto h-[39] bg-600 p-[3.6vw] flex justify-end">
            <img
              className="aspect-square w-[32vw]"
              src="/images/(1) 1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </Card3D>
  );
}

export default VideoProduction;
