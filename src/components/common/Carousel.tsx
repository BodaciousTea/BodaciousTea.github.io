import React, { useState, useEffect } from 'react';
import Card3D from "@/components/common/card_3d/Card3D";

// Device detection
const checkIfMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// CarouselItem component for both desktop and mobile
interface CarouselItemProps {
  title?: string; // Optional for mobile
  imageUrl: string;
  onButtonClick: () => void;
  titleStyle?: React.CSSProperties; // Optional for mobile
  isActive: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, imageUrl, onButtonClick, titleStyle, isActive }) => {
  const isMobile = checkIfMobile();

  return (
    <Card3D>
      <div className='carousel-item'>
        <img className="carousel-image" src={imageUrl} alt={title || "Carousel Image"} />
        {isActive && (
          <>
            {isMobile ? (
              <button
                onClick={onButtonClick}
                className="button-style resume-button uppercase text-sm leading-none font-normal lg:text-xs lg:px-2 lg:py-1"
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '-18%'
                }}
              >
                VIEW ALL
              </button>
            ) : (
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
          </>
        )}
      </div>
    </Card3D>
  );
};

// Arrow components
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

// Main Carousel component
interface CarouselProps {
  items: CarouselItemProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const count = items.length;
  const isMobile = checkIfMobile();

  return (
    <div className='carousel-wrapper' style={isMobile ? { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' } : {}}>
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

