/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from "react";
import Card3D from "@/components/common/card_3d/Card3D";
import TextReveal from "@/components/common/text_reveal/TextReveal";

interface BannerProps {}

function Banner(props: BannerProps) {
  return (
    <Card3D>
      <div>
        <div className="absolute left-[5.3vw]">
          <h2 className={`text-base leading-none uppercase font-bold`}>
            <TextReveal>
              <span className="text-linear bg-100">Photography</span>
            </TextReveal>
          </h2>
        </div>
        <div
          id="photography"
          className="flex flex-col justify-center px-[10vw]"
        >
          <div className="w-full max-w-[70vw] mx-auto">
            <img
              className="w-full"
              src="/images/Eva Walker Senior 1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </Card3D>
  );
}

export default Banner;
