import React, { useRef, useState, useEffect } from "react";
import sx from "./card_3d.module.css";

interface Card3DProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Card3D: React.FC<Card3DProps> = ({ children, style }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [motionPreference, setMotionPreference] = useState(true);

  useEffect(() => {
    const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
    setMotionPreference(motionMatchMedia.matches);
  }, []);

  const THRESHOLD = 3; // Reduced threshold

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current) {
      const { clientX, clientY } = e;
      const { clientWidth, offsetLeft, offsetTop } = cardRef.current;

      const horizontal = (clientX - offsetLeft) / clientWidth;
      const vertical = (clientY - offsetTop) / clientWidth;
      const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
      const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

      cardRef.current.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    }
  };

  const resetStyles = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(${cardRef.current.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  if (!motionPreference) {
    return (
      <div
        className={sx.card}
        onMouseMove={handleHover}
        onMouseLeave={resetStyles}
        ref={cardRef}
        style={style}
      >
        <div className={sx.content}>{children}</div>
      </div>
    );
  }

  return (
    <div className={sx.card}>
      <div className={sx.content}>{children}</div>
    </div>
  );
};

export default Card3D;
