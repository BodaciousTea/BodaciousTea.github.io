"use client";
import Card3D from "@/components/common/card_3d/Card3D";
import useWidth from "@/hooks/useWidth";
/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useRef, useState} from "react";

interface AlbumProps {
  thumbs: string[];
  baseTone?: string;
  offset?: string;
}

function Album(props: AlbumProps) {
  const {thumbs, baseTone = "bg-800", offset} = props;
  const width = useWidth();
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [imageWidths, setImageWidths] = React.useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number>(0); // Track loaded images count

  useEffect(() => {
    setImageWidths([]);
    setLoadedImages(0);
    imageRefs.current = [];
  }, [thumbs]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  // Update widths when all images have loaded
  useEffect(() => {
    if (loadedImages === thumbs.length) {
      const widths = imageRefs.current.map((el) => {
        const w = el?.clientWidth || 0;
        const vw = ((w / width) * 100).toFixed(2);
        return vw;
      });
      setImageWidths(widths);
    }
  }, [loadedImages, thumbs, width]);

  // Ensure images are loaded
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, [thumbs]);
  if (!isReady) return null;

  return (
    <div className="flex flex-col justify-center px-[10vw]">
      <Card3D>
        <div
          className={`w-full max-w-[70vw] mx-auto aspect-[1800/1000] ${baseTone}`}
        >
          <div className={`flex gap-[2.5vw] -mx-[3.5vw] h-full ${offset}`}>
            {thumbs.map((item, index) => {
              return (
                <img
                  className="object-cover h-full animate__pulse animate__animated "
                  src={item}
                  onLoad={handleImageLoad}
                  ref={(el) => (imageRefs.current[index] = el)}
                  style={
                    index <= loadedImages
                      ? {width: `${imageWidths[index]}vw`}
                      : {}
                  }
                  key={item}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </Card3D>
    </div>
  );
}

export default Album;
