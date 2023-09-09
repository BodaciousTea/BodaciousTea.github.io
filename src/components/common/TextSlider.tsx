"use client";
import useWidth from "@/hooks/useWidth";
import React, {useRef, useEffect, useState} from "react";

interface TextSliderProps {
  texts: [string, string][];
}

function TextSlider(props: TextSliderProps) {
  const width = useWidth();
  const {texts} = props;
  const [current, setCurrent] = useState<number>(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const titleRefs = texts.map(() => useRef(null));
  const [titleWidths, setTitleWidths] = useState<string[]>([]);

  useEffect(() => {
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        const widths: string[] = titleRefs.map((ref: any) => {
          const w = ref.current!.offsetWidth || 0;
          return ((w / width) * 100).toFixed(2);
        });
        setTitleWidths(widths);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, texts]);

  const selectedWd = titleWidths.filter((_, i) => i < current);

  const translateX =
    selectedWd.length > 0
      ? selectedWd.reduce((a, b) => String(Number(a) + Number(b)))
      : 0;

  useEffect(() => {
    function change() {
      setCurrent((prev) => {
        if (prev + 1 >= texts.length) return 0;
        return prev + 1;
      });
    }
    setTimeout(change, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, texts]);

  return (
    <div
      className="whitespace-nowrap overflow-hidden"
      style={{width: `${titleWidths[current]}vw`}}
    >
      <div
        className="duration-1000"
        style={{
          transform: `translateX(-${translateX}vw)`,
        }}
      >
        {texts.map(([title, style], i) => (
          <span
            aria-label="title"
            key={i}
            className={`text-linear ${style}`}
            ref={titleRefs[i]}
          >
            {title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TextSlider;
