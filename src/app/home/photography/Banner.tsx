import React, { useState, useEffect } from 'react';
import Carousel from '@/components/common/Carousel';

function Banner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const baseCarouselItems = [
    {
      title: 'PHOTOGRAPHY',
      desktopImageUrl: '/images/Eva Walker Senior 1.jpg',
      mobileImageUrl: '/images/carouselMobile1.png',
      titleStyle: { background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)' },
      onButtonClick: () => window.open('https://www.tedkoller.com/gallery', '_blank')
    },
    {
      title: 'WEB DESIGN',
      desktopImageUrl: '/images/webdesign1.jpg',
      mobileImageUrl: '/images/carouselMobile2.png',
      titleStyle: { background: 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)' },
      onButtonClick: () => {/* handle click for Web Design */}
    },
    {
      title: 'VIDEO PRODUCTION',
      desktopImageUrl: '/images/videoprod1.jpg',
      mobileImageUrl: '/images/carouselMobile3.png',
      titleStyle: { background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)' },
      onButtonClick: () => {/* handle click for Video Production */}
    }
  ];

  const carouselItems = baseCarouselItems.map(item => ({
    ...item,
    imageUrl: isMobile ? item.mobileImageUrl : item.desktopImageUrl,
    title: isMobile ? undefined : item.title,
    titleStyle: isMobile ? undefined : item.titleStyle,
    isActive: false
  }));

  return (
    <div>
      <Carousel items={carouselItems} />
    </div>
  );
}

export default Banner;

