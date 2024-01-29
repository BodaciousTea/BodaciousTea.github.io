import React, { useState, useEffect } from "react";

function Welcome() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPastWelcome = window.scrollY > window.innerHeight;
      setIsScrolled(isPastWelcome);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-screen bg-cover bg-center relative welcome-section" style={{ backgroundImage: `url("/images/Section Top 1.jpg")` }}>
      <div className="cloud-banner-container">
        <img src="/images/cloudsBannerText.png" alt="Clouds Banner" className="cloud-banner" />

        <img src="/images/cloud2.png" className={`cloud cloud2 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 2" />
        <img src="/images/cloud3.png" className={`cloud cloud3 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 3" />
        <img src="/images/cloud4.png" className={`cloud cloud4 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 4" />
        <img src="/images/cloud5.png" className={`cloud cloud5 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 5" />        
        <img src="/images/cloud1.png" className={`cloud cloud1 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 1" />
      </div>
    </div>
  );
}

export default Welcome;
