"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

const ScrollSection = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef([]);

  const images = [
    "/images/slide-section/image1.jpg",
    "/images/slide-section/image2.jpg",
    "/images/slide-section/image3.jpg",
    "/images/slide-section/image4.jpg",
    "/images/slide-section/image5.jpg",
    "/images/slide-section/image6.jpg",
    "/images/slide-section/image7.jpg",
    "/images/slide-section/image8.jpg",
  ];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const slides = gsap.utils.toArray(
        sliderRef.current,
        containerRef.current
      );

      function getInitialTransalteZ(slide) {
        const style = window.getComputedStyle(slide);
        const matrix = style.transform.match(/matrix3d\((.+)\)/);
        if (matrix) {
          const values = matrix[1].split(", ");
          return parseFloat(values[14] || 0);
        }
        return 0;
      }

      function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      }

      slides.forEach((slide) => {
        const initialZ = getInitialTransalteZ(slide);

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const zIncrement = progress * 12000;
            const currentZ = initialZ + zIncrement;

            let opacity;

            if (currentZ > -2500) {
              opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
            } else {
              opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
            }

            slide.style.opacity = opacity;

            slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="container" ref={containerRef}>
      <div className="slider">
        <div className="slider-text">
          <h1 className="text-6xl leading-[0.75]">
            <span className="block transform -translate-x-14">
              Crafted to be lived in,
            </span>
            <br />
            <span className="block transform translate-x-14">
              Designed to <span className="font-bold">stand</span> out.
            </span>
          </h1>
        </div>
        {images.map((src, id) => (
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
