"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { slide_images } from "../constants";

const ScrollSection = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const slides = gsap.utils.toArray(
        sliderRef.current,
        containerRef.current
      );

      function getInitialTranslateZ(slide) {
        // First try to get from computed style
        const style = window.getComputedStyle(slide);
        const matrix = style.transform.match(/matrix3d\((.+)\)/);
        if (matrix) {
          const values = matrix[1].split(", ");
          const zValue = parseFloat(values[14] || 0);
          if (zValue !== 0) return zValue;
        }

        // Fallback: get initial Z from slide ID based on CSS definitions
        const slideId = slide.id;
        const slideNumber = parseInt(slideId.replace("slide-", ""));

        // These match your CSS initial positions
        const initialZValues = {
          1: -10500,
          2: -9000,
          3: -7500,
          4: -6000,
          5: -4500,
          6: -3000,
          7: -1500,
          8: 0,
        };

        return initialZValues[slideNumber] || 0;
      }

      function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      }

      slides.forEach((slide) => {
        const initialZ = getInitialTranslateZ(slide);

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            const totalMovement = 10500;
            const currentZ = initialZ + progress * totalMovement;

            let opacity;

            if (currentZ < -4000) {
              // Far behind camera - invisible
              opacity = 0;
            } else if (currentZ < -2000) {
              // Fade in as approaching
              opacity = mapRange(currentZ, -4000, -2000, 0, 0.5);
            } else if (currentZ < 0) {
              // Approaching camera - become fully visible
              opacity = mapRange(currentZ, -2000, 0, 0.5, 1);
            } else if (currentZ < 1000) {
              // Past camera but still visible
              opacity = 1;
            } else if (currentZ < 3000) {
              // Moving away from camera - fade out
              opacity = mapRange(currentZ, 1000, 3000, 1, 0);
            } else {
              // Too far forward - invisible
              opacity = 0;
            }

            // Clamp opacity to prevent flickering
            opacity = Math.max(0, Math.min(1, opacity));

            slide.style.opacity = opacity;
            slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
          },
        });
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="scroll-container w-full bg-black" ref={containerRef}>
      <div className="slider">
        <div className="slider-text">
          <h1 className="lg:text-6xl md:text-5xl sm:text-3xl text-xl text-white leading-[0.75]">
            <span className="block transform -translate-x-12">
              Crafted to be lived in,
            </span>
            <br />
            <span className="block transform translate-x-12">
              Designed to <span className="font-bold">stand</span> out.
            </span>
          </h1>
        </div>
        {slide_images.map((src, id) => (
          <div
            className="slide"
            id={`slide-${id + 1}`}
            key={id}
            ref={(el) => (sliderRef.current[id] = el)}
          >
            <Image
              fill
              src={src}
              alt={`Image${id}`}
              className="block object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollSection;
