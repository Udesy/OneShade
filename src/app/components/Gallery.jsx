"use client";

import React, { useEffect, useRef } from "react";
import { slide_images } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Gallery = () => {
  const imgRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Wait for fonts to load before initializing animations
    const initWithFonts = () => {
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        initScrollAnimation();
      }, 200);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initWithFonts();
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initWithFonts, 1000);
    }

    window.addEventListener("resize", initScrollAnimation);

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", initScrollAnimation);
    };

    function initScrollAnimation() {
      const images = imgRef.current;
      const introHeader = document.querySelector(".slider-intro-header h1");
      const outerHeader = document.querySelector(".slider-outro-header h1");

      let introHeaderSplit = null;
      let outroHeaderSplit = null;

      // Only create SplitText if elements exist and have content
      if (introHeader && introHeader.textContent.trim()) {
        try {
          introHeaderSplit = SplitText.create(introHeader, { type: "words" });
          if (introHeaderSplit.words && introHeaderSplit.words.length > 0) {
            gsap.set(introHeaderSplit.words, { opacity: 1 });
          }
        } catch (error) {
          console.warn("Failed to create intro header SplitText:", error);
        }
      }

      if (outerHeader && outerHeader.textContent.trim()) {
        try {
          outroHeaderSplit = SplitText.create(outerHeader, { type: "words" });
          if (outroHeaderSplit.words && outroHeaderSplit.words.length > 0) {
            gsap.set(outroHeaderSplit.words, { opacity: 0 });
          }
        } catch (error) {
          console.warn("Failed to create outro header SplitText:", error);
        }
      }

      const scatterDirections = [
        { x: 1.3, y: 0.7 },
        { x: -1.5, y: 1.0 },
        { x: 1.1, y: 1.3 },
        { x: -1.7, y: 0.8 },
        { x: 0.8, y: 1.5 },
        { x: -1.0, y: -1.4 },
        { x: 1.6, y: 0.3 },
        { x: -0.7, y: 1.7 },
        { x: 1.2, y: 1.6 },
        { x: -1.4, y: 0.9 },
        { x: 1.8, y: -0.5 },
        { x: -1.1, y: 1.8 },
        { x: 0.9, y: 1.8 },
        { x: -1.9, y: 0.4 },
        { x: 1.0, y: -1.9 },
      ];

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobile = screenWidth < 1000;
      const scatterMultiplier = isMobile ? 2.5 : 0.5;

      const startPositions = Array.from(images).map(() => ({
        x: 0,
        y: 0,
        z: -1000,
        scale: 0,
      }));

      const endPositions = scatterDirections.map((dir) => ({
        x: dir.x * screenWidth * scatterMultiplier,
        y: dir.y * screenHeight * scatterMultiplier,
        z: 2000,
        scale: 1,
      }));

      images.map((img, index) => {
        gsap.set(img, startPositions[index]);
      });

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 1.5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          images.forEach((img, index) => {
            const staggerDelay = index * 0.03;
            const scaleMultiplier = isMobile ? 4 : 2;

            let imageProgress = Math.max(0, (progress - staggerDelay) * 4);

            const start = startPositions[index];
            const end = endPositions[index];

            const zValue = gsap.utils.interpolate(
              start.z,
              end.z,
              imageProgress
            );
            const scaleValue = gsap.utils.interpolate(
              start.scale,
              end.scale,
              imageProgress * scaleMultiplier
            );
            const xValue = gsap.utils.interpolate(
              start.x,
              end.x,
              imageProgress
            );
            const yValue = gsap.utils.interpolate(
              start.y,
              end.y,
              imageProgress
            );

            gsap.set(img, {
              z: zValue,
              scale: scaleValue,
              x: xValue,
              y: yValue,
            });
          });
          if (introHeaderSplit && introHeaderSplit.words.length > 0) {
            if (progress >= 0.6 && progress <= 0.75) {
              const introFadeProgress = (progress - 0.6) / 0.15;
              const totalWords = introHeaderSplit.words.length;

              introHeaderSplit.words.map((word, index) => {
                const wordFadeProgress = index / totalWords;
                const fadeRange = 0.1;

                if (introFadeProgress >= wordFadeProgress + fadeRange) {
                  gsap.set(word, { opacity: 0 });
                } else if (introFadeProgress <= wordFadeProgress) {
                  gsap.set(word, { opacity: 1 });
                } else {
                  const wordOpacity =
                    1 - (introFadeProgress - wordFadeProgress) / fadeRange;
                  gsap.set(word, { opacity: wordOpacity });
                }
              });
            } else if (progress < 0.6) {
              gsap.set(introHeaderSplit.words, { opacity: 1 });
            } else if (progress > 0.75) {
              gsap.set(introHeaderSplit.words, { opacity: 0 });
            }
          }
        },
      });
    }

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", initScrollAnimation);
    };
  }, []);
  return (
    <section className="scroll-section" ref={containerRef}>
      <div className="slider-img">
        {slide_images.map((src, index) => (
          <div
            key={index}
            className="img"
            ref={(el) => (imgRef.current[index] = el)}
          >
            <Image
              fill
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <div className="slider-intro-header">
        <h1 className="lg:text-6xl md:text-5xl sm:text-3xl text-xl text-white leading-[0.75]">
          <span className="block transform ">Crafted to be lived in,</span>
          <br />
          <span className="block transform ">
            Designed to <span className="font-bold">stand</span> out.
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Gallery;
