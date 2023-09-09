import TextReveal from "@/components/common/text_reveal/TextReveal";
import React from "react";

interface AboutProps {}

function About(props: AboutProps) {
  return (
    <div>
      <section
        id="about"
        className="min-h-screen bg-cover bg-center flex flex-col justify-between px-[3.8vw] pt-[6vw] pb-[5vw]"
        style={{backgroundImage: `url("/images/Section Middle 1.jpg")`}}
      >
        <h2 className={`text-base font-bold`}>
          <TextReveal>
            <span>ABOUT ME</span>
          </TextReveal>
        </h2>
        <div className="text-xs grid grid-cols-2 gap-[17vw]">
          <div>
            <p>
              Throughout highschool, I made an effort to build traits that would
              help me in the future, and ones that I am passionate about.
            </p>
          </div>
          <div>
            <p className="text-right">
              I am currently pursuing a major in digital media technology, as
              well as a minor in unmanned aerial systems, flight and operation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
