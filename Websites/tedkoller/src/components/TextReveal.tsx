import React, { useEffect, useRef, useState } from "react";
import sx from "./text_reveal.module.css"; // ✅ Make sure this file exists

interface TextRevealProps {
  children?:
    | React.ReactElement<HTMLSpanElement>
    | React.ReactElement<HTMLSpanElement>[];
  direction?: "down" | "up";
  mode?: "in" | "out";
  leading?: number;
  style?: React.CSSProperties;
}

function TextReveal({
  children,
  direction = "up",
  mode = "in",
  leading,
  style,
}: TextRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef}>
      {React.Children.map(children, (child) => (
        <div
          className={inView ? sx.element : "opacity-0"}
          style={leading ? { lineHeight: leading, ...style } : style}
        >
          {React.isValidElement(child) &&
            React.cloneElement(child, {
              className: `${sx.text} ${sx[mode]} ${sx[direction]} ${child.props.className || ""}`,
            })}
        </div>
      ))}
    </div>
  );
}

export default TextReveal;
