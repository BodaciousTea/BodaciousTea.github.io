"use client";
import React, {useState} from "react";
import ReactVisibilitySensor from "react-visibility-sensor";

interface TitleAnimateProps {
  texts: string[];
  color?: string;
  show?: boolean;
}

function TitleAnimate(props: TitleAnimateProps) {
  const {texts, color, show} = props;

  return (
    <div>
      <div
        className={`animate__animated ${
          show ? "animate__fadeInUp" : "animate__fadeOutUp"
        } duration-1000`}
      >
        <div>
          {texts.map((text, index) => (
            <span className={`${color} block`} key={`${text}-${index}`}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TitleAnimate;
