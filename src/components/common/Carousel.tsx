import React, { useState } from 'react';
import Card3D from "@/components/common/card_3d/Card3D";

interface CarouselItemProps {
  title: string;
  imageUrl: string;
  onButtonClick: () => void;
  titleStyle: React.CSSProperties;
  isActive: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, imageUrl, onButtonClick, titleStyle, isActive }) => (
  <Card3D>
    <div className='carousel-item'>
      <img className="carousel-image" src={imageUrl} alt={title} />
      {isActive && (
        <>
          <h2 className="carousel-title" style={{
              ...titleStyle,
              position: 'absolute',
              top: '-10%',
              left: '5%',
              fontSize: '7vw',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              zIndex: 5
            }}>
            {title}
          </h2>
          <button onClick={onButtonClick} className="button-style view-all-button" style={{
              fontSize: '1.8vw',
              padding: '.3vw 1.3vw',
              position: 'absolute',
              bottom: '8%',
              left: '80%',
            }}>
            VIEW ALL
          </button>
        </>
      )}
    </div>
  </Card3D>
);

const LeftArrow = () => (
  <div className='nav left'>
    <img src='/images/Arrow 1.svg' alt='Left' style={{ transform: 'rotate(180deg)' }} />
  </div>
);

const RightArrow = () => (
  <div className='nav right'>
    <img src='/images/Arrow 1.svg' alt='Right' />
  </div>
);

interface CarouselProps {
  items: CarouselItemProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const count = items.length;

  return (
    <div className='carousel-wrapper'>
      <div className='carousel'>
        <button className={`nav-button left ${active <= 0 ? 'opacity-40' : ''}`} 
                onClick={() => active > 0 && setActive(active - 1)}
                style={{ opacity: active <= 0 ? 0.4 : 1 }}>
          <LeftArrow />
        </button>
        {items.map((item, i) => (
          <div key={i} className='card-container' style={{
              pointerEvents: active === i ? 'auto' : 'none',
              opacity: Math.abs(active - i) >= 3 ? '0' : '1',
              display: Math.abs(active - i) > 3 ? 'none' : 'block',
              zIndex: 20 - Math.abs(active - i),
              ...(i === active ? {} : {
                '--active': 1,
                '--offset': (active - i) / 3,
                '--direction': Math.sign(active - i),
                '--abs-offset': Math.abs(active - i) / 3,
              }) as React.CSSProperties,
            }}>
            <CarouselItem {...item} isActive={i === active} />
          </div>
        ))}
        <button className={`nav-button right ${active >= count - 1 ? 'opacity-40' : ''}`} 
                onClick={() => active < count - 1 && setActive(active + 1)}
                style={{ opacity: active >= count - 1 ? 0.4 : 1 }}>
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default Carousel;