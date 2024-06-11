import React from "react";
import Layout from "./watch/Layout";
import Card3D from "@/components/common/card_3d/Card3D";

function TouchMe() {
  return (
    <Layout>
      <Card3D>
        <div className="absolute left-[6.2vw] top-[1.5vw] z-20">
          <h2 className="text-white text-base font-bold uppercase -mb-[2.8vw]">
            GET IN TOUCH
          </h2>
          <a className="text-sm font-helvetica inline-block" href="mailto:me@tedkoller.com">
            ted@tedkoller.com
          </a>
        </div>
        <div className="relative w-full max-w-[70vw] h-[39] aspect-[9/5] mx-auto bg-1000 flex justify-center items-end">
          <a href="https://www.linkedin.com/in/teddkoller/" target="_blank" rel="noopener noreferrer" className="phone-hover absolute" style={{ width: '25vw', left: '50%', transform: 'translateX(30%)', zIndex: 3 }}>
            <img src="/images/phoneLI.png" alt="LinkedIn" style={{ filter: 'drop-shadow(-20px 20px 30px rgba(0, 0, 0, 0.6))' }} />
          </a>
          <a href="https://github.com/BodaciousTea/BodaciousTea.github.io" target="_blank" rel="noopener noreferrer" className="phone-hover absolute" style={{ width: '25vw', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
            <img src="/images/phoneGH.png" alt="GitHub" style={{ filter: 'drop-shadow(-20px 20px 30px rgba(0, 0, 0, 0.6))' }} />
          </a>
          <a href="https://www.instagram.com/bodacious.tk/" target="_blank" rel="noopener noreferrer" className="phone-hover absolute" style={{ width: '25vw', left: '50%', transform: 'translateX(-130%)', zIndex: 1 }}>
            <img src="/images/phoneIG.png" alt="Instagram" style={{ filter: 'drop-shadow(-20px 20px 30px rgba(0, 0, 0, 0.6))' }} />
          </a>
        </div>
      </Card3D>
    </Layout>
  );
}

export default TouchMe;