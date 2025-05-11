"use client";
import React, { useEffect, useRef, useState } from "react";
import Welcome from "./Welcome";
import About from "./About";
import Gallery from "./Gallery";

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disableSnap, setDisableSnap] = useState(false);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sectionHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;
      const galleryStart = sectionHeight * 2;

      // Once user reaches gallery section, disable snapping
      if (scrollTop >= galleryStart - 5) {
        setDisableSnap(true);
      } else {
        setDisableSnap(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const sectionHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;

      const galleryTop = sectionHeight * 2;
      const nearTopOfGallery = scrollTop >= galleryTop - 5 && scrollTop <= galleryTop + 5;

      if (nearTopOfGallery && e.deltaY < 0) {
        e.preventDefault();
        scrollContainer.scrollTo({
          top: sectionHeight, // scroll to About
          behavior: "smooth",
        });
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleScrollArrow = () => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      const sectionHeight = scrollContainer.clientHeight;
      const currentTop = scrollContainer.scrollTop;
      const nextTop = currentTop >= sectionHeight * 2 ? 0 : currentTop + sectionHeight;

      scrollContainer.scrollTo({ top: nextTop, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`h-screen overflow-y-scroll ${
        disableSnap ? "" : "snap-y snap-mandatory"
      }`}
    >
      <section className="h-screen snap-start">
        <Welcome />
      </section>

      <section className="h-screen snap-start">
        <About />
      </section>

      {/* Gallery can grow freely */}
      <section className="min-h-screen snap-start">
        <Gallery />
      </section>

      <div
        className="fixed z-10 cursor-pointer bottom-[1.8vw] left-1/2 transform -translate-x-1/2 duration-500"
        onClick={handleScrollArrow}
      >
        <img
          className="w-[1.2vw]"
          src="/images/scroll-arrow.svg"
          alt="Scroll arrow"
        />
      </div>
    </div>
  );
}

export default HomePage;
