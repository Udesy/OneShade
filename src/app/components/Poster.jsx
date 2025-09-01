"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Poster = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Wait for fonts to load before creating SplitText
      const initSplitText = () => {
        if (!textRef.current) return;

        // Additional check to ensure element has text content
        if (!textRef.current.textContent || !textRef.current.textContent.trim())
          return;

        try {
          const splitText = new SplitText(textRef.current, {
            type: "lines",
            linesClass: "lines",
          });

          // Check if lines were created successfully
          if (!splitText.lines || splitText.lines.length === 0) {
            console.warn("No lines created by SplitText");
            return;
          }

          gsap.set(splitText.lines, {
            opacity: 0,
            y: 100,
          });

          // Animate the LINES, not the splitText object
          gsap.to(splitText.lines, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 10%",
            },
          });

          // Cleanup function
          return () => {
            if (splitText) splitText.revert();
            // Cleanup ScrollTrigger instances
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          };
        } catch (error) {
          console.warn("SplitText animation failed:", error);
        }
      };

      // Check if fonts are loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Longer delay to ensure fonts are fully rendered
          setTimeout(initSplitText, 500);
        });
      } else {
        // Fallback for browsers without font loading API
        setTimeout(initSplitText, 1500);
      }
    },
    { scope: containerRef }
  );

  return (
    <section className="section h-screen" ref={containerRef}>
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center">
          <h1
            className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-center text-white lg:leading-19 md:leading-15 sm:leading-12 leading-10 overflow-hidden w-full "
            ref={textRef}
          >
            We believe confidence begins <br /> with how you feel in what you{" "}
            <br /> wear.
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={"/images/poster-section/poster.jpg"}
            fill
            alt="poster"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Poster;
