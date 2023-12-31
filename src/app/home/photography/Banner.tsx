import React from 'react';
import Carousel from '@/components/common/Carousel';

function Banner() {
  const carouselItems = [
    {
      title: 'PHOTOGRAPHY',
      imageUrl: '/images/Eva Walker Senior 1.jpg',
      titleStyle: { background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)' },
      onButtonClick: () => window.open('https://www.tedkoller.com/gallery', '_blank')
    },
    {
      title: 'WEB DESIGN',
      imageUrl: '/images/webdesign1.jpg',
      titleStyle: { background: 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)' },
      onButtonClick: () => {/* handle click for Web Design */}
    },
    {
      title: 'VIDEO PRODUCTION',
      imageUrl: '/images/videoprod1.jpg',
      titleStyle: { background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)' },
      onButtonClick: () => {/* handle click for Video Production */}
    }
  ].map(item => ({ ...item, isActive: false }));

  return (
    <div>
      <Carousel items={carouselItems} />
    </div>
  );
}

export default Banner;
