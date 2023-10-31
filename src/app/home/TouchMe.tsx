/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "./watch/Layout";
import Card3D from "@/components/common/card_3d/Card3D";

function TouchMe() {
  return (
    <Layout>
      <Card3D>
        <div className="absolute left-[6.2vw] top-[1.5vw]">
          <h2
            className={`text-white text-base font-bold uppercase -mb-[2.8vw]`}
          >
            GET IN TOUCH
          </h2>
          <a
            className="text-sm font-helvetica inline-block"
            href="mailto:me@tedkoller.com"
          >
            me@tedkoller.com
          </a>
        </div>
        <div className="flex flex-col justify-center px-[10vw]">
          <div className="w-full max-w-[70vw] h-[39] aspect-[9/5] mx-auto bg-1000 flex items-end">
            <img className="w-full" src="/images/Group 3.png" alt="" />
          </div>
        </div>
      </Card3D>
    </Layout>
  );
}

export default TouchMe;
