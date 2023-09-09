/* eslint-disable @next/next/no-img-element */
import React from "react";
import TitleAnimate from "../photography/TitleAnimate";
import Card3D from "@/components/common/card_3d/Card3D";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function NacreousCoffee() {
  return (
    <Card3D>
      <div>
        <div className="absolute left-[9vw] top-1/2 -translate-y-1/2">
          <h2 className={`text-white text-xl text-center font-le-major`}>
            <TextReveal style={{padding: `1vw 2.5vw`, margin: `0 -2.5vw`}}>
              <span>
                Nacreous
                <br />
                Coffee
              </span>
            </TextReveal>
          </h2>
        </div>
        <div className="flex flex-col justify-center px-[10vw]">
          <div className="w-full max-w-[70vw] mx-auto">
            <img
              className="w-full"
              src="/images/Zenith Volcano Shot 01 1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </Card3D>
  );
}

export default NacreousCoffee;
