import React, { useState, useEffect } from "react";
import TextReveal from "@/components/TextReveal";

function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <div>
      <section
        id="about"
        className="about-section relative min-h-screen bg-cover bg-center px-[3.8vw] pt-[6vw] pb-[10vw]"
        style={{ backgroundImage: `url("/images/Section Middle 1.jpg")` }}
      >
        <div className="mountain-mask"></div>

        <div className="text-center absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
          {isMobile ? (
            <>
              <h2 className="about-text font-bold">
                <TextReveal><span>ABOUT</span></TextReveal>
              </h2>
              <h2 className="ted-text font-bold">
                <TextReveal><span>TED</span></TextReveal>
              </h2>
            </>
          ) : (
            <h2 className="text-masthead font-bold text-4xl lg:text-5xl">
              <TextReveal><span>ABOUT ME</span></TextReveal>
            </h2>
          )}
        </div>

        <div className={`text-center relative z-30 ${isMobile ? 'mt-[30vh]' : 'mt-[55vh]'}`}>
          <p
            style={isMobile ? { fontSize: '22px', lineHeight: '1.2', paddingLeft: '20px', paddingRight: '20px' } : {}}
            className="text-custom font-normal mb-10 mx-auto max-w-[60ch] md:max-w-[40ch] lg:max-w-[50ch]"
          >
            I am a versatile creative with experience in digital photography, medium format film photography, software engineering, UI/UX, drone operation, web design, and video production.
          </p>
          <div className="flex justify-center space-x-4">
            <div>
              <a
                href="/2025_Ted_Koller_Resume_Fullstack-Software-Video-Production.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-button uppercase text-sm leading-none font-normal"
              >
                RÉSUMÉ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
