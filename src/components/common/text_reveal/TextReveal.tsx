import React, {Fragment} from "react";
import sx from "./text_reveal.module.css";
import {useInView} from "react-spring";

interface TextRevealProps {
  children?:
    | React.ReactElement<HTMLSpanElement>
    | React.ReactElement<HTMLSpanElement>[];
  direction?: "down" | "up";
  mode?: "in" | "out";
  leading?: number;
  style?: React.CSSProperties;
}

function TextReveal(props: TextRevealProps) {
  const {children, direction = "up", leading, mode = "in", style} = props;
  const [ref, inView] = useInView();

  return (
    <div ref={ref}>
      {React.Children.map(children, (child) => (
        <div
          className={inView ? sx.element : "opacity-0"}
          style={leading ? {lineHeight: leading, ...style} : {...style}}
        >
          {React.isValidElement(child) &&
            React.cloneElement(child, {
              className: `${sx.text} ${sx[mode]} ${sx[direction]} ${child.props.className}`,
            })}
        </div>
      ))}
    </div>
  );
}

export default TextReveal;
