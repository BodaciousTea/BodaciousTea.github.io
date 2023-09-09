/* eslint-disable @next/next/no-img-element */
import Card3D from "@/components/common/card_3d/Card3D";
import React from "react";

function Rebranding() {
  return (
    <Card3D>
      <div className="flex flex-col justify-center px-[10vw]">
        <div className="w-full max-w-[70vw] mx-auto h-[39vw] bg-900 p-[1.8vw] flex gap-[2.5vw]">
          <img
            className="aspect-[3/2] object-cover w-[51vw]"
            src="/images/3 2.jpg"
            alt=""
          />
          <div className="text-[1.33vw] font-medium max-w-[13vw]">
            <p>
              Throughout 2020 through 2023, I acted as the chief marketing
              officer for a startup business, as it transitioned and rebranded.
            </p>
            <br />
            <br />
            <p>
              I aided in creating the logo, packaging, online ecommerce site,
              photography, and more. To give it a unique brand identiy, while
              still staying true to the legacy companies values.
            </p>
          </div>
        </div>
      </div>
    </Card3D>
  );
}

export default Rebranding;
