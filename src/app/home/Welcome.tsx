import TextSlider from "@/components/common/TextSlider";
import React from "react";

const titles: [string, string][] = [
  ["PHOTOGRAPHER", "bg-100"],
  ["VIDEOGRAPHER", "bg-200"],
  ["WEB DESIGNER", "bg-300"],
  ["DRONE PILOT", "bg-400"],
];

function Welcome() {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{backgroundImage: `url("/images/Section Top 1.jpg")`}}
    >
      <div className="min-h-screen py-10 flex items-center px-[5.5vw]">
        <div className="font-bold text-base text-white">
          <h1 className="">HI, I&apos;M TED KOLLER</h1>
          <div className="flex">
            THE&nbsp;
            <TextSlider texts={titles} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
