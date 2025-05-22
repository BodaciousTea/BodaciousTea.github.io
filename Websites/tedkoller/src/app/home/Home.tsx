"use client";
import React, { useEffect, useState, useRef } from "react";
import Welcome from "./Welcome";
import About from "./About";
import Gallery from "./Gallery";
import "@/styles/main.css";

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disableSnap, setDisableSnap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      document.body.classList.add("mobile");

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/styles/main.mobile.css";
      link.onload = () => {
        setTimeout(() => setIsLoading(false), 300); // Give CSS time to apply
      };
      link.onerror = () => {
        console.warn("❌ Failed to load mobile CSS");
        setIsLoading(false);
      };

      // Safety fallback in case onload never fires
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      document.head.appendChild(link);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sectionHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;
      const galleryStart = sectionHeight * 2;

      setDisableSnap(scrollTop >= galleryStart - 5);
    };

    const handleWheel = (e: WheelEvent) => {
      const sectionHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;
      const galleryTop = sectionHeight * 2;
      const nearTopOfGallery = scrollTop >= galleryTop - 5 && scrollTop <= galleryTop + 5;

      if (nearTopOfGallery && e.deltaY < 0) {
        e.preventDefault();
        scrollContainer.scrollTo({
          top: sectionHeight,
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
    <>
      {/* Fullscreen Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white" />
        </div>
      )}

      <div
        ref={containerRef}
        className={`h-screen overflow-y-scroll ${
          disableSnap ? "" : "snap-y snap-mandatory"
        } ${isLoading ? "overflow-hidden" : ""}`}
      >
        <section className="h-screen snap-start">
          <Welcome />
        </section>

        <section className="h-screen snap-start">
          <About />
        </section>

        <section className="min-h-screen snap-start">
          <Gallery />
        </section>

        <div
          className="fixed z-10 cursor-pointer bottom-[1.8vw] left-1/2 transform -translate-x-1/2 duration-500"
          onClick={handleScrollArrow}
        >
          <img className="w-[1.2vw]" src="/images/scroll-arrow.svg" alt="Scroll arrow" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
