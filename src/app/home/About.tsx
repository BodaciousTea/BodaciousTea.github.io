import React from "react";
import TextReveal from "@/components/common/text_reveal/TextReveal";

function About() {
  return (
    <div>
      <section
        id="about"
        className="about-section relative min-h-screen bg-cover bg-center px-[3.8vw] pt-[6vw] pb-[10vw]"
        style={{ backgroundImage: `url("/images/Section Middle 1.jpg")` }}
      >
        <div className="mountain-mask"></div>

        <div className="text-center absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
          <h2 className="about-text font-bold">
            <TextReveal><span>ABOUT</span></TextReveal>
          </h2>
          <h2 className="ted-text font-bold">
            <TextReveal><span>TED</span></TextReveal>
          </h2>
        </div>

        <div className="text-center relative z-30 mt-[30vh]"> {/* Adjusted margin-top */}
          <p 
            style={{ fontSize: '22px', lineHeight: '1.2', paddingLeft: '20px', paddingRight: '20px' }}
            className="font-medium mb-10 mx-auto max-w-[60ch] md:max-w-[40ch] lg:max-w-[50ch]"
          >
            I am passionate about what I do as I <br />
            pursue skills in technology, photography, <br />
            videography, drone operation, web-<br />
            design, and more.
          </p>
          <a
            href="/resume2023.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button uppercase text-sm leading-none font-normal button-style lg:text-xs lg:px-2 lg:py-1"
          >
            RÉSUMÉ
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
